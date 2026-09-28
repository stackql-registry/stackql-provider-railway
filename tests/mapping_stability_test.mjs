#!/usr/bin/env node

// Tests for the mapping stability check itself: the comparison function and
// the CLI (exit codes, acceptance), against small fixture mappings. The
// check guards published resource names, so it is tested like product code.
//
// Usage: node tests/mapping_stability_test.mjs

import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compareMappings, renderMappingCsv, parseMappingCsv } from '../provider-dev/scripts/lib/mapping_stability.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const script = path.join(repoRoot, 'provider-dev', 'scripts', 'check_mapping_stability.mjs');

const results = [];
function check(name, cond, note = '') {
  results.push(Boolean(cond));
  console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${!cond && note ? `  [${String(note).slice(0, 300)}]` : ''}`);
}

function row(source, service, resource, method, verb, objectKey = '') {
  return {
    filename: `${service}.yaml`,
    path: `/graphql/v2?__resource=${resource}&__method=${method}`,
    operationId: `${resource}_${method}`,
    formatted_op_id: `${resource}_${method}`,
    verb: 'post',
    response_object: 'Thing',
    tags: source,
    formatted_tags: source.startsWith('Mutation.') ? 'mutation' : 'query',
    stackql_resource_name: resource,
    stackql_method_name: method,
    stackql_verb: verb,
    stackql_object_key: objectKey,
    op_description: 'a description, with a comma and a "quote"',
  };
}

const baseline = [
  row('Query.projects', 'projects', 'projects', 'list', 'select', '$.data.projects.edges[*].node'),
  row('Query.project', 'projects', 'projects', 'get', 'select', '$.data.project'),
  row('Mutation.projectCreate', 'projects', 'projects', 'create', 'insert', '$.data.projectCreate'),
  row('Mutation.deploymentRestart', 'deployments', 'deployments', 'restart', 'exec', '$.data.deploymentRestart'),
  row('Query.project>services', 'services', 'services', 'list', 'select', '$.data.project.services.edges[*].node'),
];
const clone = () => baseline.map((r) => ({ ...r }));
const mutate = (source, change) => clone().map((r) => (r.tags === source ? { ...r, ...change } : r));

console.log('comparison');
let c = compareMappings(baseline, clone());
check('identical mappings: nothing breaking, nothing added', c.breaking.length === 0 && c.additions.length === 0, JSON.stringify(c));

c = compareMappings(baseline, [...clone(), row('Query.regions', 'platform', 'regions', 'list', 'select', '$.data.regions')]);
check('a new operation is an addition, not a break', c.breaking.length === 0 && c.additions.some((a) => a.includes('Query.regions')), JSON.stringify(c));

c = compareMappings(baseline, clone().filter((r) => r.tags !== 'Mutation.deploymentRestart'));
check('a removed operation is breaking', c.breaking.some((b) => b.startsWith('removed: Mutation.deploymentRestart')), JSON.stringify(c));
check('a resource that loses every method is reported', c.breaking.some((b) => b === 'resource removed: deployments.deployments'), JSON.stringify(c));

c = compareMappings(baseline, mutate('Mutation.projectCreate', { stackql_resource_name: 'project_factory' }));
check('an operation pointing at a different resource is breaking', c.breaking.some((b) => b.startsWith('moved resource: Mutation.projectCreate')), JSON.stringify(c));

c = compareMappings(baseline, mutate('Query.project>services', { filename: 'projects.yaml' }));
check('an operation moving service is breaking', c.breaking.some((b) => b.startsWith('moved service: Query.project>services')), JSON.stringify(c));

c = compareMappings(baseline, mutate('Query.project', { stackql_method_name: 'get_by_id' }));
check('a renamed method is breaking', c.breaking.some((b) => b.startsWith('renamed method: Query.project ')), JSON.stringify(c));

c = compareMappings(baseline, mutate('Mutation.deploymentRestart', { stackql_verb: 'update' }));
check('a changed SQL verb is breaking', c.breaking.some((b) => b.startsWith('changed SQL verb: Mutation.deploymentRestart')), JSON.stringify(c));

c = compareMappings(baseline, mutate('Query.projects', { stackql_object_key: '$.data.projects.nodes' }));
check('a changed select row source is breaking', c.breaking.some((b) => b.startsWith('changed row source: Query.projects')), JSON.stringify(c));

c = compareMappings(baseline, mutate('Mutation.projectCreate', { op_description: 'reworded upstream', path: '/graphql/v2?__resource=projects&__method=create&x=1' }));
check('description and path key changes are not breaking', c.breaking.length === 0, JSON.stringify(c));

console.log('\ncsv round trip');
const parsed = parseMappingCsv(renderMappingCsv(baseline));
check('render then parse returns the same rows (commas and quotes escaped)', JSON.stringify(parsed) === JSON.stringify(baseline), JSON.stringify(parsed[0]));

console.log('\ncommand line');
const tmp = mkdtempSync(path.join(os.tmpdir(), 'railway-mapping-test-'));
try {
  const baseFile = path.join(tmp, 'baseline.csv');
  const sameFile = path.join(tmp, 'same.csv');
  const brokenFile = path.join(tmp, 'broken.csv');
  writeFileSync(baseFile, renderMappingCsv(baseline));
  writeFileSync(sameFile, renderMappingCsv(clone()));
  writeFileSync(brokenFile, renderMappingCsv(mutate('Mutation.projectCreate', { stackql_resource_name: 'project_factory' })));
  const run = (args, env = {}) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', env: { ...process.env, ALLOW_BREAKING_MAPPING_CHANGES: '', ...env } });

  let r = run(['--baseline-file', baseFile, '--current-file', sameFile]);
  check('unchanged mapping exits 0', r.status === 0 && /no breaking mapping changes/.test(r.stdout), r.stdout + r.stderr);
  r = run(['--baseline-file', baseFile, '--current-file', brokenFile]);
  check('breaking change exits 1 and names the operation', r.status === 1 && /moved resource: Mutation\.projectCreate/.test(r.stdout), r.stdout + r.stderr);
  r = run(['--baseline-file', baseFile, '--current-file', brokenFile, '--accept']);
  check('--accept exits 0 and still lists the change', r.status === 0 && /ACCEPTED/.test(r.stdout) && /moved resource/.test(r.stdout), r.stdout + r.stderr);
  r = run(['--baseline-file', baseFile, '--current-file', brokenFile], { ALLOW_BREAKING_MAPPING_CHANGES: '1' });
  check('ALLOW_BREAKING_MAPPING_CHANGES=1 exits 0', r.status === 0 && /ACCEPTED/.test(r.stdout), r.stdout + r.stderr);
  r = run(['--baseline-file', path.join(tmp, 'missing.csv'), '--current-file', sameFile]);
  check('a missing baseline file is an error', r.status === 1, r.stdout + r.stderr);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

const failed = results.filter((x) => !x).length;
console.log(`\nmapping stability: ${results.length - failed}/${results.length} checks passed`);
process.exit(failed === 0 ? 0 : 1);
