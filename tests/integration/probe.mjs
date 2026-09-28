#!/usr/bin/env node

// Ad-hoc binding probe: runs statements against the mock Railway GraphQL
// server and prints, for each, what stackql printed and what went over the
// wire. Use it to see how a statement binds before adding an assertion to
// run_integration_tests.mjs.
//
// Statements come from a file (one per line, `--` comments skipped) so that
// no shell quoting touches them. The placeholders $PROJECT, $ENVIRONMENT,
// $SERVICE, $DEPLOYMENT and $WORKSPACE stand for the mock's fixture ids.
//
// Usage: node tests/integration/probe.mjs <file.sql> [--http-log]

import { readFileSync } from 'node:fs';
import { startMockServer, IDS } from './mock_railway_server.mjs';
import { materializeMockRegistry, registryArg, runSql } from '../lib/stackql.mjs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node tests/integration/probe.mjs <file.sql> [--http-log]');
  process.exit(1);
}
const flags = process.argv.includes('--http-log') ? ['--http.log.enabled'] : [];
const placeholders = {
  $PROJECT: IDS.project1,
  $ENVIRONMENT: IDS.environment,
  $SERVICE: IDS.service1,
  $DEPLOYMENT: IDS.deployment,
  $WORKSPACE: IDS.workspace,
};

const mock = await startMockServer();
const reg = materializeMockRegistry(mock.port, 'probe');
const registry = registryArg(reg.root);
try {
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    let sql = line.trim();
    if (!sql || sql.startsWith('--')) continue;
    for (const [k, v] of Object.entries(placeholders)) sql = sql.replaceAll(k, v);
    const mark = mock.log.length;
    const r = await runSql(sql, { registry, flags });
    console.log(`SQL>  ${sql}`);
    console.log(`  out:  ${(r.text || '').slice(0, 2000)}`);
    for (const c of mock.log.slice(mark)) console.log(`  wire: ${c.method} ${c.path} ${c.raw.slice(0, 1200)}`);
  }
} finally {
  mock.server.close();
  reg.cleanup();
}
