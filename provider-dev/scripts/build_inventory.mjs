#!/usr/bin/env node
// Build provider-dev/config/operation_inventory.csv from the pinned schema.
//
// One row per candidate operation: every field on Query, every nested
// collection on an object returned by a root get, and every field on
// Mutation - with its arguments, return shape, the proposed
// service / resource / method / SQL verb, and a reason code where it is not
// mapped. The inventory is the review surface for mapping decisions; the
// generator consumes the same walk, so what the inventory shows is what is
// generated.
//
// Usage: node provider-dev/scripts/build_inventory.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadSchema, loadPolicy, loadRules, loadServiceNames, walkAll } from './lib/schema_walk.mjs';

const baseDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const schema = loadSchema(baseDir);
const rows = walkAll(schema, loadPolicy(baseDir), loadRules(baseDir), loadServiceNames(baseDir));

const HEADER = [
  'kind', 'source', 'returns', 'shape', 'node_type', 'args',
  'service', 'resource', 'method', 'sql_verb', 'required_params', 'optional_params',
  'disposition', 'skip_reason', 'description',
];

function csvEscape(v) {
  const s = Array.isArray(v) ? v.join(' ') : String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const out = [HEADER.join(',')]
  .concat(rows.map((r) => HEADER.map((h) => csvEscape(r[h])).join(',')))
  .join('\n') + '\n';
const target = path.join(baseDir, 'provider-dev', 'config', 'operation_inventory.csv');
fs.writeFileSync(target, out);

const mapped = rows.filter((r) => r.disposition === 'map');
const skipped = rows.filter((r) => r.disposition === 'skip');
const byReason = {};
for (const r of skipped) byReason[r.skip_reason] = (byReason[r.skip_reason] || 0) + 1;
const byKind = {};
for (const r of mapped) byKind[r.kind] = (byKind[r.kind] || 0) + 1;
const resources = new Set(mapped.map((r) => `${r.service}.${r.resource}`));
const selectable = new Set(mapped.filter((r) => r.sql_verb === 'select').map((r) => `${r.service}.${r.resource}`));

console.log(`Wrote ${path.relative(baseDir, target)}: ${rows.length} candidate operations`);
console.log(`  mapped: ${mapped.length} (${Object.entries(byKind).map(([k, n]) => `${n} ${k}`).join(', ')})`);
console.log(`  skipped: ${skipped.length} (${Object.entries(byReason).sort().map(([k, n]) => `${n} ${k}`).join(', ')})`);
console.log(`  resources: ${resources.size}, selectable: ${selectable.size}, not selectable: ${resources.size - selectable.size}`);
