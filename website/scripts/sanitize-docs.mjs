#!/usr/bin/env node
// Post-docgen sanitizer for the generated provider docs.
//
// Part 1 - MDX safety (shared with the sibling provider repos). Vendor
// descriptions can carry literal angle-bracket placeholders (<region>),
// stray unpaired HTML and braces. MDX v3 parses any raw <token> as JSX and
// {...} as a JSX expression and fails the build on the first mismatch. The
// doc generator's own structure is line-shaped: one `<td>...</td>` cell per
// line, and description text ONLY ever appears as td inner content. So the
// deterministic fix: inside every description cell, escape ALL angle
// brackets and braces; leave every other line byte-for-byte untouched.
//
// Part 2 - railway mutation methods. The doc generator documents REST
// providers: WHERE keys are path and query parameters, and a request body
// is supplied to EXEC as one @@json document. This provider's INSERT /
// UPDATE / DELETE / EXEC methods take every attribute in the request body
// (it becomes the GraphQL variables), addressed by bare name, so the
// generated examples for them are rewritten from the provider documents:
//   - DELETE examples get their WHERE clause (the keys are body attributes)
//   - UPDATE examples keep the key in WHERE only, and quote every SET value
//     (the engine sends SET values as strings; the provider coerces them)
//   - EXEC examples use @attribute = 'value' (a lone @@json does not satisfy
//     a required attribute)
//   - the Methods table lists the attributes of DELETE and EXEC methods, and
//     the Parameters table gains a row for every attribute it links to
//
// Both parts are idempotent. Run after `npm run generate-docs`, before
// building the website.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as yaml from 'js-yaml';

const websiteDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const docsDir = path.join(websiteDir, 'docs');
const providerDir = path.resolve(websiteDir, '..', 'provider-dev', 'openapi', 'src', 'railway', 'v00.00.00000');
const PROVIDER = 'railway';

const TD_LINE = /^(\s*<td>)(.*)(<\/td>\s*)$/;
const LINK_TOKEN = '<a href="#[^"]*">(?:<CopyableCode\\b[^<>]*\\/>|<code>[^<>]*<\\/code>)<\\/a>';
const LINK_TOKEN_CELL = new RegExp(`^${LINK_TOKEN}(?:,\\s*${LINK_TOKEN})*$`);
const BACKTICKED = /`<([A-Za-z][A-Za-z0-9_.:-]*)>`/g;
// Control-char sentinels: cannot occur in generated markdown.
const OPEN = '\u0001';
const CLOSE = '\u0002';

let filesChanged = 0;
let cellsEscaped = 0;
const counts = { deleteExamples: 0, updateExamples: 0, execExamples: 0, methodRows: 0, parameterRows: 0 };

// ---------------------------------------------------------------------------
// Part 1: MDX safety

function escapeDescription(inner) {
  let out = inner.replace(BACKTICKED, (m, name) => OPEN + name + CLOSE);
  out = out
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    // Regex fragments in descriptions read as markdown links and crash the
    // link resolver.
    .replace(/\[/g, '&#91;')
    .replace(/\]/g, '&#93;')
    // GFM autolinks bare "scheme://..." literals on the DECODED text tree;
    // a zero-width space inside "://" is invisible in rendering but breaks
    // the autolink prefix match.
    .replace(/:\/\//g, ':​//');
  out = out.split(OPEN).join('<code>&lt;').split(CLOSE).join('&gt;</code>');
  return out;
}

// Inside a CodeBlock template literal, a lone backslash before u/x is a JS
// string escape and ${ starts interpolation. Double the backslash / escape
// the $ so the source text renders verbatim.
function escapeTemplateLiteral(line) {
  return line
    .replace(/(?<!\\)\\(?=[ux])/g, '\\\\')
    .replace(/(?<!\\)\$\{/g, '\\${');
}

function sanitize(text) {
  const lines = text.split('\n');
  let changed = false;
  let inFence = false;
  let inTabItemProse = false;
  let inCodeBlock = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    if (inCodeBlock) {
      if (/<\/CodeBlock>/.test(line)) inCodeBlock = false;
      const esc = escapeTemplateLiteral(line);
      if (esc !== line) { lines[i] = esc; changed = true; }
      continue;
    }
    if (/<CodeBlock\b/.test(line)) {
      if (!/<\/CodeBlock>/.test(line)) inCodeBlock = true;
      const esc = escapeTemplateLiteral(line);
      if (esc !== line) { lines[i] = esc; changed = true; }
      continue;
    }
    if (/^<TabItem\b/.test(trimmed)) {
      inTabItemProse = true;
      continue;
    }
    if (/^<\/TabItem>/.test(trimmed)) {
      inTabItemProse = false;
      continue;
    }

    // Description table cells (one <td>...</td> per line).
    const m = TD_LINE.exec(line);
    if (m) {
      const inner = m[2];
      if (/^<CopyableCode\b[^<>]*\/>$/.test(inner)) continue;
      // Structural link cells in the Methods/Parameters tables stay verbatim.
      if (LINK_TOKEN_CELL.test(inner)) continue;
      const codeCell = /^<code>([^<>]*)<\/code>$/.exec(inner);
      if (codeCell) {
        const escaped = codeCell[1]
          .replace(/\[/g, '&#91;')
          .replace(/\]/g, '&#93;')
          .replace(/\{/g, '&#123;')
          .replace(/\}/g, '&#125;')
          .replace(/:\/\//g, ':​//');
        if (escaped !== codeCell[1]) {
          lines[i] = m[1] + '<code>' + escaped + '</code>' + m[3];
          cellsEscaped++;
          changed = true;
        }
        continue;
      }
      // already escaped by an earlier run
      if (!/[<>{}[\]]|:\/\//.test(inner)) continue;
      const escaped = escapeDescription(inner);
      if (escaped !== inner) {
        lines[i] = m[1] + escaped + m[3];
        cellsEscaped++;
        changed = true;
      }
      continue;
    }

    // Method-description prose inside <TabItem> blocks.
    if (inTabItemProse && trimmed && !trimmed.startsWith('<') && /[<>{}]/.test(line)) {
      const escaped = escapeDescription(line);
      if (escaped !== line) {
        lines[i] = escaped;
        cellsEscaped++;
        changed = true;
      }
    }
  }
  return { text: lines.join('\n'), changed };
}

// ---------------------------------------------------------------------------
// Part 2: railway mutation methods

// service -> resource -> method -> { verb, required, optional, props }
function loadMutationMethods() {
  const out = new Map();
  const servicesDir = path.join(providerDir, 'services');
  if (!fs.existsSync(servicesDir)) return out;
  for (const file of fs.readdirSync(servicesDir)) {
    const service = file.replace(/\.yaml$/, '');
    const doc = yaml.load(fs.readFileSync(path.join(servicesDir, file), 'utf8'));
    const resources = new Map();
    for (const [resource, res] of Object.entries(doc.components['x-stackQL-resources'])) {
      const methods = new Map();
      for (const [method, m] of Object.entries(res.methods)) {
        const pathKey = m.operation.$ref.replace('#/paths/', '').replace(/\/post$/, '').replace(/~1/g, '/').replace(/~0/g, '~');
        const op = doc.paths[pathKey].post;
        if (op['x-stackQL-graphQL']) continue;
        const verb = Object.entries(res.sqlVerbs).find(([, refs]) => refs.some((r) => r.$ref.endsWith(`/methods/${method}`)))?.[0] || 'exec';
        const body = op.requestBody?.content?.['application/json']?.schema || { properties: {} };
        const required = body.required || [];
        const names = Object.keys(body.properties || {});
        methods.set(method, {
          verb,
          required,
          optional: names.filter((n) => !required.includes(n)),
          props: body.properties || {},
        });
      }
      resources.set(resource, methods);
    }
    out.set(service, resources);
  }
  return out;
}

const link = (name) => `<a href="#parameter-${name}"><code>${name}</code></a>`;
const placeholder = (name) => `'{{ ${name} }}'`;

function datatype(prop) {
  let t = prop.type || 'object';
  if (prop.format) t += ` (${prop.format})`;
  return t;
}

function describeProp(prop) {
  let d = (prop.description || '').replace(/\s+/g, ' ').trim();
  if (Array.isArray(prop.enum) && prop.enum.length > 0 && !(prop.enum.length === 2 && prop.enum.includes('true'))) d += ` (${prop.enum.join(', ')})`;
  return d.trim();
}

// the section under a heading, up to the next heading of the same level
function sectionBounds(text, heading) {
  const start = text.indexOf(`\n${heading}\n`);
  if (start < 0) return null;
  const next = text.indexOf('\n## ', start + heading.length + 1);
  return { start, end: next < 0 ? text.length : next };
}

function replaceSqlBlock(text, heading, method, build) {
  const b = sectionBounds(text, heading);
  if (!b) return text;
  const tab = text.indexOf(`<TabItem value="${method}">`, b.start);
  if (tab < 0 || tab > b.end) return text;
  const open = text.indexOf('```sql\n', tab);
  if (open < 0 || open > b.end) return text;
  const close = text.indexOf('\n```', open + 7);
  if (close < 0) return text;
  const current = text.slice(open + 7, close);
  const next = build(current);
  if (next === current) return text;
  return text.slice(0, open + 7) + next + text.slice(close);
}

function whereClause(m) {
  const lines = [
    ...m.required.map((n) => `${n} = ${placeholder(n)} --required`),
    ...m.optional.map((n) => `${n} = ${placeholder(n)}`),
  ];
  return lines.map((l, i) => (i === 0 ? l : `AND ${l}`)).join('\n');
}

function railwayPasses(text, service, resource, methods) {
  const fq = `${PROVIDER}.${service}.${resource}`;
  let out = text;

  for (const [name, m] of methods) {
    if (m.verb === 'delete') {
      const before = out;
      out = replaceSqlBlock(out, '## `DELETE` examples', name, () => `DELETE FROM ${fq}\nWHERE \n${whereClause(m)}\n;`);
      if (out !== before) counts.deleteExamples++;
    } else if (m.verb === 'update') {
      const before = out;
      out = replaceSqlBlock(out, '## `UPDATE` examples', name, (current) => {
        const returning = current.indexOf('\nRETURNING');
        const tail = returning < 0 ? ';' : current.slice(returning + 1);
        const set = m.optional.map((n) => `${n} = ${placeholder(n)}`).join(',\n');
        const where = m.required.map((n, i) => `${i === 0 ? '' : 'AND '}${n} = ${placeholder(n)} --required`).join('\n');
        return `UPDATE ${fq}\nSET \n${set}\nWHERE \n${where}\n${tail}`;
      });
      if (out !== before) counts.updateExamples++;
    } else if (m.verb === 'exec') {
      const before = out;
      out = replaceSqlBlock(out, '## Lifecycle Methods', name, () => {
        const args = [
          ...m.required.map((n) => ({ n, required: true })),
          ...m.optional.map((n) => ({ n, required: false })),
        ];
        const lines = args.map((a, i) => `@${a.n}=${placeholder(a.n)}${i < args.length - 1 ? ',' : ''}${a.required ? ' --required' : ''}`);
        return `EXEC ${fq}.${name}${lines.length ? ` \n${lines.join('\n')}` : ''}\n;`;
      });
      if (out !== before) counts.execExamples++;
    }
  }

  // Methods table: attributes of DELETE and EXEC methods
  out = out.replace(
    /(<tr>\n\s*<td><a href="#([a-z0-9_]+)"><CopyableCode code="[a-z0-9_]+" \/><\/a><\/td>\n\s*<td><CopyableCode code="(delete|exec)" \/><\/td>\n\s*<td>)(.*)(<\/td>\n\s*<td>)(.*)(<\/td>)/g,
    (whole, head, name, verb, req, mid, opt, tail) => {
      const m = methods.get(name);
      if (!m) return whole;
      const nextReq = m.required.map(link).join(', ');
      const nextOpt = m.optional.map(link).join(', ');
      if (nextReq === req && nextOpt === opt) return whole;
      counts.methodRows++;
      return `${head}${nextReq}${mid}${nextOpt}${tail}`;
    },
  );

  // Parameters table: a row for every attribute the Methods table links to
  const params = sectionBounds(out, '## Parameters');
  const methodsSection = sectionBounds(out, '## Methods');
  if (params && methodsSection) {
    const linked = new Set([...out.slice(methodsSection.start, methodsSection.end).matchAll(/href="#parameter-([a-z0-9_]+)"/g)].map((x) => x[1]));
    const section = out.slice(params.start, params.end);
    const present = new Set([...section.matchAll(/<tr id="parameter-([a-z0-9_]+)">/g)].map((x) => x[1]));
    const rows = [];
    for (const name of [...linked].sort()) {
      if (present.has(name)) continue;
      const owner = [...methods.values()].find((m) => m.props[name]);
      if (!owner) continue;
      const prop = owner.props[name];
      const description = describeProp(prop);
      rows.push(`<tr id="parameter-${name}">\n    <td><CopyableCode code="${name}" /></td>\n    <td><code>${datatype(prop)}</code></td>\n    <td>${/[<>{}[\]]|:\/\//.test(description) ? escapeDescription(description) : description}</td>\n</tr>`);
      counts.parameterRows++;
    }
    if (rows.length > 0) {
      const close = out.indexOf('</tbody>', params.start);
      if (close > 0 && close < params.end) out = `${out.slice(0, close)}${rows.join('\n')}\n${out.slice(close)}`;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------

const mutationMethods = loadMutationMethods();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(p);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      const before = fs.readFileSync(p, 'utf8');
      let after = before;
      const rel = path.relative(path.join(docsDir, 'services'), p).split(path.sep);
      if (rel.length === 3 && rel[2] === 'index.md') {
        const methods = mutationMethods.get(rel[0])?.get(rel[1]);
        if (methods && methods.size > 0) after = railwayPasses(after, rel[0], rel[1], methods);
      }
      after = sanitize(after).text;
      if (after !== before) {
        fs.writeFileSync(p, after);
        filesChanged++;
      }
    }
  }
}

walk(docsDir);

// The provider summary on the landing page: docgen counts every entry under
// each service directory, which includes the service's own index file, so it
// overstates the resource count by one per service. Recount from the
// resource directories and rewrite the figure.
let summaryFixed = false;
const indexPath = path.join(docsDir, 'index.md');
const servicesDocsDir = path.join(docsDir, 'services');
if (fs.existsSync(indexPath) && fs.existsSync(servicesDocsDir)) {
  const resourceCount = fs.readdirSync(servicesDocsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => fs.readdirSync(path.join(servicesDocsDir, d.name), { withFileTypes: true }).filter((e) => e.isDirectory()).length)
    .reduce((a, b) => a + b, 0);
  const before = fs.readFileSync(indexPath, 'utf8');
  const after = before.replace(/total resources: __\d+__/, `total resources: __${resourceCount}__`);
  if (after !== before) { fs.writeFileSync(indexPath, after); summaryFixed = true; }
}
console.log(`sanitize-docs: escaped ${cellsEscaped} description cell(s); rewrote ${counts.deleteExamples} DELETE, ${counts.updateExamples} UPDATE and ${counts.execExamples} EXEC example(s), ${counts.methodRows} Methods row(s), added ${counts.parameterRows} Parameters row(s); ${filesChanged} file(s) changed${summaryFixed ? '; landing-page resource count corrected' : ''}`);
