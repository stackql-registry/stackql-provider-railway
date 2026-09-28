// Shared helpers for the node test layers: binary resolution, a registry
// copy pointed at a mock server, and statement execution through
// `stackql exec` with JSON output.

import { spawn } from 'node:child_process';
import { cpSync, existsSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const PROVIDER = 'railway';
export const PROVIDER_VERSION = 'v00.00.00000';
export const LIVE_SERVER_URL = 'https://backboard.railway.com';
export const generatedRegistry = path.join(repoRoot, 'provider-dev', 'openapi');

// $STACKQL, then the platform's binary in the repo root, then PATH.
export function findStackql() {
  if (process.env.STACKQL) return process.env.STACKQL;
  const local = path.join(repoRoot, process.platform === 'win32' ? 'stackql.exe' : 'stackql');
  if (existsSync(local)) return local;
  return 'stackql';
}

export function registryArg(root) {
  const p = root.split(path.sep).join('/');
  return JSON.stringify({ url: `file://${p}`, localDocRoot: p, verifyConfig: { nopVerify: true } });
}

// The provider declares the https API host; the mock is plain http on a
// random port, so tests run against a registry copy with only the server
// url switched. Everything else is byte-identical to the generated docs.
export function materializeMockRegistry(port, label = 'itest') {
  const tmpRoot = mkdtempSync(path.join(os.tmpdir(), `railway-provider-${label}-`));
  cpSync(generatedRegistry, tmpRoot, { recursive: true });
  const servicesDir = path.join(tmpRoot, 'src', PROVIDER, PROVIDER_VERSION, 'services');
  let rewritten = 0;
  for (const f of readdirSync(servicesDir)) {
    const p = path.join(servicesDir, f);
    const text = readFileSync(p, 'utf8');
    const next = text.replace(`url: ${LIVE_SERVER_URL}`, `url: http://localhost:${port}`);
    if (next !== text) rewritten++;
    writeFileSync(p, next);
  }
  if (rewritten === 0) throw new Error(`no service document declares the server ${LIVE_SERVER_URL}`);
  return { root: tmpRoot, cleanup: () => rmSync(tmpRoot, { recursive: true, force: true }) };
}

const ERRORISH = /http response status code: [45]|error|panic|FindRoute|no matching operation|cannot /i;

// Runs one statement. Returns { rows, err, text }: rows is the parsed JSON
// result (null when the statement failed), text the raw stdout + stderr.
export function runSql(sql, { registry, env = {}, flags = [], verbose = false, timeoutMs = 120000 } = {}) {
  return new Promise((resolve) => {
    const childEnv = { ...process.env, RAILWAY_TOKEN: 'mock-token', ...env };
    for (const [k, v] of Object.entries(childEnv)) if (v === undefined) delete childEnv[k];
    const child = spawn(findStackql(), [`--registry=${registry}`, 'exec', sql, '--output', 'json', ...flags], { cwd: repoRoot, env: childEnv });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr += d; });
    const timer = setTimeout(() => child.kill(), timeoutMs);
    child.on('error', (e) => { clearTimeout(timer); resolve({ rows: null, err: String(e), text: String(e) }); });
    child.on('close', () => {
      clearTimeout(timer);
      stdout = stdout.trim();
      stderr = stderr.trim();
      const text = [stdout, stderr].filter(Boolean).join('\n');
      if (verbose) console.log(`    sql: ${sql}\n    out: ${stdout.slice(0, 400)}${stderr ? `\n    err: ${stderr.slice(0, 400)}` : ''}`);
      if (ERRORISH.test(stderr)) return resolve({ rows: null, err: stderr, text });
      if (!stdout) return resolve({ rows: [], err: null, text });
      try {
        const parsed = JSON.parse(stdout);
        resolve({ rows: parsed ?? [], err: null, text });
      } catch {
        resolve({ rows: null, err: ERRORISH.test(stdout) ? stdout : null, text, message: stdout });
      }
    });
  });
}

export function makeChecker() {
  const results = [];
  const check = (name, cond, note = '') => {
    results.push({ name, pass: Boolean(cond), note });
    console.log(`  ${cond ? 'PASS' : 'FAIL'}  ${name}${!cond && note ? `  [${String(note).slice(0, 300)}]` : ''}`);
  };
  const finish = (label) => {
    const failed = results.filter((r) => !r.pass).length;
    console.log(`\n${label}: ${results.length - failed}/${results.length} checks passed`);
    return failed === 0 ? 0 : 1;
  };
  return { check, finish, results };
}
