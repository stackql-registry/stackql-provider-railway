// Shared schema walking for the railway provider build.
//
// build_inventory.mjs and generate_provider.mjs both consume this module, so
// the inventory, the generated GraphQL text, the request bodies and the
// response schemas all derive from one code path and cannot drift.
//
// The walk covers three sources in the pinned introspection schema:
//   - every field on Query          -> SELECT methods (list / get)
//   - nested collections on objects -> SELECT methods (list), for collections
//     returned by a root get          that no root query serves (services
//                                     and volumes of a project, service
//                                     instances of an environment, ...)
//   - every field on Mutation       -> INSERT / UPDATE / DELETE / EXEC methods
//
// Naming is mechanical (rules below) with explicit, reviewable overrides in
// provider-dev/config/operation_rules.json. Anything not mappable is reason
// coded; nothing is dropped silently.

import fs from 'node:fs';
import path from 'node:path';
import pluralize from 'pluralize';
import {
  buildClientSchema,
  getNamedType,
  isObjectType,
  isScalarType,
  isEnumType,
  isUnionType,
  isInterfaceType,
  isNonNullType,
  isListType,
  isInputObjectType,
} from 'graphql';

export const SCHEMA_FILE = path.join('provider-dev', 'downloaded', 'introspection_result.json');

export function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

// assumeValid: the served schema does not pass graphql-js schema validation
// (the deprecated Team.id implements the non-deprecated Node.id), which
// would otherwise fail every document validated against it. The defect is
// upstream and irrelevant to the documents generated here.
export function loadSchema(baseDir) {
  const raw = loadJson(path.join(baseDir, SCHEMA_FILE));
  return buildClientSchema(raw.data ? raw.data : raw, { assumeValid: true });
}

export function loadPolicy(baseDir) {
  return loadJson(path.join(baseDir, 'provider-dev', 'config', 'selection_policy.json'));
}

export function loadRules(baseDir) {
  return loadJson(path.join(baseDir, 'provider-dev', 'config', 'operation_rules.json'));
}

export function loadServiceNames(baseDir) {
  return loadJson(path.join(baseDir, 'provider-dev', 'config', 'service_names.json'));
}

// ---------------------------------------------------------------------------
// Naming

// snake_case for the SQL surface: resource names, method names, parameter
// names and column aliases all go through this one function. Digits stay
// attached to the preceding word (deployV2 -> deploy_v2, has2FA -> has2fa,
// bucketS3Credentials -> bucket_s3_credentials).
export function snake(name) {
  return name
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/(\d)([A-Z][a-z])/g, '$1_$2')
    .toLowerCase();
}

let reservedNames = new Set();
let reservedSuffix = '_';
export function configureNaming(policy) {
  reservedNames = new Set(policy.sqlReservedColumnNames || []);
  reservedSuffix = policy.reservedColumnSuffix || '_';
}

// SQL surface names (columns and parameters): snake_case, plus the reserved
// word rule - a name the stackql parser or the SQLite backend rejects as a
// bare identifier gets the policy suffix appended (from -> from_), because
// quoting does not rescue such a column (gitlab NOTES.md finding 10).
export function sqlName(name) {
  const s = snake(name);
  return reservedNames.has(s) ? `${s}${reservedSuffix}` : s;
}

function camelWords(name) {
  return name
    .replace(/([a-z\d])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(' ');
}

function mapLastWord(name, fn) {
  const words = camelWords(name);
  const last = words.pop();
  const mapped = fn(last);
  // keep the original capitalisation of the first letter
  const fixed = last[0] === last[0].toUpperCase() ? mapped[0].toUpperCase() + mapped.slice(1) : mapped;
  return [...words, fixed].join('');
}

// tcpProxies -> tcpProxy, volumeInstanceBackupList -> volumeInstanceBackup
export function singularNoun(fieldName) {
  const base = fieldName.replace(/List$/, '');
  return mapLastWord(base, (w) => pluralize.singular(w));
}

export function pluralNoun(noun, uncountable) {
  const words = camelWords(noun);
  const last = words[words.length - 1].toLowerCase();
  if (uncountable.has(last) || uncountable.has(noun)) return noun;
  return mapLastWord(noun, (w) => pluralize.plural(w));
}

// ---------------------------------------------------------------------------
// Type helpers

export function outerType(type) {
  return isNonNullType(type) ? type.ofType : type;
}

export function isListish(type) {
  return isListType(outerType(type));
}

// graphql-js 17 exposes argument defaults as `arg.default`; older releases
// used `arg.defaultValue`. Required means non-null with no default.
export function hasDefault(arg) {
  return (arg.defaultValue !== undefined && arg.defaultValue !== null) || (arg.default !== undefined && arg.default !== null);
}

export function isRequired(arg) {
  return isNonNullType(arg.type) && !hasDefault(arg);
}

export function isConnectionType(t) {
  if (!isObjectType(t)) return false;
  const f = t.getFields();
  return Boolean(f.edges && f.pageInfo);
}

export function connectionNodeType(t) {
  const edgeType = getNamedType(t.getFields().edges.type);
  if (!isObjectType(edgeType) || !edgeType.getFields().node) return null;
  return getNamedType(edgeType.getFields().node.type);
}

function isDeprecated(f) {
  return f.deprecationReason !== undefined && f.deprecationReason !== null;
}

function cleanText(s) {
  return (s || '').replace(/\s+/g, ' ').trim();
}

const PAGINATION_ARGS = new Set(['first', 'last', 'after', 'before']);

// ---------------------------------------------------------------------------
// OpenAPI types

export function openApiTypeFor(named, policy) {
  if (isEnumType(named)) {
    return { type: 'string', enum: named.getValues().filter((v) => !isDeprecated(v)).map((v) => v.name) };
  }
  const mapped = (policy.scalarTypes || {})[named.name];
  return mapped ? { ...mapped } : { type: 'string' };
}

// ---------------------------------------------------------------------------
// Selection sets: the GraphQL selection text and the OpenAPI row schema are
// built together, field by field, so they describe exactly the same shape.
// Every field is aliased to its snake_case column name at every depth.

// A nested reference declared non-null (service: Service!) whose own id
// field on the same type is nullable (serviceId: String) cannot always
// resolve: when the id is null the API answers "Problem processing request"
// and the engine fails the whole statement. Observed on Variable.service
// (shared variables), VolumeInstance.service (detached volumes) and
// Variable.plugin. The id column carries the reference.
export function isUnresolvableReference(type, f) {
  if (!isNonNullType(f.type) || isListish(f.type)) return false;
  if (!isObjectType(getNamedType(f.type))) return false;
  const idField = type.getFields()[`${f.name}Id`];
  return Boolean(idField) && !isNonNullType(idField.type);
}

function fieldExcluded(type, f, policy) {
  if (isDeprecated(f)) return true;
  if (f.args.some(isRequired)) return true;
  if (policy.skipNonNullReferencesWithNullableIds && isUnresolvableReference(type, f)) return true;
  if ((policy.excludeFieldNamePatterns || []).some((p) => new RegExp(p).test(f.name))) return true;
  const entry = (policy.nodeTypeFieldExclusions || {})[type.name];
  const excluded = Array.isArray(entry) ? entry : (entry && entry.fields) || [];
  if (excluded.includes(f.name)) return true;
  if (Object.keys((policy.unstableFields || {})[type.name] || {}).includes(f.name)) return true;
  return false;
}

// Returns { text, schema, columns } for an object type, or null when nothing
// is selectable. depth 0 is the row itself; nested objects and lists of
// objects are selected down to policy.nestedDepth (one level further for the
// Type.field entries named in policy.expandNested) and surface as JSON
// columns. Connections are never selected inline - they are resources of
// their own - and a type already on the path is not re-entered.
export function buildSelection(type, policy, depth = 0, pathTypes = [], maxDepth = null) {
  const limit = maxDepth === null ? policy.nestedDepth : maxDepth;
  const nestedScalarExclusions = new Set(policy.nestedScalarExclusions || []);
  const parts = [];
  const properties = {};
  const fields = Object.values(type.getFields()).sort((a, b) => a.name.localeCompare(b.name));
  for (const f of fields) {
    if (fieldExcluded(type, f, policy)) continue;
    const named = getNamedType(f.type);
    const column = sqlName(f.name);
    const alias = column === f.name ? f.name : `${column}: ${f.name}`;
    const description = cleanText(f.description);
    if (isScalarType(named) || isEnumType(named)) {
      if (depth > 0 && nestedScalarExclusions.has(named.name)) continue;
      const base = openApiTypeFor(named, policy);
      if (description) base.description = description;
      properties[column] = isListish(f.type) ? { type: 'array', items: base, ...(description ? { description } : {}) } : base;
      if (isListish(f.type) && properties[column].items.description) delete properties[column].items.description;
      parts.push(alias);
      continue;
    }
    if (!isObjectType(named) || isConnectionType(named)) continue;
    if (pathTypes.includes(named.name) || named.name === type.name) continue;
    const expand = (policy.expandNested || {})[`${type.name}.${f.name}`] === true;
    const childLimit = expand ? Math.max(limit, depth + 2) : limit;
    if (depth + 1 > childLimit) continue;
    const sub = buildSelection(named, policy, depth + 1, [...pathTypes, type.name], childLimit);
    if (!sub) continue;
    parts.push(`${alias} { ${sub.text} }`);
    const objSchema = { type: 'object', properties: sub.schema.properties };
    if (isListish(f.type)) {
      properties[column] = { type: 'array', items: objSchema, description: description || `List of ${named.name} objects` };
    } else {
      properties[column] = { ...objSchema, description: description || `${named.name} object` };
    }
  }
  if (parts.length === 0) return null;
  return { text: parts.join(' '), schema: { type: 'object', properties }, columns: Object.keys(properties).length };
}

// ---------------------------------------------------------------------------
// Arguments
//
// A root field's arguments become SQL parameters. Scalars and enums are
// typed parameters; input objects are flattened one level into parameters
// named after their fields; lists and input objects nested deeper cannot be
// expressed as one flat typed value and are passed through verbatim
// ("raw"): as a GraphQL literal on the query side, as JSON on the mutation
// side (where the engine sends real GraphQL variables).

function describeLeaf(gqlName, type, description, required, policy, pathPrefix) {
  const named = getNamedType(type);
  const list = isListish(type) || (isNonNullType(type) && isListType(type.ofType));
  const input = isInputObjectType(named);
  const leaf = {
    gqlName,
    gqlType: String(type),
    namedType: named.name,
    required,
    description: cleanText(description),
    isEnum: isEnumType(named),
    enumValues: isEnumType(named) ? named.getValues().filter((v) => !isDeprecated(v)).map((v) => v.name) : null,
    isList: list,
    isInput: input,
    path: [...pathPrefix, gqlName],
  };
  // rendering class
  if (list || input) leaf.render = 'raw';
  else if (leaf.isEnum || ['Int', 'Float', 'Boolean'].includes(named.name)) leaf.render = 'bare';
  else if ((policy.scalarTypes[named.name] || {}).type === 'object') leaf.render = 'raw';
  else leaf.render = 'quoted';
  // openapi schema
  if (list) {
    const item = input ? { type: 'object' } : openApiTypeFor(named, policy);
    leaf.schema = { type: 'array', items: item };
  } else if (input) {
    leaf.schema = { type: 'object' };
  } else {
    leaf.schema = openApiTypeFor(named, policy);
  }
  // coercion class for mutation variables (see generate_provider.mjs)
  if (list || input || leaf.schema.type === 'object') leaf.coerce = 'json';
  else if (named.name === 'Boolean') leaf.coerce = 'boolean';
  else if (named.name === 'Int') leaf.coerce = 'integer';
  else if (named.name === 'Float') leaf.coerce = 'number';
  else leaf.coerce = 'string';
  return leaf;
}

// Returns the argument tree for a field: an ordered list of entries, each
// either a leaf parameter or a flattened input object with leaf children.
export function buildArgTree(field, policy, { skipPagination, exclude = [], require = [] }) {
  const tree = [];
  const args = [...field.args].sort((a, b) => a.name.localeCompare(b.name));
  for (const name of require) {
    if (!args.some((a) => a.name === name)) throw new Error(`require rule names '${name}', which is not an argument of ${field.name}`);
  }
  for (const arg of args) {
    if (skipPagination && PAGINATION_ARGS.has(arg.name)) continue;
    if (exclude.includes(arg.name)) continue;
    if (require.includes(arg.name)) {
      tree.push({ kind: 'leaf', ...describeLeaf(arg.name, arg.type, arg.description, true, policy, []) });
      continue;
    }
    const named = getNamedType(arg.type);
    if (isInputObjectType(named) && !isListish(arg.type)) {
      const children = [];
      const inputFields = Object.values(named.getFields()).sort((a, b) => a.name.localeCompare(b.name));
      for (const f of inputFields) {
        if (isDeprecated(f)) continue;
        children.push(describeLeaf(f.name, f.type, f.description, isRequired(arg) && isRequired(f), policy, [arg.name]));
      }
      tree.push({ kind: 'input', gqlName: arg.name, gqlType: String(arg.type), required: isRequired(arg), children, innerRequired: inputFields.filter((f) => !isDeprecated(f) && isRequired(f)).map((f) => f.name) });
    } else {
      tree.push({ kind: 'leaf', ...describeLeaf(arg.name, arg.type, arg.description, isRequired(arg), policy, []) });
    }
  }
  assignParamNames(tree);
  return tree;
}

// Parameter names: the snake_case leaf name. A flattened input field that
// collides with a sibling argument (or with a field of another flattened
// input) is prefixed with its input argument's name.
function assignParamNames(tree) {
  const counts = new Map();
  const bump = (n) => counts.set(n, (counts.get(n) || 0) + 1);
  for (const e of tree) {
    if (e.kind === 'leaf') bump(sqlName(e.gqlName));
    else for (const c of e.children) bump(sqlName(c.gqlName));
  }
  for (const e of tree) {
    if (e.kind === 'leaf') {
      e.paramName = sqlName(e.gqlName);
    } else {
      for (const c of e.children) {
        const plain = sqlName(c.gqlName);
        c.paramName = counts.get(plain) > 1 ? sqlName(`${e.gqlName}_${snake(c.gqlName)}`) : plain;
      }
    }
  }
  const seen = new Set();
  for (const leaf of flattenTree(tree)) {
    if (seen.has(leaf.paramName)) throw new Error(`Parameter name collision on '${leaf.paramName}'`);
    seen.add(leaf.paramName);
  }
}

export function flattenTree(tree) {
  const out = [];
  for (const e of tree) {
    if (e.kind === 'leaf') out.push(e);
    else out.push(...e.children);
  }
  return out;
}

export function argSummary(field) {
  return field.args.map((a) => `${a.name}:${String(a.type)}`).join('; ');
}

// ---------------------------------------------------------------------------
// Return shapes

export function classifyReturn(type, policy) {
  const named = getNamedType(type);
  const list = isListish(type);
  if (isUnionType(named)) return { shape: 'union', named };
  if (isInterfaceType(named)) return { shape: 'interface', named };
  if (isConnectionType(named)) {
    const node = connectionNodeType(named);
    if (!node || !isObjectType(node)) return { shape: 'unsupported_connection', named };
    return { shape: 'connection', named, nodeType: node };
  }
  if (isObjectType(named)) return list ? { shape: 'list', named, nodeType: named } : { shape: 'object', named, nodeType: named };
  if (isScalarType(named) || isEnumType(named)) {
    if (!list && (policy.keyValueScalars || {})[named.name]) return { shape: 'key_value', named };
    return list ? { shape: 'scalar_list', named } : { shape: 'scalar', named };
  }
  return { shape: 'unsupported', named };
}

// ---------------------------------------------------------------------------
// Skips

function skipReasonFor(fieldName, kind, field, rules) {
  const explicit = (rules.skip || {})[`${kind}.${fieldName}`];
  if (explicit) return explicit;
  for (const [pattern, reason, appliesTo] of rules.skipPatterns || []) {
    if (appliesTo && appliesTo !== kind) continue;
    if (new RegExp(pattern).test(fieldName)) return reason;
  }
  if (isDeprecated(field)) return 'deprecated';
  for (const a of field.args) {
    if (getNamedType(a.type).name === 'Upload') return 'multipart_upload';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Verb classification for mutations

const INSERT_VERBS = new Set(['create', 'add', 'upsert', 'attach']);
const UPDATE_VERBS = new Set(['update', 'rename']);
const DELETE_VERBS = new Set(['delete', 'remove', 'destroy', 'detach']);

// Only the bare verb maps to a SQL verb; a compound method name
// (schedule_delete, invite_code_create) is a lifecycle action and maps to
// EXEC unless operation_rules.json says otherwise.
export function sqlVerbForMethod(method) {
  if (INSERT_VERBS.has(method)) return 'insert';
  if (UPDATE_VERBS.has(method)) return 'update';
  if (DELETE_VERBS.has(method)) return 'delete';
  return 'exec';
}

// ---------------------------------------------------------------------------
// The walk

export function walkAll(schema, policy, rules, serviceNames) {
  configureNaming(policy);
  const uncountable = new Set(rules.uncountable || []);
  const Query = schema.getType('Query');
  const Mutation = schema.getType('Mutation');
  const rows = [];

  const base = (kind, source, field, extra = {}) => ({
    kind,
    source,
    field_name: field.name,
    field,
    args: argSummary(field),
    returns: String(field.type),
    description: cleanText(field.description),
    shape: '',
    node_type: '',
    resource: '',
    method: '',
    sql_verb: '',
    service: '',
    disposition: '',
    skip_reason: '',
    ...extra,
  });
  const skip = (row, reason) => { row.disposition = 'skip'; row.skip_reason = reason; rows.push(row); return row; };

  // ---- pass 1: root queries
  const queryFields = Object.values(Query.getFields()).sort((a, b) => a.name.localeCompare(b.name));
  const nounToResource = new Map(); // singular camel noun -> resource name
  const registerNoun = (noun, resource) => { if (!nounToResource.has(noun)) nounToResource.set(noun, resource); };

  const pending = [];
  for (const field of queryFields) {
    const row = base('query', `Query.${field.name}`, field);
    const reason = skipReasonFor(field.name, 'query', field, rules);
    if (reason) { skip(row, reason); continue; }
    const cls = classifyReturn(field.type, policy);
    row.shape = cls.shape;
    row.cls = cls;
    row.node_type = cls.nodeType ? cls.nodeType.name : cls.named.name;
    if (['union', 'interface', 'unsupported', 'unsupported_connection'].includes(cls.shape)) { skip(row, `${cls.shape}_typed_field`); continue; }
    const unwrap = (rules.unwrap || {})[field.name];
    if (unwrap) {
      const itemField = cls.named.getFields()[unwrap.items];
      if (!itemField) throw new Error(`unwrap rule for ${field.name}: no field '${unwrap.items}' on ${cls.named.name}`);
      const itemType = getNamedType(itemField.type);
      row.unwrap = unwrap;
      row.shape = 'unwrapped_list';
      row.cls = { shape: 'unwrapped_list', named: cls.named, nodeType: itemType };
      row.node_type = itemType.name;
    }
    pending.push(row);
  }

  // list-like queries name resources first so gets can join them by noun
  const isCollection = (r) => ['connection', 'list', 'scalar_list', 'key_value', 'unwrapped_list'].includes(r.shape);
  for (const row of pending.filter(isCollection)) {
    const override = (rules.queries || {})[row.field_name] || {};
    const baseName = row.field_name.replace(/List$/, '');
    const resource = override.resource || snake(/List$/.test(row.field_name) ? pluralNoun(baseName, uncountable) : baseName);
    row.resource = resource;
    row.method = override.method || 'list';
    row.sql_verb = 'select';
    registerNoun(override.noun || singularNoun(row.field_name), resource);
  }
  for (const row of pending.filter((r) => !isCollection(r))) {
    const override = (rules.queries || {})[row.field_name] || {};
    const noun = override.noun || row.field_name;
    let resource = override.resource || nounToResource.get(noun);
    // a scalar answer (a flag, a count) keeps the field's own name
    if (!resource) resource = row.shape === 'scalar' ? snake(noun) : snake(pluralNoun(noun, uncountable));
    row.resource = resource;
    row.method = override.method || 'get';
    row.sql_verb = 'select';
    registerNoun(noun, resource);
  }

  // ---- pass 2: nested fields on objects returned by root gets.
  // Collections are candidates by default; single objects only when
  // operation_rules.json names them (kind: object).
  const rootCollectionNodeTypes = new Set(pending.filter(isCollection).map((r) => r.node_type));
  // node types a nested rule maps from some host: the same collection under
  // another host (workspaceByCode next to workspace) is then already served
  const ruledNodeTypes = new Set();
  for (const host of pending.filter((r) => r.shape === 'object')) {
    for (const nf of Object.values(host.cls.named.getFields())) {
      if (!(rules.nested || {})[`${host.field_name}.${nf.name}`]) continue;
      const named = getNamedType(nf.type);
      ruledNodeTypes.add(isConnectionType(named) ? connectionNodeType(named).name : named.name);
    }
  }
  const nestedRows = [];
  for (const host of pending.filter((r) => r.shape === 'object')) {
    const hostType = host.cls.named;
    const hostFields = Object.values(hostType.getFields()).sort((a, b) => a.name.localeCompare(b.name));
    for (const nf of hostFields) {
      const key = `${host.field_name}.${nf.name}`;
      const rule = (rules.nested || {})[key];
      const named = getNamedType(nf.type);
      let cls = null;
      if (isConnectionType(named)) {
        const node = connectionNodeType(named);
        if (node && isObjectType(node)) cls = { shape: 'connection', named, nodeType: node };
      } else if (isObjectType(named) && isListish(nf.type)) {
        cls = { shape: 'list', named, nodeType: named };
      } else if (isObjectType(named) && rule && rule.kind === 'object') {
        cls = { shape: 'object', named, nodeType: named };
      }
      if (!cls) continue;
      const row = base('nested', `Query.${host.field_name}>${nf.name}`, nf, {
        host,
        host_field: host.field_name,
        args: `${host.args}${host.args && argSummary(nf) ? '; ' : ''}${argSummary(nf)}`,
        shape: cls.shape,
        cls,
        node_type: cls.nodeType.name,
        description: cleanText(nf.description),
      });
      if (isDeprecated(nf)) { skip(row, 'deprecated'); continue; }
      if (nf.args.some((a) => isRequired(a) && !PAGINATION_ARGS.has(a.name))) { skip(row, 'nested_field_requires_arguments'); continue; }
      if (!rule) {
        if (rootCollectionNodeTypes.has(cls.nodeType.name)) { skip(row, 'served_by_root_query'); continue; }
        if (ruledNodeTypes.has(cls.nodeType.name)) { skip(row, 'served_by_another_host'); continue; }
        // a connection is never selected inline, so an unmapped one is not
        // reachable at all: it must be decided, not left
        skip(row, cls.shape === 'connection' ? 'nested_connection_not_mapped' : 'inline_json_column');
        continue;
      }
      row.resource = rule.resource;
      row.method = rule.method || (cls.shape === 'object' ? 'get' : 'list');
      row.sql_verb = 'select';
      nestedRows.push(row);
      registerNoun(rule.noun || singularNoun(nf.name), row.resource);
    }
  }
  for (const key of Object.keys(rules.nested || {})) {
    if (key.startsWith('_')) continue;
    if (!nestedRows.some((r) => `${r.host_field}.${r.field_name}` === key)) {
      throw new Error(`operation_rules.json nested rule '${key}' matches no mappable nested field in the pinned schema`);
    }
  }

  // ---- pass 3: mutations
  const mutationRows = [];
  const nouns = () => [...nounToResource.keys()].sort((a, b) => b.length - a.length);
  const mutationFields = Object.values(Mutation.getFields()).sort((a, b) => a.name.localeCompare(b.name));
  const knownVerbs = (rules.verbs || []).slice().sort((a, b) => b.length - a.length);
  for (const field of mutationFields) {
    const row = base('mutation', `Mutation.${field.name}`, field);
    const reason = skipReasonFor(field.name, 'mutation', field, rules);
    if (reason) { skip(row, reason); continue; }
    const cls = classifyReturn(field.type, policy);
    row.cls = cls;
    row.shape = cls.shape === 'key_value' ? 'scalar' : cls.shape;
    row.node_type = cls.nodeType ? cls.nodeType.name : cls.named.name;
    if (['union', 'interface', 'unsupported', 'unsupported_connection', 'connection'].includes(cls.shape)) { skip(row, `${cls.shape}_typed_field`); continue; }
    const override = (rules.mutations || {})[field.name];
    if (override) {
      row.resource = override.resource;
      row.method = override.method;
      row.sql_verb = override.verb || sqlVerbForMethod(override.method);
      row.naming = 'override';
      mutationRows.push(row);
      continue;
    }
    // longest known noun prefix, remainder is the method
    let matched = null;
    for (const noun of nouns()) {
      if (field.name.length > noun.length && field.name.startsWith(noun) && /[A-Z]/.test(field.name[noun.length])) {
        matched = noun;
        break;
      }
    }
    // verb suffix: <noun><Verb>
    let suffix = null;
    for (const verb of knownVerbs) {
      if (field.name.endsWith(verb) && field.name.length > verb.length) { suffix = verb; break; }
    }
    const remainder = matched ? field.name.slice(matched.length) : null;
    const remainderIsVerbPhrase = remainder && knownVerbs.some((v) => remainder === v || remainder.startsWith(v));
    if (matched && (remainderIsVerbPhrase || !suffix)) {
      row.resource = nounToResource.get(matched);
      row.method = snake(remainder);
      row.naming = 'noun_prefix';
    } else if (suffix) {
      const noun = field.name.slice(0, field.name.length - suffix.length);
      row.resource = nounToResource.get(noun) || snake(pluralNoun(noun, uncountable));
      row.method = snake(suffix);
      row.naming = 'verb_suffix';
      registerNoun(noun, row.resource);
    } else {
      skip(row, 'unmapped_mutation_name');
      continue;
    }
    row.sql_verb = sqlVerbForMethod(row.method);
    mutationRows.push(row);
  }

  // ---- finalise: parameters, verbs that need parameters, services
  const mapped = [...pending, ...nestedRows, ...mutationRows];
  for (const row of mapped) {
    row.disposition = 'map';
    if (row.kind === 'nested') {
      const hostRule = (rules.queries || {})[row.host_field] || {};
      row.hostArgTree = buildArgTree(row.host.field, policy, { skipPagination: false, require: hostRule.require || [] });
      // the host's bare `id` would read as the row's own id: name it after
      // the host (project_id, environment_id, deployment_id)
      for (const leaf of flattenTree(row.hostArgTree)) {
        if (leaf.paramName === 'id') leaf.paramName = `${snake(row.host_field)}_id`;
      }
      row.argTree = buildArgTree(row.field, policy, { skipPagination: true });
      const hostNames = new Set(flattenTree(row.hostArgTree).map((l) => l.paramName));
      for (const leaf of flattenTree(row.argTree)) {
        if (hostNames.has(leaf.paramName)) throw new Error(`${row.source}: nested argument '${leaf.paramName}' collides with a host parameter`);
      }
    } else {
      const skipPagination = row.kind === 'query' && row.shape === 'connection';
      // a wrapper's own paging arguments are driven by the cursor config
      const cur = row.unwrap && row.unwrap.cursor;
      const exclude = cur ? [cur.arg, cur.pageSizeArg, cur.limitArg].filter(Boolean) : [];
      const rule = row.kind === 'query' ? (rules.queries || {})[row.field_name] || {} : {};
      row.argTree = buildArgTree(row.field, policy, { skipPagination, exclude, require: rule.require || [] });
    }
    const leaves = [...flattenTree(row.hostArgTree || []), ...flattenTree(row.argTree)];
    row.required_params = leaves.filter((l) => l.required).map((l) => l.paramName);
    row.optional_params = leaves.filter((l) => !l.required).map((l) => l.paramName);
    if (row.kind === 'mutation') {
      // UPDATE and DELETE address a row: without a required key they are
      // actions on the caller's own context and map to EXEC instead
      if ((row.sql_verb === 'delete' || row.sql_verb === 'update') && row.required_params.length === 0) row.sql_verb = 'exec';
    }
    row.service = resolveService(row.resource, serviceNames);
    rows.push(row);
  }
  // every rule must still name something in the pinned schema: a rule that
  // silently stops matching after a schema refresh is a lost decision
  for (const [section, type] of [['queries', Query], ['unwrap', Query], ['mutations', Mutation]]) {
    for (const key of Object.keys(rules[section] || {})) {
      if (key.startsWith('_')) continue;
      if (!type.getFields()[key]) throw new Error(`operation_rules.json ${section} rule '${key}' names a field that is not in the pinned schema`);
    }
  }
  for (const key of Object.keys(rules.skip || {})) {
    if (key.startsWith('_')) continue;
    const [kind, name] = key.split('.');
    const type = kind === 'query' ? Query : Mutation;
    if (!type.getFields()[name]) throw new Error(`operation_rules.json skip rule '${key}' names a field that is not in the pinned schema`);
  }
  rows.sort((a, b) => a.source.localeCompare(b.source));
  return rows;
}

export function resolveService(resource, serviceNames) {
  const override = (serviceNames.overrides || {})[resource];
  if (override) return override;
  for (const [pattern, svc] of serviceNames.rules || []) {
    if (new RegExp(pattern).test(resource)) return svc;
  }
  return 'misc';
}
