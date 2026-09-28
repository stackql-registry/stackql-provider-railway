#!/usr/bin/env node

// Runs every SQL statement in the landing page
// (provider-dev/docgen/provider-data/headerContent2.txt) and the README
// against the mock Railway GraphQL server, in document order, and fails on
// any statement that errors. The examples are what users copy first; this
// keeps them runnable as the provider is regenerated.
//
// A statement passes when stackql parses it, routes it to a method, the
// request reaches the API and the API answers without a GraphQL error. The
// wire is checked as well as stackql's own output, because the engine does
// not report an error answered to a DELETE or a plain EXEC. The ids the
// examples use are the mock's fixture ids, so reads return rows and writes
// have something to act on.
//
// Each document runs against a fresh mock, because the examples end by
// deleting what they address.
//
// Usage: node tests/integration/run_docs_examples.mjs [--verbose]

import fs from 'node:fs';
import path from 'node:path';
import { startMockServer } from './mock_railway_server.mjs';
import { materializeMockRegistry, registryArg, repoRoot, runSql } from '../lib/stackql.mjs';

const verbose = process.argv.includes('--verbose');
const t0 = Date.now();

const DOCUMENTS = [
  'provider-dev/docgen/provider-data/headerContent2.txt',
  'README.md',
];

// ```sql fenced blocks -> statements (split on ; at end of line, comment
// lines dropped)
function statementsOf(text) {
  const out = [];
  const fence = /```sql\r?\n([\s\S]*?)```/g;
  let m;
  while ((m = fence.exec(text)) !== null) {
    const line = text.slice(0, m.index).split('\n').length + 1;
    for (const raw of m[1].split(/;[ \t]*(?:\r?\n|$)/)) {
      const sql = raw.split('\n').filter((l) => !/^\s*--/.test(l)).join('\n').trim();
      if (sql) out.push({ sql, line });
    }
  }
  return out;
}

let failures = 0;
let total = 0;
for (const doc of DOCUMENTS) {
  const fp = path.join(repoRoot, doc);
  if (!fs.existsSync(fp)) {
    console.log(`SKIP ${doc} (not found)`);
    continue;
  }
  const statements = statementsOf(fs.readFileSync(fp, 'utf8'));
  const mock = await startMockServer();
  const reg = materializeMockRegistry(mock.port, 'docs');
  const registry = registryArg(reg.root);
  console.log(`${doc}: ${statements.length} statements against the mock on localhost:${mock.port}`);
  try {
    for (const { sql, line } of statements) {
      total++;
      const mark = mock.log.length;
      const r = await runSql(sql, { registry, verbose });
      const oneLine = sql.replace(/\s+/g, ' ');
      const meta = /^(show|describe|registry)\b/i.test(sql);
      const wire = mock.log.slice(mark);
      const bad = wire.filter((e) => e.status >= 400 || e.errors);
      const pass = !r.err && bad.length === 0 && (meta || wire.length > 0);
      if (!pass) failures++;
      console.log(`  ${pass ? 'PASS' : 'FAIL'}  [${doc.split('/').pop()}:${line}] ${oneLine.slice(0, 110)}${oneLine.length > 110 ? '...' : ''}`);
      if (!pass) console.log(`        ${r.err ? String(r.err).slice(0, 400) : bad.length ? `wire: ${bad.map((e) => `${e.status} ${(e.errors || []).join('; ')}`).join(', ')}` : 'no request reached the API'}`);
    }
  } finally {
    mock.server.close();
    reg.cleanup();
  }
}

console.log(`\ndocs examples: ${total - failures}/${total} statements passed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
if (failures || total === 0) process.exit(1);
