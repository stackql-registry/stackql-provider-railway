#!/usr/bin/env node

// Reserved word sweep: every column, parameter and request body attribute
// name in the generated provider is put to the engine as a bare identifier.
//
// A name the stackql parser or the SQLite backend rejects cannot be used in
// SQL at all (quoting does not rescue it), so it must carry the policy
// suffix (from -> from_). The list in selection_policy.json
// (sqlReservedColumnNames) was measured with this sweep; the sweep stays in
// the test suite so that a schema refresh which introduces a new reserved
// name fails here rather than in a user's query.
//
// Method: each name is selected from a carrier resource that does not have
// it. The statement runs against the mock server, so the parser and the
// SQLite stage are both exercised:
//   "no such column: <name>"            the name is a valid identifier
//   rows of {"<name>": "<name>"}         also valid: the engine quotes a
//                                       keyword it accepts (key), and SQLite
//                                       reads the unmatched quoted name as a
//                                       string literal
//   a parser error / near "<name>"      the name is reserved
// Statements go to `stackql exec` in batches (it evaluates every statement
// of a batch independently); a name without its "no such column" answer is
// then run on its own to capture the engine's message.
//
// Requires a stackql binary: $STACKQL, ./stackql(.exe), or stackql on PATH.
//
// Usage: node tests/integration/run_reserved_names.mjs [--verbose]

import fs from 'node:fs';
import path from 'node:path';
import * as yaml from 'js-yaml';
import { startMockServer } from './mock_railway_server.mjs';
import { findStackql, materializeMockRegistry, registryArg, repoRoot, runSql, PROVIDER, PROVIDER_VERSION } from '../lib/stackql.mjs';

const verbose = process.argv.includes('--verbose');
const BATCH = 60;
const policy = JSON.parse(fs.readFileSync(path.join(repoRoot, 'provider-dev', 'config', 'selection_policy.json'), 'utf8'));
const suffix = policy.reservedColumnSuffix || '_';

// ---- collect the names on the SQL surface
const names = new Map(); // name -> first place it was seen
const servicesDir = path.join(repoRoot, 'provider-dev', 'openapi', 'src', PROVIDER, PROVIDER_VERSION, 'services');
let carrierColumns = new Set();
for (const file of fs.readdirSync(servicesDir).sort()) {
  const service = file.replace('.yaml', '');
  const doc = yaml.load(fs.readFileSync(path.join(servicesDir, file), 'utf8'));
  const see = (name, where) => { if (!names.has(name)) names.set(name, where); };
  for (const [schemaName, schema] of Object.entries(doc.components.schemas || {})) {
    for (const k of Object.keys(schema.properties || {})) see(k, `column of ${service} ${schemaName}`);
    if (service === 'platform' && schemaName === 'Region') carrierColumns = new Set(Object.keys(schema.properties));
  }
  for (const [pathKey, item] of Object.entries(doc.paths)) {
    const q = new URLSearchParams(pathKey.split('?')[1]);
    const id = `${service}.${q.get('__resource')}.${q.get('__method')}`;
    for (const p of item.post.parameters || []) see(p.name, `parameter of ${id}`);
    for (const k of Object.keys(item.post.requestBody?.content?.['application/json']?.schema?.properties || {})) see(k, `body attribute of ${id}`);
  }
}
if (carrierColumns.size === 0) {
  console.error('the carrier resource railway.platform.regions (schema Region) is not in the generated provider');
  process.exit(1);
}

const mock = await startMockServer();
const reg = materializeMockRegistry(mock.port, 'reserved');
const registry = registryArg(reg.root);
const carrier = `${PROVIDER}.platform.regions`;
const candidates = [...names.keys()].filter((n) => !carrierColumns.has(n)).sort();
const valid = (name, text) => new RegExp(`no such column: ${name} \\(`).test(text);

const reserved = [];
let exitCode = 1;
try {
  console.log(`reserved word sweep: ${names.size} distinct names (${carrierColumns.size} are columns of the carrier), stackql: ${findStackql()}`);
  const suspects = [];
  for (let i = 0; i < candidates.length; i += BATCH) {
    const batch = candidates.slice(i, i + BATCH);
    const r = await runSql(batch.map((n) => `SELECT ${n} FROM ${carrier}`).join('; '), { registry, timeoutMs: 300000 });
    for (const n of batch) {
      if (valid(n, r.text || '')) { if (verbose) console.log(`  ok        ${n}`); } else suspects.push(n);
    }
  }
  for (const n of suspects) {
    const r = await runSql(`SELECT ${n} FROM ${carrier}`, { registry });
    if (valid(n, r.text || '')) continue;
    if (Array.isArray(r.rows) && r.rows.length > 0 && r.rows.every((row) => row[n] === n)) continue;
    const message = (r.text || '').replace(/\s+/g, ' ').slice(0, 160);
    reserved.push({ name: n, where: names.get(n), message });
    console.log(`  RESERVED  ${n}  (${names.get(n)})  [${message}]`);
  }
  const listed = new Set(policy.sqlReservedColumnNames || []);
  const suffixed = [...names.keys()].filter((n) => n.endsWith(suffix) && listed.has(n.slice(0, -suffix.length))).sort();
  console.log(`\n${names.size - reserved.length}/${names.size} names are valid identifiers; ${suffixed.length} carry the reserved word suffix (${suffixed.join(', ')})`);
  if (reserved.length > 0) {
    console.log(`FAILED: ${reserved.length} name(s) are rejected by the engine. Add them to sqlReservedColumnNames in provider-dev/config/selection_policy.json and regenerate: ${reserved.map((x) => x.name).join(', ')}`);
  }
  exitCode = reserved.length === 0 ? 0 : 1;
} finally {
  mock.server.close();
  reg.cleanup();
}
process.exit(exitCode);
