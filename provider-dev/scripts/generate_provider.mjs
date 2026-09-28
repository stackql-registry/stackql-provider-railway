#!/usr/bin/env node
// Generate the railway provider from the pinned GraphQL introspection schema.
//
// Railway's public API is GraphQL only, so there is no OpenAPI document to
// split and normalize: this script is the whole spec -> provider step. Two
// method shapes are emitted, because the engine has two code paths:
//
//   SELECT   (Query fields)     the any-sdk native GraphQL read path:
//                               x-stackQL-graphQL on the operation carries
//                               the query template, the response selection
//                               and the cursor; WHERE values are spliced into
//                               the query text; page_info pagination
//   INSERT / UPDATE / DELETE /  the REST path (the engine has no GraphQL
//   EXEC (Mutation fields)      write path): a POST whose JSON body is built
//                               by a request transform as
//                               {"query": "mutation(...)", "variables": {...}}
//                               with real GraphQL variables, and whose
//                               response transform turns a GraphQL `errors`
//                               array (HTTP 200) into a statement failure
//
// Every operation gets its own path key, /graphql/v2?__resource=<r>&__method=<m>
// (OpenAPI allows one operation per path + verb). The query string never
// reaches the wire: the GraphQL reader clears it, and mutation methods carry
// requestTranslate: drop_double_underscore_params.
//
// Everything about a method - GraphQL text, parameters or request body,
// response schema - comes from one walk (lib/schema_walk.mjs), so query and
// schema cannot drift. Validate-and-fail-without-writing: every generated
// GraphQL document is parsed AND validated against the pinned schema, SQL
// verb signatures are checked for ambiguity, and the operation mapping is
// compared with the committed provider-dev/config/all_services.csv (git
// HEAD) BEFORE any file is written.
//
// Usage:
//   node provider-dev/scripts/generate_provider.mjs
//   node provider-dev/scripts/generate_provider.mjs --accept-mapping-changes

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  parse as gqlParse,
  validate as gqlValidate,
  getNamedType,
  isInputObjectType,
  isEnumType,
  isListType,
  isNonNullType,
} from 'graphql';
import * as yaml from 'js-yaml';
import {
  loadSchema,
  loadPolicy,
  loadRules,
  loadServiceNames,
  walkAll,
  buildSelection,
  flattenTree,
  openApiTypeFor,
  isRequired,
} from './lib/schema_walk.mjs';
import { MAPPING_FILE, loadCommittedMapping, renderMappingCsv, compareMappings } from './lib/mapping_stability.mjs';
import { renderTemplate } from './lib/template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.resolve(__dirname, '..', '..');

const PROVIDER = 'railway';
const VERSION = 'v00.00.00000';
const SERVER_URL = 'https://backboard.railway.com';
const GRAPHQL_PATH = '/graphql/v2';
const TOKEN_ENV_VAR = 'RAILWAY_TOKEN';
const DOCS_URL = 'https://docs.railway.com/integrations/api';
const PROTOCOL_MARKER = 'x-stackql-protocol';
const JSON_TEMPLATE = 'golang_template_json_v0.3.0';
const GET_SENTINEL = '$.stackql_gql_get_sentinel';

// ---------------------------------------------------------------------------
// CLI
let acceptMappingChanges = process.env.ALLOW_BREAKING_MAPPING_CHANGES === '1';
for (const a of process.argv.slice(2)) {
  if (a === '--accept-mapping-changes') acceptMappingChanges = true;
  else {
    console.error(`Unknown argument: ${a}`);
    process.exit(1);
  }
}

const schema = loadSchema(baseDir);
const policy = loadPolicy(baseDir);
const rules = loadRules(baseDir);
const serviceNames = loadServiceNames(baseDir);
const RESULT_COLUMN = policy.scalarResultColumn || 'result';

const rows = walkAll(schema, policy, rules, serviceNames).filter((r) => r.disposition === 'map');
const errors = [];

// ---------------------------------------------------------------------------
// Helpers

function titleCase(s) {
  return s.split('_').map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function jsonPointerEscape(p) {
  return p.replace(/~/g, '~0').replace(/\//g, '~1');
}

function sentence(s) {
  const t = (s || '').trim();
  if (!t) return '';
  return /[.!?]$/.test(t) ? t : `${t}.`;
}

function firstSentence(s) {
  const m = (s || '').match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : s || '').trim();
}

function assertNoTemplateDelimiters(id, text) {
  if (text.includes('{{') || text.includes('}}')) {
    throw new Error(`${id}: generated GraphQL text contains a template delimiter: ${text}`);
  }
}

// ---------------------------------------------------------------------------
// A valid GraphQL literal for any input type: used to render the templated
// queries with every parameter supplied, so the result can be validated
// against the schema.
function sampleLiteral(type, depth = 0) {
  if (isNonNullType(type)) return sampleLiteral(type.ofType, depth);
  if (isListType(type)) return `[${sampleLiteral(type.ofType, depth)}]`;
  const named = getNamedType(type);
  if (isEnumType(named)) return named.getValues()[0].name;
  if (isInputObjectType(named)) {
    if (depth > 4) return '{}';
    const parts = Object.values(named.getFields())
      .filter((f) => isRequired(f))
      .map((f) => `${f.name}: ${sampleLiteral(f.type, depth + 1)}`);
    return `{ ${parts.join(', ')} }`;
  }
  switch (named.name) {
    case 'Int': return '1';
    case 'Float': return '1.5';
    case 'Boolean': return 'true';
    default: return (policy.scalarTypes[named.name] || {}).type === 'object' ? '{ a: 1 }' : '"x"';
  }
}

function sampleValue(leaf) {
  if (leaf.pushdown) return '5';
  const lit = sampleLiteral(leaf.type);
  // quoted parameters are wrapped in quotes by the template itself
  return leaf.render === 'quoted' ? lit.replace(/^"|"$/g, '') : lit;
}

function validateDocument(id, text) {
  let doc;
  try {
    doc = gqlParse(text);
  } catch (e) {
    throw new Error(`${id}: GraphQL does not parse: ${e.message}\n${text}`);
  }
  const problems = gqlValidate(schema, doc);
  if (problems.length > 0) {
    throw new Error(`${id}: GraphQL fails schema validation: ${problems.map((p) => p.message).join('; ')}\n${text}`);
  }
}

// ---------------------------------------------------------------------------
// SELECT methods (native GraphQL read path)

function leafValueTemplate(leaf) {
  const ref = `{{ .${leaf.paramName} }}`;
  return leaf.render === 'quoted' ? `"${ref}"` : ref;
}

function renderLeaf(leaf) {
  if (leaf.pushdown) return `{{ if .limit }}${leaf.gqlName}: {{ .limit }} {{ end }}`;
  const piece = `${leaf.gqlName}: ${leafValueTemplate(leaf)} `;
  return leaf.required ? piece : `{{ if .${leaf.paramName} }}${piece}{{ end }}`;
}

function guardName(leaf) {
  return leaf.pushdown ? '.limit' : `.${leaf.paramName}`;
}

// Renders an argument tree as template text. always is true when some text
// is rendered whatever the WHERE clause supplies.
function renderTree(tree) {
  let text = '';
  let always = false;
  const guards = [];
  for (const e of tree) {
    if (e.kind === 'leaf') {
      text += renderLeaf(e);
      if (e.required) always = true;
      else guards.push(guardName(e));
      continue;
    }
    const inner = e.children.map(renderLeaf).join('');
    const innerGuards = e.children.filter((c) => !c.required).map(guardName);
    if (e.required || e.children.some((c) => c.required)) {
      text += `${e.gqlName}: { ${inner}} `;
      always = true;
    } else if (innerGuards.length > 0) {
      text += `{{ if or ${innerGuards.join(' ')} }}${e.gqlName}: { ${inner}} {{ end }}`;
      guards.push(...innerGuards);
    }
  }
  return { text, always, guards };
}

function renderCall(fieldName, tree, lead) {
  const { text, always, guards } = renderTree(tree);
  if (lead) return `${fieldName}(${lead} ${text}`.trimEnd() + ')';
  if (!text) return fieldName;
  if (always) return `${fieldName}(${text.trimEnd()})`;
  // only optional arguments: GraphQL forbids empty parentheses
  return `${fieldName}{{ if or ${guards.join(' ')} }}(${text.trimEnd()}){{ end }}`;
}

function rawParameterNote(leaf) {
  if (leaf.render !== 'raw') return '';
  if (leaf.isList && leaf.isEnum) return `GraphQL list literal of ${leaf.namedType} values, for example [${leaf.enumValues.slice(0, 2).join(', ')}].`;
  if (leaf.isList && !leaf.isInput) return 'GraphQL list literal, for example ["a", "b"].';
  if (leaf.isInput) return `GraphQL input object literal of type ${leaf.namedType}${leaf.isList ? ' (as a list)' : ''}, for example {field: "value"}.`;
  return 'GraphQL value literal, for example {key: "value"}.';
}

function parameterFor(leaf) {
  const note = rawParameterNote(leaf);
  const description = [sentence(leaf.description), note].filter(Boolean).join(' ');
  return {
    name: leaf.paramName,
    in: 'query',
    required: leaf.required,
    ...(description ? { description } : {}),
    schema: leaf.render === 'raw' ? { type: 'string' } : leaf.schema,
  };
}

// SQL LIMIT is pushed down to a `limit` argument where the field has one
// (the log and trace reads): the engine supplies it as {{ .limit }}, and
// `limit` is not addressable in a WHERE clause (it is a reserved word).
function markPushdown(tree) {
  for (const leaf of flattenTree(tree)) {
    if (leaf.gqlName === 'limit' && leaf.namedType === 'Int' && !leaf.isList && !leaf.required) leaf.pushdown = true;
  }
}

function attachTypes(tree, field) {
  // leaves need the GraphQL input type for sample rendering
  for (const e of tree) {
    const arg = field.args.find((a) => a.name === e.gqlName);
    if (e.kind === 'leaf') {
      e.type = arg.type;
    } else {
      const inputType = getNamedType(arg.type);
      for (const c of e.children) c.type = inputType.getFields()[c.gqlName].type;
    }
  }
}

function wrapPath(segments, leafSchema) {
  let current = leafSchema;
  for (let i = segments.length - 1; i >= 0; i--) {
    current = { type: 'object', properties: { [segments[i]]: current } };
  }
  return current;
}

const PAGE_INFO_SCHEMA = {
  type: 'object',
  properties: { hasNextPage: { type: 'boolean' }, endCursor: { type: 'string' } },
};

const componentSchemas = new Map(); // service -> Map(name -> schema)
function registerSchema(service, name, schemaObj) {
  if (!componentSchemas.has(service)) componentSchemas.set(service, new Map());
  const m = componentSchemas.get(service);
  if (m.has(name) && JSON.stringify(m.get(name)) !== JSON.stringify(schemaObj)) {
    throw new Error(`${service}: two different schemas registered under '${name}'`);
  }
  m.set(name, schemaObj);
  return { $ref: `#/components/schemas/${name}` };
}

function selectionFor(row) {
  const sel = buildSelection(row.cls.nodeType, policy);
  if (!sel) throw new Error(`${row.source}: no selectable fields on ${row.cls.nodeType.name}`);
  return sel;
}

function describe(row) {
  const what = row.kind === 'mutation' ? `mutation ${row.field_name}` : `query ${row.source.replace(/^Query\./, '').replace('>', '.')}`;
  let text = row.description;
  if (!text) {
    if (row.kind === 'mutation') text = `Runs the ${row.field_name} mutation`;
    else if (row.sql_verb === 'select' && ['connection', 'list', 'unwrapped_list'].includes(row.shape)) text = `Lists ${row.node_type} objects`;
    else if (row.shape === 'key_value') text = `Lists the entries of the ${row.field_name} map as name and value rows`;
    else if (row.shape === 'scalar' || row.shape === 'scalar_list') text = `Returns ${row.field_name}`;
    else text = `Gets a ${row.node_type}`;
    if (row.kind === 'nested') text += ` of a ${row.host.node_type}`;
  }
  const summary = firstSentence(text).replace(/[.]$/, '');
  return { summary, description: `${sentence(text)} Backed by the Railway GraphQL ${what}.` };
}

// Shown above the Fields table of the generated docs.
function responseDescription(row, nodeName) {
  const type = schema.getType(nodeName);
  const text = type && type.description ? sentence(type.description.replace(/\s+/g, ' ').trim()) : '';
  if (row.kind === 'mutation') {
    if (row.shape === 'object') return `The ${nodeName} the mutation returns. ${text}`.trim();
    if (row.shape === 'list') return `The ${nodeName} objects the mutation returns. ${text}`.trim();
    return `The value the mutation returns, as the ${RESULT_COLUMN} column.`;
  }
  if (row.shape === 'key_value') return 'One row per entry of the map.';
  if (row.shape === 'scalar') return `One row carrying the value as the ${RESULT_COLUMN} column.`;
  if (row.shape === 'scalar_list') return `One row per value, as the ${RESULT_COLUMN} column.`;
  if (row.shape === 'object') return `One ${nodeName} row. ${text}`.trim();
  return `One row per ${nodeName}. ${text}`.trim();
}

function buildSelectMethod(row) {
  const id = `${PROVIDER}.${row.service}.${row.resource}.${row.method}`;
  const field = row.field;
  markPushdown(row.argTree);
  attachTypes(row.argTree, field);
  if (row.hostArgTree) attachTypes(row.hostArgTree, row.host.field);

  const leaves = [...flattenTree(row.hostArgTree || []), ...flattenTree(row.argTree)];
  const parameters = leaves.filter((l) => !l.pushdown).map(parameterFor);

  let lead = '';
  let body;
  let itemsPath; // path segments under $.data to the rows
  let cursor;
  let responseLeaf;
  let responseSelection;
  let objectKey;
  let transform = null;
  let nodeName = row.node_type;
  const dataSegments = row.kind === 'nested' ? [row.host_field, field.name] : [field.name];
  const dataPath = dataSegments.join('.');

  if (row.shape === 'connection') {
    const sel = selectionFor(row);
    lead = `first: ${policy.pageSize}{{ .cursor }}`;
    body = `{ edges { node { ${sel.text} } } pageInfo { hasNextPage endCursor } }`;
    const ref = registerSchema(row.service, nodeName, sel.schema);
    // Relay connections answer edges[].node. The engine resolves columns
    // from an objectKey of the form edges[*].node, the docs generator only
    // from a plain dotted key, so the response is reshaped to
    // { nodes: [...], pageInfo } and schema, objectKey and response
    // selection all describe that one document (NOTES.md finding 8). The
    // cursor paths read the reshaped document too; pageInfo keeps its place.
    const connection = `index . "data" ${dataSegments.map((s) => `"${s}"`).join(' ')}`;
    const open = dataSegments.map((s) => `{"${s}":`).join('');
    const close = '}'.repeat(dataSegments.length);
    transform = `{{- $c := ${connection} -}}{"data":${open}{"nodes":[{{- $s := separator "," -}}{{- range $e := index $c "edges" -}}{{ call $s }}{{ toJson (index $e "node") }}{{- end -}}],"pageInfo":{{ toJson (index $c "pageInfo") }} }${close} }`;
    responseLeaf = {
      type: 'object',
      properties: {
        nodes: { type: 'array', items: ref },
        pageInfo: PAGE_INFO_SCHEMA,
      },
    };
    responseSelection = `$.data.${dataPath}.nodes[*]`;
    objectKey = `$.data.${dataPath}.nodes`;
    cursor = {
      strategy: 'page_info',
      jsonPath: `$.data.${dataPath}.pageInfo.endCursor`,
      terminateOnJsonPath: `$.data.${dataPath}.pageInfo.hasNextPage`,
    };
  } else if (row.shape === 'list') {
    const sel = selectionFor(row);
    body = `{ ${sel.text} }`;
    const ref = registerSchema(row.service, nodeName, sel.schema);
    responseLeaf = { type: 'array', items: ref };
    responseSelection = `$.data.${dataPath}[*]`;
    objectKey = `$.data.${dataPath}`;
    cursor = { jsonPath: GET_SENTINEL };
  } else if (row.shape === 'unwrapped_list') {
    const sel = selectionFor(row);
    const u = row.unwrap;
    const ref = registerSchema(row.service, nodeName, sel.schema);
    const wrapper = { type: 'object', properties: { [u.items]: { type: 'array', items: ref } } };
    let extra = '';
    if (u.cursor) {
      const segs = u.cursor.path.split('.');
      extra = ` ${segs.length === 2 ? `${segs[0]} { ${u.cursor.hasNext ? `${u.cursor.hasNext.split('.')[1]} ` : ''}${segs[1]} }` : segs[0]}`;
      if (segs.length === 2) {
        wrapper.properties[segs[0]] = { type: 'object', properties: { [segs[1]]: { type: 'string' }, ...(u.cursor.hasNext ? { [u.cursor.hasNext.split('.')[1]]: { type: 'boolean' } } : {}) } };
      } else {
        wrapper.properties[segs[0]] = { type: 'string' };
      }
      cursor = {
        strategy: 'page_info',
        jsonPath: `$.data.${dataPath}.${u.cursor.path}`,
        // a wrapper without a hasNext flag signals the end with a null cursor
        terminateOnJsonPath: `$.data.${dataPath}.${u.cursor.hasNext || u.cursor.path}`,
        ...(u.cursor.arg === 'after' ? {} : { format: `${u.cursor.arg}: "{{ .value }}" ` }),
      };
      lead = u.cursor.pageSizeArg ? `${u.cursor.pageSizeArg}: ${u.cursor.pageSize}{{ .cursor }}` : '{{ .cursor }}';
    } else {
      cursor = { jsonPath: GET_SENTINEL };
    }
    body = `{ ${u.items} { ${sel.text} }${extra} }`;
    responseLeaf = wrapper;
    responseSelection = `$.data.${dataPath}.${u.items}[*]`;
    objectKey = `$.data.${dataPath}.${u.items}`;
  } else if (row.shape === 'object') {
    const sel = selectionFor(row);
    body = `{ ${sel.text} }`;
    responseLeaf = registerSchema(row.service, nodeName, sel.schema);
    // a bare object is not accepted as a row set; a wildcard on the parent
    // returns a one element array (gitlab NOTES.md finding 1)
    responseSelection = row.kind === 'nested' ? `$.data.${row.host_field}.*` : '$.data.*';
    objectKey = `$.data.${dataPath}`;
    cursor = { jsonPath: GET_SENTINEL };
  } else if (['scalar', 'scalar_list', 'key_value'].includes(row.shape)) {
    if (row.kind === 'nested') throw new Error(`${row.source}: nested scalar fields are not supported`);
    body = '';
    const valueSchema = openApiTypeFor(row.cls.named, policy);
    let rowSchema;
    const value = `index (index . "data") "${field.name}"`;
    if (row.shape === 'key_value') {
      const kv = policy.keyValueScalars[row.cls.named.name];
      rowSchema = { type: 'object', properties: { [kv.keyColumn]: { type: 'string', description: 'Entry name' }, [kv.valueColumn]: { type: 'string', description: 'Entry value' } } };
      transform = `{"data":{"${field.name}":[{{- $s := separator "," -}}{{- range $k, $v := ${value} -}}{{ call $s }}{"${kv.keyColumn}":{{ toJson $k }},"${kv.valueColumn}":{{ toJson $v }}}{{- end -}}]}}`;
      nodeName = `${row.cls.named.name}Entry`;
    } else if (row.shape === 'scalar_list') {
      rowSchema = { type: 'object', properties: { [RESULT_COLUMN]: { ...valueSchema, description: `${field.name} value` } } };
      transform = `{"data":{"${field.name}":[{{- $s := separator "," -}}{{- range $v := ${value} -}}{{ call $s }}{"${RESULT_COLUMN}":{{ toJson $v }}}{{- end -}}]}}`;
      nodeName = `${field.name[0].toUpperCase()}${field.name.slice(1)}Result`;
    } else {
      rowSchema = { type: 'object', properties: { [RESULT_COLUMN]: { ...valueSchema, description: `${field.name} value` } } };
      transform = `{"data":{"${field.name}":[{"${RESULT_COLUMN}":{{ toJson (${value}) }}}]}}`;
      nodeName = `${field.name[0].toUpperCase()}${field.name.slice(1)}Result`;
    }
    const ref = registerSchema(row.service, nodeName, rowSchema);
    // the schema describes the transformed document, which is what the
    // response selection and the engine's column derivation both read
    responseLeaf = { type: 'array', items: ref };
    responseSelection = `$.data.${field.name}[*]`;
    objectKey = `$.data.${field.name}`;
    cursor = { jsonPath: GET_SENTINEL };
  } else {
    throw new Error(`${row.source}: unsupported shape '${row.shape}'`);
  }

  const call = `${renderCall(field.name, row.argTree, lead)}${body ? ` ${body}` : ''}`;
  const query = row.kind === 'nested'
    ? `query { ${renderCall(row.host_field, row.hostArgTree, '')} { ${call} } }`
    : `query { ${call} }`;

  // validate both renders against the pinned schema
  const required = Object.fromEntries(leaves.filter((l) => l.required).map((l) => [l.paramName, sampleValue(l)]));
  const all = Object.fromEntries(leaves.map((l) => [l.pushdown ? 'limit' : l.paramName, sampleValue(l)]));
  const cursorSample = cursor.format ? cursor.format.replace('{{ .value }}', 'abc') : ', after: "abc"';
  validateDocument(`${id} (optional parameters absent)`, renderTemplate(query, { ...required, cursor: '' }));
  validateDocument(`${id} (all parameters supplied)`, renderTemplate(query, { ...all, cursor: cursor.strategy ? cursorSample : '' }));

  const { summary, description } = describe(row);
  const pushdownNote = leaves.some((l) => l.pushdown) ? ' A SQL LIMIT is pushed down to the limit argument.' : '';
  const pathKey = `${GRAPHQL_PATH}?__resource=${row.resource}&__method=${row.method}`;
  const operation = {
    operationId: `${row.resource}_${row.method}`,
    summary,
    description: `${description}${pushdownNote}`,
    externalDocs: { description: 'Railway public API documentation', url: DOCS_URL },
    'x-stackQL-graphQL': {
      id,
      url: `${SERVER_URL}${GRAPHQL_PATH}`,
      httpVerb: 'POST',
      responseSelection: { jsonPath: responseSelection },
      cursor,
      query,
    },
    [PROTOCOL_MARKER]: 'graphql',
    parameters,
    responses: {
      200: {
        description: responseDescription(row, nodeName),
        content: {
          'application/json': {
            schema: { type: 'object', properties: { data: wrapPath(dataSegments, responseLeaf) } },
          },
        },
      },
    },
  };
  const method = {
    operation: { $ref: `#/paths/${jsonPointerEscape(pathKey)}/post` },
    response: {
      mediaType: 'application/json',
      openAPIDocKey: '200',
      objectKey,
      ...(transform ? { transform: { type: JSON_TEMPLATE, body: transform } } : {}),
    },
    [PROTOCOL_MARKER]: 'graphql',
  };
  return { row, pathKey, operation, method, objectKey, nodeName, required: leaves.filter((l) => l.required).map((l) => l.paramName) };
}

// ---------------------------------------------------------------------------
// INSERT / UPDATE / DELETE / EXEC methods (REST path, GraphQL variables)

// A GraphQL errors array arrives with HTTP 200, which the REST path reads as
// success. The response transform therefore fails deliberately when errors
// are present: getRegexpFirstMatch returns an error that quotes its input,
// so the statement fails with the API's own message in the text
// ("... in input \"graphql error: Project not found\""). NOTES.md finding 4.
const RAISE_ON_ERRORS = '{{- if index . "errors" -}}{{- $m := "" -}}{{- range $i, $e := index . "errors" -}}{{- if $i -}}{{- $m = printf "%s; %v" $m (index $e "message") -}}{{- else -}}{{- $m = printf "%v" (index $e "message") -}}{{- end -}}{{- end -}}{{ getRegexpFirstMatch (printf "graphql error: %s" $m) "^(no_graphql_errors)$" }}{{- else -}}';

// UPDATE ... SET values reach the body as strings (engine behaviour), so
// typed variables are coerced back in the template; INSERT and EXEC values
// arrive typed and pass through unchanged.
function coerceExpression(leaf) {
  switch (leaf.coerce) {
    case 'boolean': return '{{ if eq (kindOf $v) "string" }}{{ toBool $v }}{{ else }}{{ toJson $v }}{{ end }}';
    case 'integer': return '{{ if eq (kindOf $v) "string" }}{{ toInt $v }}{{ else }}{{ toJson $v }}{{ end }}';
    case 'number':
    case 'json': return '{{ if eq (kindOf $v) "string" }}{{ $v }}{{ else }}{{ toJson $v }}{{ end }}';
    default: return '{{ if eq (kindOf $v) "string" }}{{ toJson $v }}{{ else }}{{ toJson (printf "%v" $v) }}{{ end }}';
  }
}

function variableType(leaf) {
  const t = leaf.gqlType;
  return leaf.required ? t : t.replace(/!$/, '');
}

function buildMutationMethod(row) {
  const id = `${PROVIDER}.${row.service}.${row.resource}.${row.method}`;
  const field = row.field;
  const leaves = flattenTree(row.argTree);

  const decls = leaves.map((l) => `$${l.paramName}: ${variableType(l)}`).join(', ');
  const args = row.argTree.map((e) => {
    if (e.kind === 'leaf') return `${e.gqlName}: $${e.paramName}`;
    return `${e.gqlName}: { ${e.children.map((c) => `${c.gqlName}: $${c.paramName}`).join(', ')} }`;
  }).join(', ');

  let selection = '';
  let dataSchema;
  let responseBody;
  let nodeName;
  if (row.shape === 'object' || row.shape === 'list') {
    const sel = selectionFor(row);
    selection = ` { ${sel.text} }`;
    nodeName = row.node_type;
    const ref = registerSchema(row.service, nodeName, sel.schema);
    dataSchema = row.shape === 'list' ? { type: 'array', items: ref } : ref;
    responseBody = '{{ toJson . }}';
  } else {
    // a scalar answer (Boolean, String, a workflow id) surfaces as one column
    const named = row.cls.named;
    const valueSchema = openApiTypeFor(named, policy);
    nodeName = `${field.name[0].toUpperCase()}${field.name.slice(1)}Result`;
    const resultSchema = {
      type: 'object',
      properties: { [RESULT_COLUMN]: row.shape === 'scalar_list' ? { type: 'array', items: valueSchema } : valueSchema },
    };
    resultSchema.properties[RESULT_COLUMN].description = `Value returned by the ${field.name} mutation (${String(field.type)})`;
    dataSchema = registerSchema(row.service, nodeName, resultSchema);
    responseBody = `{"data":{"${field.name}":{"${RESULT_COLUMN}":{{ toJson (index (index . "data") "${field.name}") }}}}}`;
  }

  const text = `mutation${decls ? `(${decls})` : ''} { ${field.name}${args ? `(${args})` : ''}${selection} }`;
  assertNoTemplateDelimiters(id, text);
  validateDocument(id, text);

  const variableParts = leaves.map((l) => `{{- $v = index . "${l.paramName}" -}}{{- if ne (kindOf $v) "invalid" -}}{{ call $s }}"${l.paramName}":${coerceExpression(l)}{{- end -}}`).join('');
  const requestBody = leaves.length > 0
    ? `{"query":${JSON.stringify(text)},"variables":{ {{- $s := separator "," -}}{{- $v := "" -}}${variableParts}{{- "" }} }}`
    : `{"query":${JSON.stringify(text)},"variables":{ }}`;

  // EXEC accepts an @parameter only when its declared type is string,
  // object or array (the engine's parameter check knows no boolean, integer
  // or number - NOTES.md finding 6), so on methods that are reached through
  // EXEC alone those attributes are declared as strings; the request
  // template coerces them back to the GraphQL type.
  const execOnly = row.sql_verb === 'exec';
  const properties = {};
  for (const l of leaves) {
    const asString = execOnly && ['boolean', 'integer', 'number'].includes(l.coerce);
    const typeNote = asString ? `${l.coerce[0].toUpperCase()}${l.coerce.slice(1)} passed as a string, for example '${l.coerce === 'boolean' ? 'true' : l.coerce === 'integer' ? '1' : '0.5'}'.` : '';
    const inputNote = l.isInput ? `JSON ${l.isList ? 'array of objects' : 'object'} of GraphQL type ${l.namedType}; keys keep the API's camelCase names.` : '';
    const description = [sentence(l.description), typeNote, inputNote].filter(Boolean).join(' ');
    const schemaFor = asString ? { type: 'string', ...(l.coerce === 'boolean' ? { enum: ['true', 'false'] } : {}) } : l.schema;
    properties[l.paramName] = { ...schemaFor, ...(description ? { description } : {}) };
  }
  const required = leaves.filter((l) => l.required).map((l) => l.paramName);

  const { summary, description } = describe(row);
  const pathKey = `${GRAPHQL_PATH}?__resource=${row.resource}&__method=${row.method}`;
  const operation = {
    operationId: `${row.resource}_${row.method}`,
    summary,
    description,
    externalDocs: { description: 'Railway public API documentation', url: DOCS_URL },
    [PROTOCOL_MARKER]: 'graphql',
    ...(leaves.length > 0 ? {
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: { type: 'object', ...(required.length > 0 ? { required } : {}), properties },
          },
        },
      },
    } : {}),
    responses: {
      200: {
        description: responseDescription(row, nodeName),
        content: {
          'application/json': {
            schema: { type: 'object', properties: { data: { type: 'object', properties: { [field.name]: dataSchema } } } },
          },
        },
      },
    },
  };
  const objectKey = `$.data.${field.name}`;
  const method = {
    config: {
      requestTranslate: { algorithm: 'drop_double_underscore_params' },
      requestBodyTranslate: { algorithm: 'naive' },
    },
    operation: { $ref: `#/paths/${jsonPointerEscape(pathKey)}/post` },
    request: {
      mediaType: 'application/json',
      transform: { type: JSON_TEMPLATE, body: requestBody },
    },
    response: {
      mediaType: 'application/json',
      openAPIDocKey: '200',
      overrideMediaType: 'application/json',
      objectKey,
      transform: { type: JSON_TEMPLATE, body: `${RAISE_ON_ERRORS}${responseBody}{{- end -}}` },
    },
    [PROTOCOL_MARKER]: 'graphql',
  };
  return { row, pathKey, operation, method, objectKey, nodeName, required };
}

// ---------------------------------------------------------------------------
// Build every method in memory

const methods = [];
for (const row of rows) {
  try {
    // mutation inputs are always sent, so an inner required field is a
    // required parameter even when the input argument itself is optional
    if (row.kind === 'mutation') {
      for (const e of row.argTree) {
        if (e.kind === 'input') for (const c of e.children) c.required = e.innerRequired.includes(c.gqlName);
      }
      row.required_params = flattenTree(row.argTree).filter((l) => l.required).map((l) => l.paramName);
    }
    methods.push(row.kind === 'mutation' ? buildMutationMethod(row) : buildSelectMethod(row));
  } catch (e) {
    errors.push(e.message);
  }
}

// ---------------------------------------------------------------------------
// Validation: services, uniqueness, SQL verb signatures

for (const m of methods) {
  if (m.row.service === 'misc' || !serviceNames.services.includes(m.row.service)) {
    errors.push(`${m.row.source}: resource '${m.row.resource}' has no service (add a rule or an override to service_names.json)`);
  }
}

const resourceService = new Map();
const methodKeys = new Set();
for (const m of methods) {
  const { resource, service, method } = m.row;
  if (resourceService.has(resource) && resourceService.get(resource) !== service) {
    errors.push(`resource '${resource}' is placed in two services: ${resourceService.get(resource)} and ${service}`);
  }
  resourceService.set(resource, service);
  const key = `${resource}.${method}`;
  if (methodKeys.has(key)) errors.push(`duplicate method ${key} (${m.row.source})`);
  methodKeys.add(key);
}

// Overloaded SQL verbs must be told apart by their required parameters.
const bySignature = new Map();
for (const m of methods) {
  if (m.row.sql_verb === 'exec') continue;
  const key = `${m.row.resource}|${m.row.sql_verb}|${[...m.required].sort().join(',')}`;
  if (bySignature.has(key)) {
    errors.push(`ambiguous ${m.row.sql_verb.toUpperCase()} on ${m.row.resource}: ${bySignature.get(key)} and ${m.row.method} share the required parameters [${[...m.required].sort().join(', ')}]`);
  }
  bySignature.set(key, m.row.method);
}

// ---------------------------------------------------------------------------
// Operation mapping

const mappingRows = methods.map((m) => ({
  filename: `${m.row.service}.yaml`,
  path: m.pathKey,
  operationId: m.operation.operationId,
  formatted_op_id: m.operation.operationId,
  verb: 'post',
  response_object: m.nodeName,
  tags: m.row.source,
  formatted_tags: m.row.kind,
  stackql_resource_name: m.row.resource,
  stackql_method_name: m.row.method,
  stackql_verb: m.row.sql_verb,
  stackql_object_key: m.objectKey,
  op_description: m.operation.summary,
})).sort((a, b) => a.filename.localeCompare(b.filename) || a.stackql_resource_name.localeCompare(b.stackql_resource_name) || a.stackql_method_name.localeCompare(b.stackql_method_name));

if (errors.length > 0) {
  console.error(`FAILED with ${errors.length} error(s), nothing written:`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

const csvFile = path.join(baseDir, MAPPING_FILE);
const committed = loadCommittedMapping(baseDir);
if (committed === null) {
  console.log(`Mapping stability: no committed baseline at HEAD:${MAPPING_FILE} - ${mappingRows.length} mappings will become the baseline once committed`);
} else {
  const { breaking, additions } = compareMappings(committed, mappingRows);
  for (const a of additions) console.log(`mapping + ${a}`);
  if (breaking.length > 0) {
    console.error(`Operation mapping changed against the committed ${MAPPING_FILE}:`);
    for (const b of breaking) console.error(`  ! ${b}`);
    if (!acceptMappingChanges) {
      console.error('These are breaking changes for existing queries. Fix the rule in provider-dev/config/operation_rules.json, or re-run with --accept-mapping-changes (make generate-accept) to accept them; record accepted changes in NOTES.md and the release notes. Nothing written.');
      process.exit(1);
    }
    console.error(`${breaking.length} breaking mapping change(s) ACCEPTED.`);
  }
}

// ---------------------------------------------------------------------------
// Service docs

const VERB_ORDER = ['select', 'insert', 'update', 'delete', 'replace'];

function buildServiceDoc(service, ms) {
  const paths = {};
  const resources = {};
  for (const m of [...ms].sort((a, b) => a.pathKey.localeCompare(b.pathKey))) {
    paths[m.pathKey] = { post: m.operation };
  }
  const byResource = new Map();
  for (const m of ms) {
    if (!byResource.has(m.row.resource)) byResource.set(m.row.resource, []);
    byResource.get(m.row.resource).push(m);
  }
  for (const [resource, rms] of [...byResource].sort((a, b) => a[0].localeCompare(b[0]))) {
    const entry = {
      id: `${PROVIDER}.${service}.${resource}`,
      name: resource,
      title: titleCase(resource),
      methods: {},
      sqlVerbs: { select: [], insert: [], update: [], delete: [], replace: [] },
    };
    for (const m of [...rms].sort((a, b) => a.row.method.localeCompare(b.row.method))) {
      entry.methods[m.row.method] = m.method;
    }
    for (const verb of VERB_ORDER) {
      // most specific first: the engine takes the first method whose
      // required parameters the statement satisfies
      const forVerb = rms.filter((m) => m.row.sql_verb === verb)
        .sort((a, b) => b.required.length - a.required.length || a.row.method.localeCompare(b.row.method));
      entry.sqlVerbs[verb] = forVerb.map((m) => ({ $ref: `#/components/x-stackQL-resources/${resource}/methods/${m.row.method}` }));
    }
    resources[resource] = entry;
  }
  const schemas = {};
  for (const [name, s] of [...(componentSchemas.get(service) || new Map())].sort((a, b) => a[0].localeCompare(b[0]))) schemas[name] = s;
  return {
    openapi: '3.0.3',
    info: {
      title: `${serviceNames.titles[service] || titleCase(service)} API`,
      description: serviceNames.descriptions[service] || `Railway public API - ${service}`,
      version: VERSION,
    },
    servers: [{ url: SERVER_URL }],
    paths,
    components: { schemas, 'x-stackQL-resources': resources },
  };
}

function buildProviderDoc(services) {
  const providerServices = {};
  for (const s of [...services].sort()) {
    providerServices[s] = {
      id: `${s}:${VERSION}`,
      name: s,
      preferred: true,
      service: { $ref: `${PROVIDER}/${VERSION}/services/${s}.yaml` },
      title: `${serviceNames.titles[s] || titleCase(s)} API`,
      version: VERSION,
      description: serviceNames.descriptions[s] || `Railway public API - ${s}`,
    };
  }
  return {
    id: PROVIDER,
    name: PROVIDER,
    version: VERSION,
    providerServices,
    config: {
      auth: {
        credentialsenvvar: TOKEN_ENV_VAR,
        type: 'bearer',
      },
    },
  };
}

const byService = new Map();
for (const m of methods) {
  if (!byService.has(m.row.service)) byService.set(m.row.service, []);
  byService.get(m.row.service).push(m);
}

const outDir = path.join(baseDir, 'provider-dev', 'openapi', 'src', PROVIDER, VERSION);
const servicesDir = path.join(outDir, 'services');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(servicesDir, { recursive: true });

const yamlOpts = { lineWidth: -1, noRefs: true };
for (const [service, ms] of [...byService].sort((a, b) => a[0].localeCompare(b[0]))) {
  fs.writeFileSync(path.join(servicesDir, `${service}.yaml`), yaml.dump(buildServiceDoc(service, ms), yamlOpts));
  const selects = ms.filter((m) => m.row.sql_verb === 'select').length;
  console.log(`Wrote services/${service}.yaml (${new Set(ms.map((m) => m.row.resource)).size} resources, ${ms.length} methods, ${selects} selectable)`);
}
fs.writeFileSync(path.join(outDir, 'provider.yaml'), yaml.dump(buildProviderDoc([...byService.keys()]), yamlOpts));
console.log(`Wrote provider.yaml (${byService.size} services)`);

fs.writeFileSync(csvFile, renderMappingCsv(mappingRows));
console.log(`Wrote ${path.relative(baseDir, csvFile)} (${mappingRows.length} operation mappings)`);

const verbs = {};
for (const m of methods) verbs[m.row.sql_verb] = (verbs[m.row.sql_verb] || 0) + 1;
const resources = new Set(methods.map((m) => m.row.resource));
const selectable = new Set(methods.filter((m) => m.row.sql_verb === 'select').map((m) => m.row.resource));
console.log(`\n${methods.length} methods (${Object.entries(verbs).sort().map(([v, n]) => `${n} ${v}`).join(', ')}) across ${resources.size} resources (${selectable.size} selectable) in ${byService.size} services`);
