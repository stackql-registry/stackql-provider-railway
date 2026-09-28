#!/usr/bin/env node

// Integration tests: run the generated provider against the mock Railway
// GraphQL server and assert row-level results and wire shapes per archetype.
//
// SELECT (native GraphQL read path)
//   - connection unwrapping (edges[*].node) and page_info traversal across
//     pages, terminating on hasNextPage=false despite a non-empty endCursor
//   - snake_case columns via query aliases, nested objects as JSON columns
//   - parameter templating: quoted strings, bare booleans (false rendered,
//     not dropped), raw list literals, omitted optionals absent on the wire
//   - input object arguments flattened into parameters (deployments)
//   - nested collections under a host get (services of a project) and
//     nested single objects (customers, service_edge_configs)
//   - wrapper unwrapping with a non-Relay cursor (cloud_agent_tasks)
//   - response transforms: key/value map -> rows, scalar -> result row,
//     scalar list -> result rows
//   - SQL LIMIT pushed down to a limit argument
//   - GraphQL errors (HTTP 200) surfacing as a statement failure
// INSERT / UPDATE / DELETE / EXEC (REST path, GraphQL variables)
//   - request body {"query": "mutation...", "variables": {...}} with only
//     the supplied variables, typed (UPDATE strings coerced back)
//   - RETURNING projections, scalar results as the `result` column
//   - the routing query string dropped from the wire, bearer auth
//   - GraphQL errors surfacing on INSERT, UPDATE and EXEC with SHOWRESULTS;
//     the engine's handling of DELETE and plain EXEC is pinned as observed
//
// Requires a stackql binary: $STACKQL, ./stackql(.exe), or stackql on PATH.
//
// Usage: node tests/integration/run_integration_tests.mjs [--verbose]

import { startMockServer, IDS } from './mock_railway_server.mjs';
import { findStackql, materializeMockRegistry, registryArg, runSql, makeChecker } from '../lib/stackql.mjs';

const verbose = process.argv.includes('--verbose');
const { check, finish } = makeChecker();

const mock = await startMockServer({ pageSizes: { projects: 2 } });
const reg = materializeMockRegistry(mock.port, 'itest');
const registry = registryArg(reg.root);
const sql = (statement, opts = {}) => runSql(statement, { registry, verbose, ...opts });
const since = (mark) => mock.log.slice(mark);
// the argument list of the first call to a field, without its selection set
const argsOf = (query, field) => (query.match(new RegExp(`${field}\\(([^)]*)\\)`)) || ['', ''])[1];
const sameObject = (a, b) => JSON.stringify(Object.entries(a || {}).sort()) === JSON.stringify(Object.entries(b || {}).sort());

console.log(`mock railway graphql server on localhost:${mock.port}, stackql: ${findStackql()}`);
console.log(`test registry: ${reg.root}`);

let exitCode = 1;
try {
  // ------------------------------------------------------------ SELECT
  console.log('\nconnection list and pagination');
  let mark = mock.log.length;
  let r = await sql('SELECT id, name, created_at, is_public, workspace_id FROM railway.projects.projects');
  let calls = since(mark);
  check('projects list returns 3 rows across 2 pages', r.rows && r.rows.length === 3, r.err || `got ${r.rows?.length}`);
  check('snake_case alias columns projected', r.rows?.[0]?.created_at === '2026-01-01T00:00:00.000Z' && r.rows?.[0]?.workspace_id === IDS.workspace, JSON.stringify(r.rows?.[0]));
  check('page_info traversal made exactly 2 requests', calls.length === 2, `got ${calls.length}`);
  check('second request splices , after: "<endCursor>"', calls.length === 2 && calls[1].query.includes(`, after: "${IDS.project2}"`), calls[1]?.query?.slice(0, 120));
  check('query aliases fields to snake_case on the wire', /created_at: createdAt/.test(calls[0]?.query || ''), calls[0]?.query?.slice(0, 200));
  check('bearer token header sent', calls.every((c) => c.auth === 'Bearer mock-token'), JSON.stringify(calls.map((c) => c.auth)));
  check('routing query string is not on the wire (select)', calls.every((c) => c.path === '/graphql/v2'), JSON.stringify(calls.map((c) => c.path)));
  check('omitted optional arguments absent from the wire', argsOf(calls[0]?.query || '', 'projects').trim() === 'first: 100', argsOf(calls[0]?.query || '', 'projects'));

  console.log('\nparameter templating');
  mark = mock.log.length;
  r = await sql(`SELECT id, name FROM railway.projects.projects WHERE workspace_id = '${IDS.workspace}' AND include_deleted = false`);
  let q = since(mark)[0]?.query || '';
  check('string argument rendered quoted', q.includes(`workspaceId: "${IDS.workspace}"`), q.slice(0, 200));
  check('boolean false rendered bare, not dropped', /includeDeleted: false/.test(q), q.slice(0, 200));
  check('fields excluded by policy are not selected (Project.members, Project.workspace)', !/members \{/.test(q) && !/workspace \{/.test(q) && /workspace_id: workspaceId/.test(q), q.slice(0, 300));
  r = await sql(`SELECT service_name, json_extract(latest_deployment, '$.status') AS latest_status, json_extract(source, '$.repo') AS repo FROM railway.services.service_instances WHERE environment_id = '${IDS.environment}'`);
  check('nested objects projected as JSON columns with snake_case keys', r.rows?.length === 2 && r.rows[0].latest_status === 'SUCCESS' && r.rows[0].repo === 'mock-org/api', r.err || JSON.stringify(r.rows?.[0]));
  r = await sql(`SELECT p.name AS project, w.name AS workspace FROM railway.projects.projects p JOIN railway.workspaces.workspaces w ON w.id = p.workspace_id WHERE p.workspace_id = '${IDS.workspace}'`);
  check('local join of projects to workspaces', r.rows?.length === 3 && r.rows.every((x) => x.workspace === 'Mock Workspace'), r.err || JSON.stringify(r.rows));

  console.log('\nget by id');
  mark = mock.log.length;
  r = await sql(`SELECT id, name, description FROM railway.projects.projects WHERE id = '${IDS.project2}'`);
  q = since(mark)[0]?.query || '';
  check('projects get returns exactly 1 row', r.rows && r.rows.length === 1 && r.rows[0].name === 'beta', r.err || JSON.stringify(r.rows));
  check('get renders project(id: "...")', q.includes(`project(id: "${IDS.project2}")`), q.slice(0, 120));
  check('get made a single request', since(mark).length === 1, `got ${since(mark).length}`);

  console.log('\nraw list parameter on an overloaded select');
  mark = mock.log.length;
  r = await sql(`SELECT id, name FROM railway.projects.projects WHERE ids = '["${IDS.project1}","${IDS.project3}"]'`);
  q = since(mark)[0]?.query || '';
  check('list_by_ids selected by its required parameter', /projectsByIds\(/.test(q), q.slice(0, 120));
  check('list literal rendered verbatim', q.includes(`ids: ["${IDS.project1}","${IDS.project3}"]`), q.slice(0, 200));
  check('list_by_ids returns the 2 requested rows', r.rows && r.rows.length === 2, r.err || JSON.stringify(r.rows));

  console.log('\nnested collection under a host get');
  mark = mock.log.length;
  r = await sql(`SELECT id, name, project_id FROM railway.services.services WHERE project_id = '${IDS.project1}'`);
  q = since(mark)[0]?.query || '';
  check('services list wraps the host: project(id: ...) { services(...) }', q.includes(`project(id: "${IDS.project1}") { services(first: 100`), q.slice(0, 160));
  check('services list returns the 2 service rows', r.rows && r.rows.length === 2 && r.rows[0].name === 'api', r.err || JSON.stringify(r.rows));

  console.log('\nnested single object');
  r = await sql(`SELECT id, state, credit_balance, current_usage FROM railway.billing.customers WHERE workspace_id = '${IDS.workspace}'`);
  check('customers get returns 1 row from workspace.customer', r.rows && r.rows.length === 1 && r.rows[0].id === 'cus-1' && Number(r.rows[0].credit_balance) === 5, r.err || JSON.stringify(r.rows));
  r = await sql(`SELECT id, enabled, purge_epoch FROM railway.services.service_edge_configs WHERE environment_id = '${IDS.environment}' AND service_id = '${IDS.service1}'`);
  check('service_edge_configs get returns 1 row from serviceInstance.edgeConfig', r.rows && r.rows.length === 1 && r.rows[0].id === 'edge-1', r.err || JSON.stringify(r.rows));

  console.log('\ninput object argument flattened into parameters');
  mark = mock.log.length;
  r = await sql(`SELECT id, status, static_url FROM railway.deployments.deployments WHERE project_id = '${IDS.project1}' AND environment_id = '${IDS.environment}' AND status = '{in: [SUCCESS]}'`);
  q = since(mark)[0]?.query || '';
  check('input fields rendered inside input: { ... }', /input: \{ environmentId: "[^"]+" projectId: "[^"]+" status: \{in: \[SUCCESS\]\} \}/.test(q), q.slice(0, 220));
  check('deployments filtered by the pushed down input', r.rows && r.rows.length === 1 && r.rows[0].status === 'SUCCESS', r.err || JSON.stringify(r.rows));
  mark = mock.log.length;
  r = await sql('SELECT id, status FROM railway.deployments.deployments');
  q = since(mark)[0]?.query || '';
  check('required input with no fields supplied renders input: { }', /input: \{ \}/.test(q), q.slice(0, 120));
  check('unfiltered deployments returns both rows', r.rows && r.rows.length === 2, r.err || JSON.stringify(r.rows));

  console.log('\nwrapper with a non-Relay cursor');
  mark = mock.log.length;
  r = await sql(`SELECT id, status, cloud_agent_id FROM railway.agents.cloud_agent_tasks WHERE environment_id = '${IDS.environment}'`);
  calls = since(mark);
  check('cloud_agent_tasks returns 3 rows across 2 pages', r.rows && r.rows.length === 3, r.err || `got ${r.rows?.length}`);
  check('second page sends cursor: "<nextCursor>"', calls.length === 2 && calls[1].query.includes('cursor: "TASK_CURSOR_1"'), calls[1]?.query?.slice(0, 120));
  check('traversal stops on a null nextCursor', calls.length === 2, `got ${calls.length} requests`);

  console.log('\nunwrapped list without paging');
  r = await sql('SELECT id, name FROM railway.account.api_token_workspaces');
  check('api_token_workspaces returns the token workspace row', r.rows && r.rows.length === 1 && r.rows[0].id === IDS.workspace, r.err || JSON.stringify(r.rows));

  console.log('\nresponse transforms');
  r = await sql(`SELECT name, value FROM railway.variables.variables WHERE project_id = '${IDS.project1}' AND environment_id = '${IDS.environment}'`);
  check('variables map unpacked into name/value rows', r.rows && r.rows.length === 2 && r.rows.some((x) => x.name === 'API_KEY' && x.value === 'secret-1'), r.err || JSON.stringify(r.rows));
  r = await sql('SELECT result FROM railway.templates.template_counts');
  check('scalar answer surfaces as one result row', r.rows && r.rows.length === 1 && String(r.rows[0].result) === '4242', r.err || JSON.stringify(r.rows));
  r = await sql('SELECT result FROM railway.integrations.github_writable_scopes');
  check('scalar list surfaces as result rows', r.rows && r.rows.length === 2 && r.rows[0].result === 'mock-org', r.err || JSON.stringify(r.rows));

  console.log('\nraw enum list parameter');
  mark = mock.log.length;
  r = await sql(`SELECT measurement, value FROM railway.billing.usage WHERE measurements = '[CPU_USAGE, MEMORY_USAGE_GB]' AND project_id = '${IDS.project1}'`);
  q = since(mark)[0]?.query || '';
  check('enum list literal rendered verbatim and unquoted', /measurements: \[CPU_USAGE, MEMORY_USAGE_GB\]/.test(q), q.slice(0, 160));
  check('usage returns one row per measurement', r.rows && r.rows.length === 2 && r.rows[0].measurement === 'CPU_USAGE', r.err || JSON.stringify(r.rows));

  console.log('\nSQL LIMIT pushdown');
  mark = mock.log.length;
  r = await sql(`SELECT message, severity FROM railway.observability.build_logs WHERE deployment_id = '${IDS.deployment}' LIMIT 2`);
  q = since(mark)[0]?.query || '';
  check('LIMIT pushed down to limit: 2', /limit: 2 /.test(q), q.slice(0, 160));
  check('build_logs returns the limited rows', r.rows && r.rows.length === 2, r.err || JSON.stringify(r.rows));
  mark = mock.log.length;
  r = await sql(`SELECT message FROM railway.observability.build_logs WHERE deployment_id = '${IDS.deployment}'`);
  q = since(mark)[0]?.query || '';
  check('no LIMIT leaves the limit argument off the wire', !/limit:/.test(q) && r.rows && r.rows.length === 3, q.slice(0, 160));

  console.log('\nreserved word column');
  r = await sql('SELECT id, name, default_ FROM railway.platform.signals');
  check('reserved word column selectable with the suffix (default_)', r.rows && r.rows.length === 1 && /on/.test(String(r.rows[0].default_)), r.err || JSON.stringify(r.rows));

  console.log('\nGraphQL errors on the read path');
  r = await sql("SELECT id FROM railway.projects.projects WHERE workspace_id = 'trigger-error'");
  check('errors array (HTTP 200) fails the SELECT with the API message', r.rows === null && /graphql error: Not Authorized/.test(r.err || ''), JSON.stringify(r).slice(0, 200));
  r = await sql('SELECT id FROM railway.projects.projects', { env: { RAILWAY_TOKEN: 'wrong-token' } });
  check('a rejected token fails the SELECT', r.rows === null && /Not Authorized/.test(r.err || ''), JSON.stringify(r).slice(0, 200));

  // --------------------------------------------------------- mutations
  console.log('\nINSERT');
  mock.reset();
  mark = mock.log.length;
  r = await sql(`INSERT INTO railway.projects.projects (name, description, workspace_id, is_public) SELECT 'stackql-it', 'a "quoted" description', '${IDS.workspace}', false`);
  let call = since(mark)[0];
  check('INSERT despatched', /despatched successfully/.test(r.text || ''), r.text);
  check('routing query string dropped from the wire (mutation)', call?.path === '/graphql/v2', call?.path);
  check('mutation sent with bearer auth and JSON content type', call?.auth === 'Bearer mock-token' && /application\/json/.test(call?.contentType || ''), `${call?.auth} ${call?.contentType}`);
  check('mutation document uses variables, snake_case names', /^mutation\(.*\$workspace_id: String.*\) \{ projectCreate\(input: \{.*workspaceId: \$workspace_id/.test(call?.query || ''), call?.query?.slice(0, 200));
  check('variables carry only the supplied values, typed', sameObject(call?.variables, { description: 'a "quoted" description', is_public: false, name: 'stackql-it', workspace_id: IDS.workspace }), JSON.stringify(call?.variables));
  check('project created in the mock store', mock.store().projects.some((p) => p.name === 'stackql-it'), JSON.stringify(mock.store().projects.map((p) => p.name)));

  console.log('\nINSERT ... RETURNING');
  mock.reset();
  r = await sql(`INSERT INTO railway.projects.projects (name, workspace_id) SELECT 'stackql-it-2', '${IDS.workspace}' RETURNING id, name, created_at`);
  check('RETURNING projects the created row', r.rows && r.rows.length === 1 && r.rows[0].id === IDS.created && r.rows[0].name === 'stackql-it-2', r.err || JSON.stringify(r.rows));
  r = await sql("INSERT INTO railway.account.api_tokens (name) SELECT 'ci-token' RETURNING result");
  check('scalar mutation result returned as the result column', r.rows && r.rows.length === 1 && r.rows[0].result === 'mock-token-for-ci-token', r.err || JSON.stringify(r.rows));

  console.log('\nJSON valued variables');
  mark = mock.log.length;
  r = await sql(`INSERT INTO railway.services.services (project_id, name, source) SELECT '${IDS.project1}', 'redis', '{"image": "redis:7-alpine"}' RETURNING id, name`);
  call = since(mark)[0];
  check('nested input object passed as a JSON object variable', call?.variables?.source?.image === 'redis:7-alpine', JSON.stringify(call?.variables));
  check('service create returns the row', r.rows && r.rows[0]?.name === 'redis', r.err || JSON.stringify(r.rows));
  mark = mock.log.length;
  r = await sql(`INSERT INTO railway.variables.variables (project_id, environment_id, variables, skip_deploys) SELECT '${IDS.project1}', '${IDS.environment}', '{"A": "1", "B": "two"}', true`);
  call = since(mark)[0];
  check('upsert_collection selected by its required parameters', /variableCollectionUpsert/.test(call?.query || ''), call?.query?.slice(0, 120));
  check('map valued variable passed as a JSON object', call?.variables?.variables?.B === 'two' && call?.variables?.skip_deploys === true, JSON.stringify(call?.variables));
  mark = mock.log.length;
  r = await sql(`INSERT INTO railway.variables.variables (project_id, environment_id, name, value) SELECT '${IDS.project1}', '${IDS.environment}', 'C', '3'`);
  call = since(mark)[0];
  check('upsert selected by its required parameters, numeric text stays a string', /variableUpsert/.test(call?.query || '') && call?.variables?.value === '3', JSON.stringify(call?.variables));

  console.log('\nUPDATE');
  mock.reset();
  mark = mock.log.length;
  r = await sql(`UPDATE railway.projects.projects SET description = 'changed', is_public = 'true' WHERE id = '${IDS.project1}'`);
  call = since(mark)[0];
  check('UPDATE despatched', /despatched successfully/.test(r.text || ''), r.text);
  check('WHERE key and SET values sent as variables, boolean coerced from the SQL string', sameObject(call?.variables, { description: 'changed', id: IDS.project1, is_public: true }), JSON.stringify(call?.variables));
  check('project updated in the mock store', mock.store().projects.find((p) => p.id === IDS.project1)?.isPublic === true, JSON.stringify(mock.store().projects[0]));
  mark = mock.log.length;
  r = await sql(`UPDATE railway.services.service_instances SET num_replicas = '2', start_command = 'npm start' WHERE service_id = '${IDS.service1}' AND environment_id = '${IDS.environment}'`);
  call = since(mark)[0];
  check('integer coerced from the SQL string', call?.variables?.num_replicas === 2 && call?.variables?.start_command === 'npm start', JSON.stringify(call?.variables));
  r = await sql(`UPDATE railway.projects.projects SET name = 'renamed' WHERE id = '${IDS.project2}' RETURNING id, name`);
  check('UPDATE ... RETURNING projects the updated row', r.rows && r.rows[0]?.name === 'renamed', r.err || JSON.stringify(r.rows));

  console.log('\nDELETE');
  mock.reset();
  mark = mock.log.length;
  r = await sql(`DELETE FROM railway.projects.projects WHERE id = '${IDS.project3}'`);
  call = since(mark)[0];
  check('DELETE despatched with the key as a variable', /despatched successfully/.test(r.text || '') && call?.variables?.id === IDS.project3, `${r.text} ${JSON.stringify(call?.variables)}`);
  check('project removed from the mock store', !mock.store().projects.some((p) => p.id === IDS.project3), JSON.stringify(mock.store().projects.map((p) => p.id)));
  mark = mock.log.length;
  r = await sql(`DELETE FROM railway.variables.variables WHERE project_id = '${IDS.project1}' AND environment_id = '${IDS.environment}' AND name = 'API_KEY'`);
  call = since(mark)[0];
  check('DELETE with a composite key sends every key', call?.variables?.name === 'API_KEY' && call?.variables?.project_id === IDS.project1, JSON.stringify(call?.variables));

  console.log('\nEXEC');
  mark = mock.log.length;
  r = await sql(`EXEC railway.deployments.deployments.restart @id = '${IDS.deployment}'`);
  call = since(mark)[0];
  check('lifecycle EXEC despatched', /despatched successfully/.test(r.text || '') && /deploymentRestart\(id: \$id\)/.test(call?.query || ''), `${r.text} ${call?.query}`);
  r = await sql(`EXEC /*+ SHOWRESULTS */ railway.deployments.deployments.restart @id = '${IDS.deployment}'`);
  check('EXEC with SHOWRESULTS returns the scalar result', r.rows && r.rows.length === 1 && String(r.rows[0].result) === 'true', r.err || JSON.stringify(r.rows));
  mark = mock.log.length;
  r = await sql('EXEC railway.account.current_user.leave_beta');
  call = since(mark)[0];
  check('mutation without arguments sends an empty variables object', /despatched successfully/.test(r.text || '') && call?.query === 'mutation { userBetaLeave }' && JSON.stringify(call?.variables) === '{}', `${r.text} ${call?.raw}`);

  console.log('\nEXEC with typed attributes');
  // EXEC accepts @parameters of string, object and array type only, so an
  // EXEC-only method declares its Boolean / Int attributes as strings and
  // the request template coerces them (NOTES.md finding 6)
  mark = mock.log.length;
  r = await sql(`EXEC /*+ SHOWRESULTS */ railway.projects.project_favorites.set @project_id = '${IDS.project1}', @favorite = 'true'`);
  call = since(mark)[0];
  check('boolean attribute of an EXEC method supplied as a string, sent as a boolean', call?.variables?.favorite === true && r.rows && String(r.rows[0]?.result) === 'true', `${JSON.stringify(call?.variables)} ${r.text}`);
  r = await sql(`SELECT result FROM railway.projects.project_favorites WHERE workspace_id = '${IDS.workspace}'`);
  check('the EXEC took effect (favorite listed)', r.rows && r.rows.length === 1 && r.rows[0].result === IDS.project1, r.err || JSON.stringify(r.rows));
  mark = mock.log.length;
  r = await sql(`EXEC /*+ SHOWRESULTS */ railway.services.service_instances.update @service_id = '${IDS.service1}', @environment_id = '${IDS.environment}' @@json = '{"service_id": "${IDS.service1}", "environment_id": "${IDS.environment}", "num_replicas": 2, "sleep_application": false}'`);
  call = since(mark)[0];
  check('a typed body for a non-EXEC method run through EXEC is supplied as @@json', call?.variables?.num_replicas === 2 && call?.variables?.sleep_application === false, `${JSON.stringify(call?.variables)} ${r.text}`);

  console.log('\nstatement forms used by the generated docs');
  // website/scripts/sanitize-docs.mjs writes the DELETE, UPDATE and EXEC
  // examples in these shapes: multi-line, with trailing -- comments
  mock.reset();
  mark = mock.log.length;
  r = await sql(`EXEC railway.projects.project_favorites.set \n@favorite='true', --required\n@project_id='${IDS.project1}' --required\n;`);
  call = since(mark)[0];
  check('documented EXEC form binds its attributes', call?.variables?.favorite === true && call?.variables?.project_id === IDS.project1, `${r.text} ${JSON.stringify(call?.variables)}`);
  mark = mock.log.length;
  r = await sql(`UPDATE railway.projects.projects\nSET \ndescription = 'documented form',\npr_deploys = 'true'\nWHERE \nid = '${IDS.project1}' --required\nRETURNING\nid,\ndescription,\npr_deploys;`);
  call = since(mark)[0];
  check('documented UPDATE form binds key and values', call?.variables?.id === IDS.project1 && call?.variables?.pr_deploys === true && r.rows?.[0]?.description === 'documented form', `${r.text} ${JSON.stringify(call?.variables)}`);
  mark = mock.log.length;
  r = await sql(`DELETE FROM railway.variables.variables\nWHERE \nenvironment_id = '${IDS.environment}' --required\nAND name = 'API_KEY' --required\nAND project_id = '${IDS.project1}' --required\nAND service_id = '${IDS.service1}'\n;`);
  call = since(mark)[0];
  check('documented DELETE form binds required and optional keys', call?.variables?.name === 'API_KEY' && call?.variables?.service_id === IDS.service1 && !('API_KEY' in mock.store().variables), `${r.text} ${JSON.stringify(call?.variables)}`);

  console.log('\nreserved word body attribute');
  mark = mock.log.length;
  r = await sql(`INSERT INTO railway.platform.signals (name, owner, type, default_) SELECT 'flag2', 'me', 'BOOLEAN', '{"on": false}' RETURNING id, name, default_`);
  call = since(mark)[0];
  check('default_ maps to the default input field', /default: \$default_/.test(call?.query || '') && call?.variables?.default_?.on === false, `${call?.query?.slice(0, 160)} ${JSON.stringify(call?.variables)}`);
  check('signal create returns the row', r.rows && r.rows[0]?.name === 'flag2', r.err || JSON.stringify(r.rows));

  console.log('\nGraphQL errors on the write path');
  mock.reset();
  r = await sql(`INSERT INTO railway.projects.projects (name) SELECT 'trigger-error'`);
  check('INSERT fails with the API message', /graphql error: Project name is not available/.test(r.text || '') && !/despatched successfully/.test(r.text || ''), r.text);
  r = await sql(`INSERT INTO railway.projects.projects (name) SELECT 'trigger-error' RETURNING id`);
  check('INSERT ... RETURNING fails with the API message', /graphql error: Project name is not available/.test(r.text || '') && !(r.rows && r.rows.length), r.text);
  r = await sql(`UPDATE railway.projects.projects SET name = 'trigger-error' WHERE id = '${IDS.project1}'`);
  check('UPDATE fails with the API message', /graphql error: Project name is not available/.test(r.text || '') && !/despatched successfully/.test(r.text || ''), r.text);
  r = await sql("EXEC /*+ SHOWRESULTS */ railway.deployments.deployments.restart @id = 'missing'");
  check('EXEC with SHOWRESULTS fails with the API message', /graphql error: Deployment not found/.test(r.text || ''), r.text);
  r = await sql("EXEC /*+ SHOWRESULTS */ railway.projects.projects.delete @id = 'missing'");
  check('a delete method run through EXEC with SHOWRESULTS fails with the API message', /graphql error: Project not found/.test(r.text || ''), r.text);
  // Engine behaviour, pinned as observed (NOTES.md finding 4): DELETE and a
  // plain EXEC skip response processing, so an errors array in an HTTP 200
  // is not seen. If the engine starts surfacing these, update the notes.
  r = await sql("DELETE FROM railway.projects.projects WHERE id = 'missing'");
  check('engine limitation pinned: DELETE does not see errors in an HTTP 200', /despatched successfully/.test(r.text || ''), r.text);
  r = await sql("EXEC railway.deployments.deployments.restart @id = 'missing'");
  check('engine limitation pinned: plain EXEC does not see errors in an HTTP 200', /despatched successfully/.test(r.text || ''), r.text);

  exitCode = finish('integration');
} finally {
  mock.server.close();
  reg.cleanup();
}
process.exit(exitCode);
