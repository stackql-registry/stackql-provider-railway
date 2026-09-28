#!/usr/bin/env node
// Live validation of the generated SELECT methods against the Railway API.
//
// The engine fails a whole statement on any GraphQL error, so one field the
// caller is not entitled to read, or one resolver that cannot resolve,
// breaks every query that selects it. This script runs each generated query
// and reports, per method:
//   PASS        the query ran without errors
//   FAIL        the API returned errors; the error path names the field
//   SKIPPED     a required parameter has no value to run with
// A FAIL whose path points into the row (me.platformFeatureFlags) is a field
// for unstableFields in selection_policy.json; a FAIL on the root field
// itself is an entitlement, plan or "no such object" answer and is recorded
// in NOTES.md. Nothing is rewritten here: the report is evidence, the policy
// is the decision.
//
// Only the generated queries are sent - no generated mutation ever is. With
// --with-fixture the script first creates an empty project of its own
// (stackql-validate-<stamp>: one service, a second environment, a service
// and a shared variable, a service domain, a volume, a project token) so
// that the project scoped reads run against real rows - resolver failures
// only show when there is a row to resolve - and deletes the project when
// done. Nothing is deployed, so the fixture costs nothing.
//
// Parameters come from, in order: --params '{"project_id": "..."}',
// RAILWAY_VALIDATE_PARAMS (same JSON), the fixture, discovery (workspace_id
// from the token's workspaces) and built-in samples for time windows and
// measurements. Requests are paced under the hourly rate limit.
//
// Usage:
//   node provider-dev/scripts/validate_live.mjs [--with-fixture] [--params JSON]
//        [--only service.resource.method,...] [--verbose]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';
import { renderTemplate } from './lib/template.mjs';

const baseDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const servicesDir = path.join(baseDir, 'provider-dev', 'openapi', 'src', 'railway', 'v00.00.00000', 'services');
const reportFile = path.join(baseDir, 'provider-dev', 'config', 'live_validation.csv');
const ENDPOINT = process.env.RAILWAY_GRAPHQL_URL || 'https://backboard.railway.com/graphql/v2';
const FIXTURE_PREFIX = 'stackql-validate-';
const PACE_MS = 350;

const token = process.env.RAILWAY_TOKEN;
if (!token) {
  console.error('RAILWAY_TOKEN is not set (source .env, or run `make validate-live`).');
  process.exit(1);
}

let params = {};
let only = null;
let verbose = false;
let withFixture = false;
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--params') params = { ...params, ...JSON.parse(argv[++i]) };
  else if (argv[i] === '--only') only = argv[++i].split(',').map((s) => s.trim());
  else if (argv[i] === '--verbose') verbose = true;
  else if (argv[i] === '--with-fixture') withFixture = true;
  else { console.error(`Unknown argument: ${argv[i]}`); process.exit(1); }
}
if (process.env.RAILWAY_VALIDATE_PARAMS) params = { ...JSON.parse(process.env.RAILWAY_VALIDATE_PARAMS), ...params };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let lastRemaining = null;
async function post(query, variables) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(variables ? { query, variables } : { query }),
  });
  lastRemaining = res.headers.get('x-ratelimit-remaining');
  if (res.status === 429) throw new Error(`rate limited (429), retry after ${res.headers.get('retry-after')}s`);
  const text = await res.text();
  await sleep(PACE_MS);
  try {
    return { status: res.status, body: JSON.parse(text) };
  } catch {
    return { status: res.status, body: { errors: [{ message: `non-JSON response: ${text.slice(0, 200)}` }] } };
  }
}

async function must(query, variables) {
  const r = await post(query, variables);
  if (r.body.errors) throw new Error(`fixture step failed: ${r.body.errors.map((e) => e.message).join('; ')} (${query.slice(0, 80)})`);
  return r.body.data;
}

// discovery: the workspace the token can reach
if (!params.workspace_id) {
  const r = await post('query { apiToken { workspaces { id name } } }');
  const ws = r.body?.data?.apiToken?.workspaces || [];
  if (ws.length > 0) params.workspace_id = ws[0].id;
}
if (!params.username) {
  const r = await post('query { me { username } }');
  if (r.body?.data?.me?.username) params.username = r.body.data.me.username;
}

let fixtureProjectId = null;
async function createFixture() {
  const name = `${FIXTURE_PREFIX}${String(Date.now()).slice(-6)}`;
  const project = (await must(
    'mutation($input: ProjectCreateInput!) { projectCreate(input: $input) { id environments { edges { node { id } } } } }',
    { input: { name, description: 'stackql provider live validation - safe to delete', workspaceId: params.workspace_id } },
  )).projectCreate;
  fixtureProjectId = project.id;
  const projectId = project.id;
  const environmentId = project.environments.edges[0].node.id;
  console.log(`fixture: project ${name} (${projectId})`);
  const serviceId = (await must('mutation($input: ServiceCreateInput!) { serviceCreate(input: $input) { id } }', { input: { projectId, name: 'validate-svc' } })).serviceCreate.id;
  const second = (await must('mutation($input: EnvironmentCreateInput!) { environmentCreate(input: $input) { id } }', { input: { projectId, name: 'staging' } })).environmentCreate.id;
  await must('mutation($input: VariableUpsertInput!) { variableUpsert(input: $input) }', { input: { projectId, environmentId, serviceId, name: 'VALIDATE_SERVICE', value: '1', skipDeploys: true } });
  // a shared variable has no service: the row that breaks Variable.service
  await must('mutation($input: VariableUpsertInput!) { variableUpsert(input: $input) }', { input: { projectId, environmentId, name: 'VALIDATE_SHARED', value: '1', skipDeploys: true } });
  await must('mutation($input: ServiceDomainCreateInput!) { serviceDomainCreate(input: $input) { id } }', { input: { environmentId, serviceId } });
  await must('mutation($input: ProjectTokenCreateInput!) { projectTokenCreate(input: $input) }', { input: { projectId, environmentId, name: 'validate' } });
  const volumeId = (await must('mutation($input: VolumeCreateInput!) { volumeCreate(input: $input) { id } }', { input: { projectId, environmentId, serviceId, mountPath: '/data' } })).volumeCreate.id;
  let volumeInstanceId;
  for (let i = 0; i < 6 && !volumeInstanceId; i++) {
    await sleep(2500);
    const edges = (await must(`query { environment(id: "${environmentId}") { volumeInstances { edges { node { id } } } } }`)).environment.volumeInstances.edges;
    if (edges.length > 0) volumeInstanceId = edges[0].node.id;
  }
  return {
    project_id: projectId,
    environment_id: environmentId,
    service_id: serviceId,
    volume_id: volumeId,
    ...(volumeInstanceId ? { volume_instance_id: volumeInstanceId } : {}),
    source_environment_id: environmentId,
    target_environment_id: second,
  };
}

async function deleteFixture() {
  if (!fixtureProjectId) return;
  // only ever the project this run created, by id
  const r = await post('mutation($id: String!) { projectDelete(id: $id) }', { id: fixtureProjectId });
  console.log(r.body.errors ? `fixture: DELETE FAILED for project ${fixtureProjectId}: ${r.body.errors.map((e) => e.message).join('; ')} - delete it by hand` : `fixture: project ${fixtureProjectId} deleted`);
}

const results = [];
try {
  if (withFixture) params = { ...(await createFixture()), ...params };

  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 3600 * 1000);
  const samples = {
    start_date: dayAgo.toISOString(),
    end_date: now.toISOString(),
    measurements: '[CPU_USAGE, MEMORY_USAGE_GB]',
    code: 'postgres',
    query: 'postgres',
    domain: 'stackql-validate.example.org',
    full_repo_name: 'stackql/stackql',
    owner: 'stackql',
    repo: 'stackql',
    // a day at the default resolution exceeds the API's 1000 data points
    step_seconds: '300',
    ...params,
  };
  const SCOPE_PARAMS = ['workspace_id', 'project_id', 'step_seconds'];
  // a host keyed by its own id takes it as `id`
  const aliases = { project: 'project_id', environment: 'environment_id', service: 'service_id', deployment: 'deployment_id', volume_instance: 'volume_instance_id' };

  const valuesFor = (resource, parameters) => {
    const values = {};
    const missing = [];
    for (const p of parameters.filter((x) => x.required)) {
      let v = samples[p.name];
      if (v === undefined && p.name === 'id') {
        const noun = Object.keys(aliases).sort((a, b) => b.length - a.length).find((n) => resource === `${n}s` || resource.startsWith(`${n}_`));
        if (noun) v = samples[aliases[noun]];
      }
      if (v === undefined) missing.push(p.name);
      else values[p.name] = v;
    }
    // scope parameters are optional in the schema but several reads (usage,
    // metrics, deployments) are only authorized within a scope
    for (const p of parameters.filter((x) => !x.required && SCOPE_PARAMS.includes(x.name))) {
      if (samples[p.name] !== undefined) values[p.name] = samples[p.name];
    }
    return { values, missing };
  };

  for (const file of fs.readdirSync(servicesDir).sort()) {
    const service = file.replace(/\.yaml$/, '');
    const doc = yaml.load(fs.readFileSync(path.join(servicesDir, file), 'utf8'));
    for (const [pathKey, item] of Object.entries(doc.paths)) {
      const op = item.post;
      const gql = op['x-stackQL-graphQL'];
      if (!gql) continue;
      const q = new URLSearchParams(pathKey.split('?')[1]);
      const resource = q.get('__resource');
      const method = q.get('__method');
      const id = `${service}.${resource}.${method}`;
      if (only && !only.includes(id)) continue;
      const { values, missing } = valuesFor(resource, op.parameters || []);
      if (missing.length > 0) {
        results.push({ id, status: 'SKIPPED', detail: `no value for ${missing.join(', ')}` });
        continue;
      }
      const rendered = renderTemplate(gql.query, { ...values, cursor: '' });
      let r = await post(rendered);
      // "Problem processing request" without a path is the API's generic
      // server error and is sometimes transient (an upstream call failed):
      // ask once more before recording it
      if ((r.body.errors || []).some((e) => !e.path && /Problem processing request/.test(e.message))) {
        await sleep(2000);
        r = await post(rendered);
      }
      const errs = r.body.errors || [];
      if (errs.length === 0) {
        results.push({ id, status: 'PASS', detail: '' });
      } else {
        const seen = new Set();
        const detail = errs.map((e) => `${(e.path || []).filter((s) => typeof s !== 'number').join('.') || '(document)'}: ${e.message}`)
          .filter((d) => (seen.has(d) ? false : seen.add(d)))
          .join(' | ');
        results.push({ id, status: 'FAIL', detail });
      }
      const last = results[results.length - 1];
      if (verbose || last.status === 'FAIL') console.log(`${last.status.padEnd(7)} ${id}${last.detail ? `  ${last.detail.slice(0, 300)}` : ''}`);
    }
  }
} catch (e) {
  console.error(`stopped: ${e.message}`);
} finally {
  await deleteFixture();
}

const count = (s) => results.filter((r) => r.status === s).length;
console.log(`\n${count('PASS')} passed, ${count('FAIL')} failed, ${count('SKIPPED')} skipped (no parameter values); rate limit remaining: ${lastRemaining}`);
if (only) {
  console.log('--only given: the report file is not rewritten');
} else {
  // ids are stripped so that the committed report does not change run to run
  const scrub = (s) => s.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/g, '<id>');
  const csvEscape = (v) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
  const lines = ['method,status,detail'].concat(results.map((r) => [r.id, r.status, scrub(r.detail)].map(csvEscape).join(',')));
  fs.writeFileSync(reportFile, lines.join('\n') + '\n');
  console.log(`Report: ${path.relative(baseDir, reportFile)}`);
}
