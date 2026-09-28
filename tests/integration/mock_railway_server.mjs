// Mock Railway GraphQL endpoint for the integration tests.
//
// Serves POST /graphql/v2 and executes the incoming document against
// in-memory fixtures the way the real API does: the document is parsed with
// graphql-js, every selected field is answered under the alias the query
// asked for (the generated queries alias every field to snake_case),
// connections are paged Relay style (first / after, edges { node },
// pageInfo { hasNextPage endCursor }) and mutations change the fixture store.
// Fixtures hold the API's own camelCase names, so a generated query only
// produces snake_case rows if its aliases are right.
//
// Wire behaviours reproduced from the live API (NOTES.md):
//   - runtime failures answer HTTP 200 with {"errors": [...], "data": null}
//   - the final page of a connection carries a non-empty endCursor
//   - a request without a bearer token answers "Not Authorized" (HTTP 200)
//   - variables are coerced strictly: a string for a Boolean or Int
//     variable is an error, so the typed request templates are exercised
//
// The fixture ids are the ids the documentation examples use, so the
// examples in the landing page and the README run against this server
// unchanged (run_docs_examples.mjs).
//
// Every request is appended to the exported log:
//   { method, path, auth, contentType, raw, query, variables, operation }

import http from 'node:http';
import { parse, valueFromASTUntyped, Kind } from 'graphql';

export const IDS = {
  workspace: '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40',
  project1: '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14',
  project2: '3a9d5e72-6c1f-4b8a-8e40-5d2c7f9b1a36',
  project3: 'f06b8d14-9e2a-4c73-a5b1-2e7d4c8f3a90',
  environment: '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28',
  service1: 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53',
  service2: '91c4e8a6-5f3b-4d27-9a0c-8b6e2f4d7c15',
  deployment: 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65',
  deployment2: '6e0b9f3d-1a7c-4582-b4e6-0c5d8a2f9e71',
  created: 'c5d2a8f0-3b6e-4971-8d4a-1f9e7c0b6a42',
};

function project(id, name, extra = {}) {
  return {
    id,
    name,
    description: `${name} description`,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-02T00:00:00.000Z',
    deletedAt: null,
    isPublic: false,
    prDeploys: false,
    botPrEnvironments: false,
    workspaceId: IDS.workspace,
    workspace: { id: IDS.workspace, name: 'Mock Workspace', plan: 'HOBBY' },
    members: [{ id: 'u-1', email: 'mock@example.com', name: 'Mock User', role: 'ADMIN' }],
    environments: [
      { id: IDS.environment, name: 'production', isEphemeral: false, projectId: id, createdAt: '2026-01-01T00:00:00.000Z' },
    ],
    services: [
      { id: IDS.service1, name: 'api', projectId: id, createdAt: '2026-01-01T00:00:00.000Z', icon: null },
      { id: IDS.service2, name: 'worker', projectId: id, createdAt: '2026-01-01T00:00:00.000Z', icon: null },
    ],
    volumes: [],
    ...extra,
  };
}

function freshStore() {
  return {
    projects: [project(IDS.project1, 'alpha'), project(IDS.project2, 'beta'), project(IDS.project3, 'gamma')],
    variables: { API_KEY: 'secret-1', LOG_LEVEL: 'debug' },
    favorites: [],
    serviceDomains: [{ id: 'sd-1', domain: 'api-production.up.railway.app', suffix: 'up.railway.app', targetPort: 8080, environmentId: IDS.environment, serviceId: IDS.service1 }],
    customDomains: [{
      id: 'cd-1',
      domain: 'api.example.com',
      environmentId: IDS.environment,
      serviceId: IDS.service1,
      targetPort: null,
      status: {
        certificateStatus: 'VALID',
        verified: true,
        dnsRecords: [{ hostlabel: 'api', fqdn: 'api.example.com', recordType: 'DNS_RECORD_TYPE_CNAME', requiredValue: 'x.up.railway.app', currentValue: 'x.up.railway.app', status: 'DNS_RECORD_STATUS_PROPAGATED', zone: 'example.com', purpose: 'DNS_RECORD_PURPOSE_TRAFFIC_ROUTE' }],
      },
    }],
  };
}

const DEPLOYMENTS = [
  { id: IDS.deployment, status: 'SUCCESS', createdAt: '2026-01-03T00:00:00.000Z', projectId: IDS.project1, environmentId: IDS.environment, serviceId: IDS.service1, staticUrl: 'api-production.up.railway.app', canRedeploy: true, canRollback: true, meta: { branch: 'main' } },
  { id: IDS.deployment2, status: 'FAILED', createdAt: '2026-01-02T00:00:00.000Z', projectId: IDS.project1, environmentId: IDS.environment, serviceId: IDS.service1, staticUrl: null, canRedeploy: true, canRollback: false, meta: null },
];

class GraphQLFailure extends Error {}

// Relay paging over an array: cursors are the item ids.
function page(items, args, defaultSize = 100) {
  const size = args.first ?? defaultSize;
  let start = 0;
  if (args.after) {
    const idx = items.findIndex((i) => i.id === args.after);
    start = idx + 1;
  }
  const slice = items.slice(start, start + size);
  return {
    __connection: true,
    nodes: slice,
    pageInfo: {
      hasNextPage: start + size < items.length,
      hasPreviousPage: start > 0,
      // Relay strict: the final page still carries its last cursor
      endCursor: slice.length > 0 ? slice[slice.length - 1].id : null,
      startCursor: slice.length > 0 ? slice[0].id : null,
    },
  };
}

function strictVariables(operation, variables) {
  // the declared variable types, as the real API enforces them
  for (const def of operation.variableDefinitions || []) {
    const name = def.variable.name.value;
    let t = def.type;
    const required = t.kind === Kind.NON_NULL_TYPE;
    if (required) t = t.type;
    const value = variables[name];
    if (value === undefined || value === null) {
      if (required) throw new GraphQLFailure(`Variable "$${name}" of required type was not provided.`);
      continue;
    }
    if (t.kind !== Kind.NAMED_TYPE) continue;
    const typeName = t.name.value;
    if (typeName === 'Boolean' && typeof value !== 'boolean') throw new GraphQLFailure(`Variable "$${name}" got invalid value ${JSON.stringify(value)}; Boolean cannot represent a non boolean value`);
    if (typeName === 'Int' && !Number.isInteger(value)) throw new GraphQLFailure(`Variable "$${name}" got invalid value ${JSON.stringify(value)}; Int cannot represent non-integer value`);
    if ((typeName === 'String' || typeName === 'ID') && typeof value !== 'string') throw new GraphQLFailure(`Variable "$${name}" got invalid value ${JSON.stringify(value)}; String cannot represent a non string value`);
  }
}

function logLines(args) {
  return Array.from({ length: Math.min(args.limit ?? 3, 200) }, (_, i) => ({
    message: `line ${i + 1}`,
    severity: 'info',
    timestamp: `2026-01-03T00:00:${String(i % 60).padStart(2, '0')}.000Z`,
  }));
}

function makeResolvers(store, pageSizes) {
  const findProject = (id) => {
    const p = store.projects.find((x) => x.id === id);
    if (!p) throw new GraphQLFailure('Project not found');
    return p;
  };
  const findDeployment = (id) => {
    const d = DEPLOYMENTS.find((x) => x.id === id);
    if (!d) throw new GraphQLFailure('Deployment not found');
    return d;
  };
  const serviceInstance = (environmentId, serviceId) => ({
    id: `si-${serviceId.slice(0, 8)}`,
    serviceId,
    environmentId,
    serviceName: serviceId === IDS.service1 ? 'api' : 'worker',
    region: 'us-west2',
    numReplicas: 1,
    startCommand: 'npm start',
    restartPolicyType: 'ON_FAILURE',
    restartPolicyMaxRetries: 10,
    latestDeployment: { id: IDS.deployment, status: 'SUCCESS', createdAt: '2026-01-03T00:00:00.000Z' },
    source: { image: null, repo: 'mock-org/api' },
    edgeConfig: { id: 'edge-1', enabled: true, purgeEpoch: 3 },
  });
  return {
    Query: {
      me: () => ({
        id: 'u-1', name: 'Mock User', email: 'mock@example.com', username: 'mockuser', isVerified: true, createdAt: '2025-01-01T00:00:00.000Z',
        workspaces: [{ id: IDS.workspace, name: 'Mock Workspace', plan: 'HOBBY', createdAt: '2025-01-01T00:00:00.000Z' }],
        providerAuths: page([{ id: 'pa-1', provider: 'github', email: 'mock@example.com', isAuthEnabled: true, metadata: {}, userId: 'u-1' }], {}),
      }),
      apiToken: () => ({ workspaces: [{ id: IDS.workspace, name: 'Mock Workspace' }] }),
      workspace: (args) => ({ id: args.workspaceId, name: 'Mock Workspace', plan: 'HOBBY', customer: { id: 'cus-1', state: 'ACTIVE', creditBalance: 5, currentUsage: 0.25, isTrialing: false } }),
      projects: (args) => {
        if (args.workspaceId === 'trigger-error') throw new GraphQLFailure('Not Authorized');
        let items = store.projects;
        if (args.workspaceId) items = items.filter((p) => p.workspaceId === args.workspaceId);
        return page(items, args, pageSizes.projects);
      },
      project: (args) => {
        const p = findProject(args.id);
        return { ...p, services: page(p.services, {}), volumes: page(p.volumes, {}), environments: page(p.environments, {}) };
      },
      projectsByIds: (args) => store.projects.filter((p) => args.ids.includes(p.id)),
      projectMembers: (args) => findProject(args.projectId).members,
      projectFavorites: () => store.favorites,
      environments: (args) => page(findProject(args.projectId).environments, args),
      environment: (args) => ({
        id: args.id,
        name: 'production',
        projectId: IDS.project1,
        serviceInstances: page([serviceInstance(args.id, IDS.service1), serviceInstance(args.id, IDS.service2)], {}),
        volumeInstances: page([], {}),
        variables: page([{ id: 'var-1', name: 'API_KEY', references: ['${{shared.X}}'], isSealed: false, serviceId: IDS.service1, environmentId: args.id, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' }], {}),
      }),
      serviceInstance: (args) => serviceInstance(args.environmentId, args.serviceId),
      deployments: (args) => {
        const input = args.input || {};
        let items = DEPLOYMENTS;
        for (const k of ['projectId', 'environmentId', 'serviceId']) if (input[k]) items = items.filter((d) => d[k] === input[k]);
        if (input.status && input.status.in) items = items.filter((d) => input.status.in.includes(d.status));
        return page(items, args);
      },
      deployment: (args) => findDeployment(args.id),
      buildLogs: (args) => { findDeployment(args.deploymentId); return logLines(args); },
      deploymentLogs: (args) => { findDeployment(args.deploymentId); return logLines(args); },
      variables: () => store.variables,
      domains: (args) => ({
        serviceDomains: store.serviceDomains.filter((d) => d.serviceId === args.serviceId && d.environmentId === args.environmentId),
        customDomains: store.customDomains.filter((d) => d.serviceId === args.serviceId && d.environmentId === args.environmentId),
      }),
      usage: (args) => (args.measurements || []).map((m) => ({ measurement: m, value: 1.5, tags: { projectId: args.projectId ?? IDS.project1, serviceId: null } })),
      metrics: (args) => (args.measurements || []).map((m) => ({ measurement: m, tags: { serviceId: null }, values: [{ ts: 1, value: 0.5 }] })),
      regions: () => [{ name: 'us-west2', country: 'USA', location: 'US West' }, { name: 'europe-west4', country: 'Netherlands', location: 'EU West' }],
      template: (args) => ({ id: 'tpl-1', code: args.code ?? 'postgres', name: 'Postgres', category: 'Storage', isVerified: true }),
      templatesCount: () => 4242,
      githubWritableScopes: () => ['mock-org', 'mock-user'],
      cloudAgentTasks: (args) => (args.cursor
        ? { tasks: [{ id: 'task-3', status: 'COMPLETED', cloudAgentId: 'ca-1' }], nextCursor: null }
        : { tasks: [{ id: 'task-1', status: 'COMPLETED', cloudAgentId: 'ca-1' }, { id: 'task-2', status: 'RUNNING', cloudAgentId: 'ca-1' }], nextCursor: 'TASK_CURSOR_1' }),
      // fixtures whose column names are SQL keywords the engine accepts
      gitHubSshKeys: () => [{ id: 1, key: 'ssh-ed25519 AAAA', title: 'laptop' }],
      cloudAgentTask: (args) => ({ taskId: 'task-1', cloudAgentId: args.cloudAgentId, sessionId: args.sessionId, status: 'COMPLETED', text: 'done' }),
      events: (args) => page([{ id: 'ev-1', action: 'create', object: 'service', severity: 'INFO', projectId: args.projectId, createdAt: '2026-01-01T00:00:00.000Z' }], args),
      signals: () => [{ id: 'sig-1', name: 'flag', owner: 'me', default: { on: true }, type: 'BOOLEAN' }],
    },
    Mutation: {
      projectCreate: (args) => {
        const input = args.input || {};
        if (input.name === 'trigger-error') throw new GraphQLFailure('Project name is not available');
        const p = project(IDS.created, input.name ?? 'unnamed', { description: input.description ?? null, isPublic: input.isPublic ?? false, prDeploys: input.prDeploys ?? false, workspaceId: input.workspaceId ?? IDS.workspace });
        store.projects.push(p);
        return p;
      },
      projectUpdate: (args) => {
        const p = findProject(args.id);
        const input = args.input || {};
        if (input.name === 'trigger-error') throw new GraphQLFailure('Project name is not available');
        for (const [k, v] of Object.entries(input)) p[k] = v;
        return p;
      },
      projectDelete: (args) => {
        findProject(args.id);
        store.projects = store.projects.filter((p) => p.id !== args.id);
        return true;
      },
      projectLeave: (args) => { findProject(args.id); return true; },
      projectFavoriteSet: (args) => {
        findProject(args.projectId);
        store.favorites = store.favorites.filter((id) => id !== args.projectId);
        if (args.favorite) store.favorites.push(args.projectId);
        return true;
      },
      environmentCreate: (args) => {
        const p = findProject(args.input.projectId);
        const e = { id: '7d3f0a5c-2e8b-4196-a4d7-5c1e9b3f6a08', name: args.input.name, isEphemeral: Boolean(args.input.ephemeral), projectId: p.id, createdAt: '2026-02-01T00:00:00.000Z' };
        p.environments.push(e);
        return e;
      },
      serviceCreate: (args) => {
        const input = args.input;
        const p = findProject(input.projectId);
        const s = { id: 'a2e6c9d4-7b1f-4350-9c8e-4d0a6f2b8e17', name: input.name ?? 'svc', projectId: p.id, createdAt: '2026-02-01T00:00:00.000Z', icon: null, source: input.source ?? null };
        p.services.push(s);
        return s;
      },
      serviceDelete: (args) => {
        const p = store.projects.find((x) => x.services.some((s) => s.id === args.id));
        if (!p) throw new GraphQLFailure('Service not found');
        p.services = p.services.filter((s) => s.id !== args.id);
        return true;
      },
      serviceInstanceUpdate: () => true,
      serviceInstanceRedeploy: () => true,
      serviceDomainCreate: (args) => {
        const d = { id: 'sd-2', domain: 'api-production-1a2b.up.railway.app', suffix: 'up.railway.app', targetPort: args.input.targetPort ?? null, environmentId: args.input.environmentId, serviceId: args.input.serviceId };
        store.serviceDomains.push(d);
        return d;
      },
      volumeCreate: (args) => {
        const p = findProject(args.input.projectId);
        const v = { id: 'b8f1d3a7-4c6e-4205-8e9a-3f7c1d5b0e29', name: 'api-volume', projectId: p.id, createdAt: '2026-02-01T00:00:00.000Z' };
        p.volumes.push(v);
        return v;
      },
      variableUpsert: (args) => { store.variables[args.input.name] = args.input.value; return true; },
      variableCollectionUpsert: (args) => { Object.assign(store.variables, args.input.variables); return true; },
      variableDelete: (args) => { delete store.variables[args.input.name]; return true; },
      deploymentRestart: (args) => { findDeployment(args.id); return true; },
      deploymentRollback: (args) => { findDeployment(args.id); return true; },
      deploymentStop: (args) => { findDeployment(args.id); return true; },
      deploymentRedeploy: (args) => ({ ...findDeployment(args.id), id: 'f3a7c1e9-6d2b-4840-b5f6-9e0c4a8d2b73', status: 'QUEUED' }),
      apiTokenCreate: (args) => `mock-token-for-${args.input.name}`,
      userBetaLeave: () => true,
      signalCreate: (args) => ({ id: 'sig-2', name: args.input.name, owner: args.input.owner, default: args.input.default, type: args.input.type }),
    },
  };
}

function projectSelection(selectionSet, source, variables) {
  if (source === null || source === undefined) return null;
  if (Array.isArray(source)) return source.map((s) => projectSelection(selectionSet, s, variables));
  if (!selectionSet) return source;
  const out = {};
  for (const sel of selectionSet.selections) {
    if (sel.kind !== Kind.FIELD) continue;
    const name = sel.name.value;
    const key = sel.alias ? sel.alias.value : name;
    if (source.__connection) {
      if (name === 'edges') {
        const nodeSel = sel.selectionSet.selections.find((s) => s.name.value === 'node');
        out[key] = source.nodes.map((n) => ({ [nodeSel.alias ? nodeSel.alias.value : 'node']: projectSelection(nodeSel.selectionSet, n, variables) }));
      } else if (name === 'pageInfo') {
        out[key] = projectSelection(sel.selectionSet, source.pageInfo, variables);
      }
      continue;
    }
    const value = source[name];
    out[key] = value === undefined ? null : (sel.selectionSet ? projectSelection(sel.selectionSet, value, variables) : value);
  }
  return out;
}

function execute(document, variables, resolvers) {
  const operation = document.definitions.find((d) => d.kind === Kind.OPERATION_DEFINITION);
  strictVariables(operation, variables);
  const root = operation.operation === 'mutation' ? resolvers.Mutation : resolvers.Query;
  const data = {};
  for (const sel of operation.selectionSet.selections) {
    const name = sel.name.value;
    const resolver = root[name];
    if (!resolver) throw new GraphQLFailure(`mock server: no fixture for ${operation.operation} field '${name}'`);
    const args = Object.fromEntries((sel.arguments || []).map((a) => [a.name.value, valueFromASTUntyped(a.value, variables)]));
    data[sel.alias ? sel.alias.value : name] = projectSelection(sel.selectionSet, resolver(args), variables);
  }
  return { data, operation: operation.operation };
}

// pageSizes lets a test force small pages regardless of the `first` the
// generated query asks for, so pagination is exercised with few fixtures.
export function startMockServer({ pageSizes = {} } = {}) {
  const log = [];
  let store = freshStore();
  const sizes = { ...pageSizes };
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let body = '';
      req.on('data', (d) => { body += d; });
      req.on('end', () => {
        const entry = {
          method: req.method,
          path: req.url,
          auth: req.headers.authorization || '',
          contentType: req.headers['content-type'] || '',
          raw: body,
          query: '',
          variables: undefined,
          operation: '',
          status: 200,
          errors: null,
        };
        log.push(entry);
        const reply = (obj, code = 200) => {
          entry.status = code;
          entry.errors = obj.errors ? obj.errors.map((e) => e.message) : null;
          res.writeHead(code, {
            'Content-Type': 'application/json',
            'RateLimit-Policy': '"default";q=1000;w=3600',
            'X-RateLimit-Limit': '1000',
            'X-RateLimit-Remaining': '999',
          });
          res.end(JSON.stringify(obj));
        };
        let payload = {};
        let parseError = null;
        try { payload = JSON.parse(body); } catch (e) { parseError = e; }
        entry.query = payload.query || '';
        entry.variables = payload.variables;
        if (req.method !== 'POST' || !req.url.startsWith('/graphql/v2')) {
          entry.status = 404;
          res.writeHead(404);
          res.end('not found');
          return;
        }
        if (parseError) return reply({ errors: [{ message: `request body is not JSON: ${parseError.message}` }] }, 400);
        if (entry.auth !== 'Bearer mock-token') {
          return reply({ errors: [{ message: 'Not Authorized', extensions: { code: 'INTERNAL_SERVER_ERROR' } }], data: null });
        }
        let document;
        try {
          document = parse(entry.query);
        } catch (e) {
          return reply({ errors: [{ message: e.message, extensions: { code: 'GRAPHQL_PARSE_FAILED' } }] }, 400);
        }
        try {
          const resolvers = makeResolvers(store, sizes);
          // forced page sizes override the requested `first`
          for (const [field, size] of Object.entries(sizes)) {
            const original = resolvers.Query[field];
            resolvers.Query[field] = (args) => original({ ...args, first: size });
          }
          const result = execute(document, payload.variables || {}, resolvers);
          entry.operation = result.operation;
          return reply({ data: result.data });
        } catch (e) {
          if (e instanceof GraphQLFailure) {
            return reply({ errors: [{ message: e.message, extensions: { code: 'INTERNAL_SERVER_ERROR' }, traceId: '1' }], data: null });
          }
          return reply({ errors: [{ message: `mock server failure: ${e.message}` }], data: null });
        }
      });
    });
    server.listen(0, '127.0.0.1', () => {
      resolve({
        server,
        port: server.address().port,
        log,
        reset: () => { store = freshStore(); },
        store: () => store,
      });
    });
  });
}
