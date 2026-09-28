#!/usr/bin/env node

// Mapping stability check. provider-dev/config/all_services.csv is the
// durable, checked-in record of every operation -> service.resource.method
// mapping. This script compares the CSV in the working tree with the
// committed one (git HEAD) and fails when a published mapping would change
// under a user's feet:
//
//   - an operation that was mapped is gone, or is now skipped
//   - an operation moved to a different service or resource
//   - an operation's method name or SQL verb changed
//   - a select method's object key changed (the row source moved)
//   - a resource lost every method
//
// Operations are keyed on the upstream GraphQL operation (the tags column:
// Query.projects, Mutation.projectCreate, Query.project>services). New
// operations are additions: reported, never fatal.
//
// The generator applies the same comparison before it writes anything; this
// script is the standalone form for CI and for checking a released copy.
// A deliberate breaking change is accepted by re-running with
// ALLOW_BREAKING_MAPPING_CHANGES=1 (or --accept); the changes are still
// listed so the commit message and NOTES.md can carry them.
//
// With no committed baseline (the first build, or outside a git checkout)
// the check reports that and passes.
//
// Usage: npm run check-mappings [-- --accept] [-- --baseline <git-ref>]
//                               [-- --baseline-file <csv>] [-- --current-file <csv>]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { MAPPING_FILE, compareMappings, loadCommittedMapping, readMappingCsv } from './lib/mapping_stability.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const args = process.argv.slice(2);
const argValue = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null);
const currentFile = argValue('--current-file') ? path.resolve(argValue('--current-file')) : path.join(repoRoot, MAPPING_FILE);
const accept = args.includes('--accept') || process.env.ALLOW_BREAKING_MAPPING_CHANGES === '1';
const baselineFile = argValue('--baseline-file');
const baselineRef = argValue('--baseline') || 'HEAD';

const current = readMappingCsv(currentFile);
if (current === null) {
  console.error(`Error: ${currentFile} not found - run the generate step first`);
  process.exit(1);
}
if (baselineFile && !fs.existsSync(baselineFile)) {
  console.error(`Error: baseline file ${baselineFile} not found`);
  process.exit(1);
}
const baseline = baselineFile ? readMappingCsv(baselineFile) : loadCommittedMapping(repoRoot, baselineRef);
const label = baselineFile || `${baselineRef}:${MAPPING_FILE}`;
if (baseline === null) {
  console.log(`Mapping stability: no committed baseline at ${label} - nothing to compare (${current.length} mapped operations will become the baseline once committed)`);
  process.exit(0);
}

const { breaking, additions } = compareMappings(baseline, current);
console.log(`Mapping stability vs ${label}: ${baseline.length} mapped operations in the baseline, ${current.length} now`);
for (const a of additions) console.log(`  + ${a}`);
if (breaking.length === 0) {
  console.log(`  no breaking mapping changes${additions.length ? ` (${additions.length} addition(s))` : ''}`);
  process.exit(0);
}
for (const b of breaking) console.log(`  ! ${b}`);
if (accept) {
  console.log(`  ${breaking.length} breaking mapping change(s) ACCEPTED (ALLOW_BREAKING_MAPPING_CHANGES) - record them in NOTES.md and the release notes`);
  process.exit(0);
}
console.error(`FAILED: ${breaking.length} breaking mapping change(s). Fix the rule in provider-dev/config/operation_rules.json, or re-run with ALLOW_BREAKING_MAPPING_CHANGES=1 to accept a deliberate change.`);
process.exit(1);
