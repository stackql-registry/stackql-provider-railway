// Operation mapping stability.
//
// provider-dev/config/all_services.csv is the durable, checked-in record of
// which upstream operation backs which service.resource.method. Published
// queries depend on those names, so between releases a mapping may be ADDED
// but an existing one must not move, be renamed, change SQL verb, change its
// row source, or disappear without an explicit, reviewed acceptance.
//
// The upstream operation (the `tags` column: Query.projects,
// Mutation.projectCreate, Query.project>services) is the key: the question
// asked of every committed row is "does this operation still land on the
// same service, resource, method and SQL verb?". The baseline is the
// committed file (git HEAD), not the working-tree copy, so a previous local
// regeneration cannot launder a change.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';

export const MAPPING_FILE = 'provider-dev/config/all_services.csv';

export const CSV_HEADER = [
  'filename', 'path', 'operationId', 'formatted_op_id', 'verb', 'response_object',
  'tags', 'formatted_tags', 'stackql_resource_name', 'stackql_method_name',
  'stackql_verb', 'stackql_object_key', 'op_description',
];

export function csvEscape(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function csvParse(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field !== '' || row.length > 0) { row.push(field); rows.push(row); }
  return rows;
}

export function parseMappingCsv(text) {
  const parsed = csvParse(text);
  if (parsed.length === 0) return [];
  const header = parsed[0];
  return parsed.slice(1)
    .filter((r) => r.length >= header.length)
    .map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

export function readMappingCsv(file) {
  if (!fs.existsSync(file)) return null;
  return parseMappingCsv(fs.readFileSync(file, 'utf8'));
}

export function renderMappingCsv(rows) {
  return [CSV_HEADER.join(',')]
    .concat(rows.map((r) => CSV_HEADER.map((h) => csvEscape(r[h])).join(',')))
    .join('\n') + '\n';
}

// The committed mapping at a git ref, or null when there is none (the first
// build, or outside a git checkout).
export function loadCommittedMapping(repoRoot, ref = 'HEAD') {
  try {
    const text = execFileSync('git', ['show', `${ref}:${MAPPING_FILE}`], {
      cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024,
    });
    return parseMappingCsv(text);
  } catch {
    return null;
  }
}

function surface(r) {
  return `${r.filename.replace(/\.yaml$/, '')}.${r.stackql_resource_name}.${r.stackql_method_name}`;
}

// Returns { breaking: [...], additions: [...] }: human-readable descriptions
// of committed mappings that no longer hold, and of new ones.
export function compareMappings(committed, current) {
  const breaking = [];
  const additions = [];
  const now = new Map(current.map((r) => [r.tags, r]));
  const before = new Map(committed.map((r) => [r.tags, r]));
  for (const [source, old] of before) {
    const cur = now.get(source);
    if (!cur) {
      breaking.push(`removed: ${source} (was ${surface(old)}, ${old.stackql_verb})`);
      continue;
    }
    if (cur.filename !== old.filename) breaking.push(`moved service: ${source} ${surface(old)} -> ${surface(cur)}`);
    else if (cur.stackql_resource_name !== old.stackql_resource_name) breaking.push(`moved resource: ${source} ${surface(old)} -> ${surface(cur)}`);
    else if (cur.stackql_method_name !== old.stackql_method_name) breaking.push(`renamed method: ${source} ${surface(old)} -> ${surface(cur)}`);
    if (cur.stackql_verb !== old.stackql_verb) breaking.push(`changed SQL verb: ${source} (${surface(cur)}) ${old.stackql_verb} -> ${cur.stackql_verb}`);
    if (old.stackql_verb === 'select' && cur.stackql_verb === 'select' && cur.stackql_object_key !== old.stackql_object_key) {
      breaking.push(`changed row source: ${source} (${surface(cur)}) ${old.stackql_object_key || '(none)'} -> ${cur.stackql_object_key || '(none)'}`);
    }
  }
  for (const [source, cur] of now) {
    if (!before.has(source)) additions.push(`added: ${source} -> ${surface(cur)} (${cur.stackql_verb})`);
  }
  // a resource that loses every method disappears from the provider
  const resourcesOf = (rows) => new Set(rows.map((r) => `${r.filename.replace(/\.yaml$/, '')}.${r.stackql_resource_name}`));
  const was = resourcesOf(committed);
  const is = resourcesOf(current);
  for (const r of was) if (!is.has(r)) breaking.push(`resource removed: ${r}`);
  for (const r of is) if (!was.has(r)) additions.push(`new resource: ${r}`);
  return { breaking, additions };
}
