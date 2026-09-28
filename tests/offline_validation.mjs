#!/usr/bin/env node

// Offline validation of the generated provider: no network, no credentials.
//
// Part 1 reads the generated documents directly and checks the invariants
// every method must hold (each is a defect class found while building the
// provider - see NOTES.md):
//   - every column, parameter and request body attribute is snake_case
//   - every $ref resolves; every path key is unique and routes on the
//     __resource / __method query pairs
//   - SELECT methods use the native GraphQL read path, carry a cursor block
//     (the engine requires one even on gets) and a response selection
//   - mutation methods drop the routing query string from the wire, take
//     their body by bare attribute name, build the request with the JSON
//     template and raise on a GraphQL errors array
//   - the documents agree with provider-dev/config/all_services.csv
// Part 2 asks the engine: SHOW / DESCRIBE against the local file registry
// for representative resources.
//
// Requires a stackql binary: $STACKQL, ./stackql(.exe), or stackql on PATH.
//
// Usage: node tests/offline_validation.mjs [--verbose]

import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { repoRoot, generatedRegistry, registryArg, runSql, makeChecker, PROVIDER, PROVIDER_VERSION, LIVE_SERVER_URL } from './lib/stackql.mjs';
import { readMappingCsv } from '../provider-dev/scripts/lib/mapping_stability.mjs';

const verbose = process.argv.includes('--verbose');
const { check, finish } = makeChecker();
const providerDir = path.join(generatedRegistry, 'src', PROVIDER, PROVIDER_VERSION);
const SNAKE = /^[a-z][a-z0-9_]*$/;

// ------------------------------------------------------------------ part 1
console.log('generated documents');
const provider = yaml.load(fs.readFileSync(path.join(providerDir, 'provider.yaml'), 'utf8'));
check('provider.yaml declares bearer auth from RAILWAY_TOKEN', provider.config?.auth?.type === 'bearer' && provider.config?.auth?.credentialsenvvar === 'RAILWAY_TOKEN', JSON.stringify(provider.config));

const serviceFiles = fs.readdirSync(path.join(providerDir, 'services')).filter((f) => f.endsWith('.yaml')).sort();
check('every service document is registered in provider.yaml', JSON.stringify(serviceFiles.map((f) => f.replace('.yaml', ''))) === JSON.stringify(Object.keys(provider.providerServices).sort()), serviceFiles.join(','));

const problems = { casing: [], refs: [], select: [], mutation: [], routing: [], server: [] };
const methodIndex = new Map();
let selectCount = 0;
let mutationCount = 0;

// Row schemas live in components.schemas: those are the SQL surface. The
// response envelope around them (data.<field>.edges[].node) keeps the wire
// names and is only checked for references that do not resolve.
function walkRowSchema(schema, where) {
  if (!schema || typeof schema !== 'object') return;
  for (const [k, v] of Object.entries(schema.properties || {})) {
    if (!SNAKE.test(k)) problems.casing.push(`${where}.${k}`);
    walkRowSchema(v, `${where}.${k}`);
  }
  if (schema.items) walkRowSchema(schema.items, `${where}[]`);
}

function checkRefs(schema, where, doc) {
  if (!schema || typeof schema !== 'object') return;
  if (schema.$ref) {
    const name = schema.$ref.replace('#/components/schemas/', '');
    if (!doc.components?.schemas?.[name]) problems.refs.push(`${where}: unresolved ${schema.$ref}`);
    return;
  }
  for (const [k, v] of Object.entries(schema.properties || {})) checkRefs(v, `${where}.${k}`, doc);
  if (schema.items) checkRefs(schema.items, `${where}[]`, doc);
}

for (const file of serviceFiles) {
  const service = file.replace('.yaml', '');
  const doc = yaml.load(fs.readFileSync(path.join(providerDir, 'services', file), 'utf8'));
  if (doc.servers?.[0]?.url !== LIVE_SERVER_URL) problems.server.push(`${service}: ${doc.servers?.[0]?.url}`);
  for (const [name, schema] of Object.entries(doc.components.schemas || {})) walkRowSchema(schema, `${service} schema ${name}`);
  for (const [resource, res] of Object.entries(doc.components['x-stackQL-resources'])) {
    if (!SNAKE.test(resource)) problems.casing.push(`${service}.${resource} (resource)`);
    const verbRefs = new Set(Object.values(res.sqlVerbs).flat().map((r) => r.$ref));
    for (const ref of verbRefs) {
      const name = ref.split('/').pop();
      if (!res.methods[name]) problems.refs.push(`${service}.${resource}: sqlVerbs names a missing method ${name}`);
    }
    for (const [method, m] of Object.entries(res.methods)) {
      const id = `${service}.${resource}.${method}`;
      if (!SNAKE.test(method)) problems.casing.push(`${id} (method)`);
      const pathKey = m.operation.$ref.replace('#/paths/', '').replace(/\/post$/, '').replace(/~1/g, '/').replace(/~0/g, '~');
      const op = doc.paths[pathKey]?.post;
      if (!op) { problems.refs.push(`${id}: operation ${m.operation.$ref} does not resolve`); continue; }
      if (pathKey !== `/graphql/v2?__resource=${resource}&__method=${method}`) problems.routing.push(`${id}: path key ${pathKey}`);
      const verb = Object.entries(res.sqlVerbs).find(([, refs]) => refs.some((r) => r.$ref.endsWith(`/methods/${method}`)))?.[0] || 'exec';
      methodIndex.set(id, { verb, objectKey: m.response?.objectKey || '' });
      checkRefs(op.responses?.['200']?.content?.['application/json']?.schema, `${id} response`, doc);
      const gql = op['x-stackQL-graphQL'];
      if (gql) {
        selectCount++;
        if (verb !== 'select') problems.select.push(`${id}: a GraphQL read method is wired to ${verb}`);
        if (!gql.cursor?.jsonPath) problems.select.push(`${id}: no cursor.jsonPath`);
        if (!gql.responseSelection?.jsonPath) problems.select.push(`${id}: no responseSelection`);
        if (!m.response?.objectKey) problems.select.push(`${id}: no objectKey`);
        if (/\n/.test(gql.query)) problems.select.push(`${id}: query text spans lines (the reader strips newlines without replacement)`);
        for (const p of op.parameters || []) if (!SNAKE.test(p.name)) problems.casing.push(`${id} parameter ${p.name}`);
      } else {
        mutationCount++;
        if (verb === 'select') problems.mutation.push(`${id}: a mutation is wired to select`);
        if (m.config?.requestTranslate?.algorithm !== 'drop_double_underscore_params') problems.mutation.push(`${id}: routing query string is not dropped`);
        if (m.config?.requestBodyTranslate?.algorithm !== 'naive') problems.mutation.push(`${id}: no naive request body translation`);
        if (m.request?.transform?.type !== 'golang_template_json_v0.3.0' || !m.request.transform.body.startsWith('{"query":"mutation')) problems.mutation.push(`${id}: request transform`);
        if (m.response?.overrideMediaType !== 'application/json' || !/getRegexpFirstMatch/.test(m.response?.transform?.body || '')) problems.mutation.push(`${id}: response transform does not raise on errors`);
        const body = op.requestBody?.content?.['application/json']?.schema;
        for (const k of Object.keys(body?.properties || {})) if (!SNAKE.test(k)) problems.casing.push(`${id} body attribute ${k}`);
        for (const k of body?.required || []) if (!body.properties[k]) problems.refs.push(`${id}: required attribute ${k} is not declared`);
      }
    }
  }
}
check('no camelCase names on the SQL surface (resources, methods, columns, parameters, body attributes)', problems.casing.length === 0, problems.casing.slice(0, 5).join('; '));
check('every $ref and sqlVerbs entry resolves', problems.refs.length === 0, problems.refs.slice(0, 5).join('; '));
check('every path key routes on __resource / __method', problems.routing.length === 0, problems.routing.slice(0, 5).join('; '));
check('every service document targets the API host', problems.server.length === 0, problems.server.join('; '));
check(`every SELECT method is a complete GraphQL read method (${selectCount})`, selectCount > 0 && problems.select.length === 0, problems.select.slice(0, 5).join('; '));
check(`every mutation method is a complete REST-path method (${mutationCount})`, mutationCount > 0 && problems.mutation.length === 0, problems.mutation.slice(0, 5).join('; '));

const mapping = readMappingCsv(path.join(repoRoot, 'provider-dev', 'config', 'all_services.csv')) || [];
const mappingIds = new Map(mapping.map((r) => [`${r.filename.replace('.yaml', '')}.${r.stackql_resource_name}.${r.stackql_method_name}`, r]));
const missing = [...methodIndex.keys()].filter((id) => !mappingIds.has(id));
const stale = [...mappingIds.keys()].filter((id) => !methodIndex.has(id));
const verbDiff = [...methodIndex].filter(([id, m]) => mappingIds.has(id) && mappingIds.get(id).stackql_verb !== m.verb).map(([id]) => id);
check('all_services.csv lists exactly the generated methods', missing.length === 0 && stale.length === 0, `missing ${missing.slice(0, 3)} stale ${stale.slice(0, 3)}`);
check('all_services.csv SQL verbs match the generated sqlVerbs wiring', verbDiff.length === 0, verbDiff.slice(0, 5).join('; '));
check('every mapping row names its upstream GraphQL operation', mapping.every((r) => /^(Query|Mutation)\.[A-Za-z0-9_>]+$/.test(r.tags)), mapping.find((r) => !/^(Query|Mutation)\./.test(r.tags))?.tags);

// ------------------------------------------------------------------ part 2
console.log('\nengine: SHOW and DESCRIBE against the local file registry');
const registry = registryArg(generatedRegistry);
const sql = (statement, opts = {}) => runSql(statement, { registry, verbose, ...opts });
const names = (rows, key = 'name') => (rows || []).map((r) => r[key]);

let r = await sql(`SHOW SERVICES IN ${PROVIDER}`);
check('SHOW SERVICES lists the 15 services', r.rows && r.rows.length === 15 && ['projects', 'services', 'deployments', 'variables', 'networking', 'storage'].every((s) => names(r.rows).includes(s)), r.err || names(r.rows).join(','));

r = await sql(`SHOW RESOURCES IN ${PROVIDER}.projects`);
check('projects service carries projects, project_members, project_tokens', ['projects', 'project_members', 'project_tokens', 'project_invitations'].every((s) => names(r.rows).includes(s)), r.err || names(r.rows).join(','));

r = await sql(`SHOW RESOURCES IN ${PROVIDER}.networking`);
check('networking service carries the Terraform domain and proxy resources', ['service_domains', 'custom_domains', 'tcp_proxies'].every((s) => names(r.rows).includes(s)), r.err || names(r.rows).join(','));

r = await sql(`SHOW METHODS IN ${PROVIDER}.projects.projects`);
const methods = Object.fromEntries((r.rows || []).map((m) => [m.MethodName, m]));
check('projects: get / list / list_by_ids are SELECT with distinct required parameters', methods.get?.SQLVerb === 'SELECT' && methods.get?.RequiredParams === 'id' && methods.list?.RequiredParams === '' && methods.list_by_ids?.RequiredParams === 'ids', JSON.stringify(r.rows).slice(0, 300));
check('projects: create is INSERT, update is UPDATE, delete is DELETE', methods.create?.SQLVerb === 'INSERT' && methods.update?.SQLVerb === 'UPDATE' && methods.delete?.SQLVerb === 'DELETE', JSON.stringify(r.rows).slice(0, 300));
check('projects: lifecycle operations are EXEC methods on the resource', ['transfer', 'leave', 'schedule_delete', 'claim'].every((m) => methods[m]?.SQLVerb === 'EXEC'), Object.keys(methods).join(','));

r = await sql(`SHOW METHODS IN ${PROVIDER}.deployments.deployments`);
const dm = Object.fromEntries((r.rows || []).map((m) => [m.MethodName, m]));
check('deployments: redeploy, restart, rollback, stop, cancel are EXEC requiring id', ['redeploy', 'restart', 'rollback', 'stop', 'cancel'].every((m) => dm[m]?.SQLVerb === 'EXEC' && dm[m]?.RequiredParams === 'id'), JSON.stringify(r.rows).slice(0, 300));

r = await sql(`SHOW METHODS IN ${PROVIDER}.services.services`);
const sm = Object.fromEntries((r.rows || []).map((m) => [m.MethodName, m]));
check('services: list requires project_id (host parameter renamed from id)', sm.list?.RequiredParams === 'project_id' && sm.get?.RequiredParams === 'id', JSON.stringify(r.rows).slice(0, 300));

r = await sql(`SHOW METHODS IN ${PROVIDER}.variables.variables`);
const vm = Object.fromEntries((r.rows || []).map((m) => [m.MethodName, m]));
check('variables: upsert and upsert_collection are INSERT with distinct signatures', vm.upsert?.SQLVerb === 'INSERT' && vm.upsert_collection?.SQLVerb === 'INSERT' && vm.upsert.RequiredParams !== vm.upsert_collection.RequiredParams, JSON.stringify(r.rows).slice(0, 400));

r = await sql(`DESCRIBE EXTENDED ${PROVIDER}.projects.projects`);
const cols = names(r.rows);
check('DESCRIBE projects shows snake_case columns', ['id', 'name', 'created_at', 'is_public', 'workspace_id', 'pr_deploys'].every((c) => cols.includes(c)), r.err || cols.join(','));
check('DESCRIBE projects shows no camelCase column', cols.length > 0 && cols.every((c) => SNAKE.test(c)), cols.filter((c) => !SNAKE.test(c)).join(','));

r = await sql(`DESCRIBE EXTENDED ${PROVIDER}.services.service_instances`);
check('DESCRIBE service_instances shows build and deploy configuration columns', ['start_command', 'build_command', 'num_replicas', 'region', 'latest_deployment', 'healthcheck_path'].every((c) => names(r.rows).includes(c)), r.err || names(r.rows).join(','));

r = await sql(`DESCRIBE EXTENDED ${PROVIDER}.variables.variables`);
check('DESCRIBE variables shows name and value', JSON.stringify(names(r.rows).sort()) === JSON.stringify(['name', 'value']), r.err || names(r.rows).join(','));

r = await sql(`DESCRIBE EXTENDED ${PROVIDER}.templates.template_counts`);
check('DESCRIBE of a scalar read shows the result column', JSON.stringify(names(r.rows)) === JSON.stringify(['result']), r.err || names(r.rows).join(','));

r = await sql(`DESCRIBE EXTENDED ${PROVIDER}.platform.signals`);
check('reserved word column carries the suffix (default_)', names(r.rows).includes('default_') && !names(r.rows).includes('default'), r.err || names(r.rows).join(','));

r = await sql(`SELECT id FROM ${PROVIDER}.projects.projects`, { env: { RAILWAY_TOKEN: undefined } });
check('a missing RAILWAY_TOKEN fails with a credentials error before any request', r.rows === null && /credential/i.test(r.err || ''), JSON.stringify(r).slice(0, 200));

process.exit(finish('offline validation'));
