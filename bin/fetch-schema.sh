#!/bin/bash
# Fetch and pin the Railway GraphQL introspection schema.
#
# Railway publishes no OpenAPI document and no static schema file; the
# public API (https://backboard.railway.com/graphql/v2) answers the standard
# introspection query, unauthenticated. This script POSTs the query in
# provider-dev/config/introspection_query.graphql and compares the content
# hash of the response with the pin in provider-dev/config/schema_pin.json.
# The schema is unversioned and the vendor deploys continuously, so the pin
# is the record of what was built:
#   - hash matches the pin: nothing is written (the pinned snapshot stands)
#   - hash differs, no --update: the script fails without writing anything
#     (schema drift must be a reviewed regeneration, never a silent one)
#   - hash differs, --update: the snapshot and the pin are rewritten; run
#     `make inventory generate` and review the generated diff
#   - no pin yet: the snapshot and the pin are written
# The download is validated (parses as JSON, carries __schema with Query and
# Mutation root types) and canonicalised (types, fields, arguments and enum
# values sorted by name, so a change in serving order is not drift) before
# any comparison - validate-and-fail-without-writing.
#
# Usage: bin/fetch-schema.sh [--update] [--url URL]

set -euo pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR="$( cd "$DIR/.." && pwd )"

SCHEMA_URL="https://backboard.railway.com/graphql/v2"
UPDATE="false"

while [[ $# -gt 0 ]]; do
  case $1 in
    --update)
      UPDATE="true"
      shift
      ;;
    --url)
      SCHEMA_URL="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: fetch-schema.sh [--update] [--url URL]"
      exit 1
      ;;
  esac
done

DOWNLOAD_DIR="$BASE_DIR/provider-dev/downloaded"
CONFIG_DIR="$BASE_DIR/provider-dev/config"
QUERY_FILE="$CONFIG_DIR/introspection_query.graphql"
TARGET_FILE="$DOWNLOAD_DIR/introspection_result.json"
PIN_FILE="$CONFIG_DIR/schema_pin.json"

mkdir -p "$DOWNLOAD_DIR" "$CONFIG_DIR"

RAW_FILE="$(mktemp)"
TMP_FILE="$(mktemp)"
BODY_FILE="$(mktemp)"
trap 'rm -f "$RAW_FILE" "$TMP_FILE" "$BODY_FILE"' EXIT

node -e "
const fs = require('fs');
const query = fs.readFileSync(process.argv[1], 'utf8').replace(/\s+/g, ' ').trim();
fs.writeFileSync(process.argv[2], JSON.stringify({ query }));
" "$QUERY_FILE" "$BODY_FILE"

echo "Fetching the introspection schema from $SCHEMA_URL"
curl -fsSL -X POST "$SCHEMA_URL" -H "Content-Type: application/json" --data @"$BODY_FILE" -o "$RAW_FILE"

# Validate and canonicalise before comparing or writing anything into the repo
node -e "
const fs = require('fs');
const doc = JSON.parse(fs.readFileSync(process.argv[1], 'utf8'));
if (Array.isArray(doc.errors) && doc.errors.length > 0) {
  console.error('Introspection returned errors: ' + doc.errors.map((e) => e.message).join('; '));
  process.exit(1);
}
const schema = doc.data ? doc.data.__schema : doc.__schema;
if (!schema || !Array.isArray(schema.types) || !schema.queryType || !schema.mutationType) {
  console.error('Response is not a GraphQL introspection result with Query and Mutation root types');
  process.exit(1);
}
const byName = (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
for (const t of schema.types) {
  for (const key of ['fields', 'inputFields', 'enumValues', 'interfaces', 'possibleTypes']) {
    if (Array.isArray(t[key])) t[key].sort(byName);
  }
  for (const f of t.fields || []) if (Array.isArray(f.args)) f.args.sort(byName);
}
schema.types.sort(byName);
if (Array.isArray(schema.directives)) {
  schema.directives.sort(byName);
  for (const d of schema.directives) if (Array.isArray(d.args)) d.args.sort(byName);
}
fs.writeFileSync(process.argv[2], JSON.stringify({ data: { __schema: schema } }, null, 1) + '\n');
const root = (n) => (schema.types.find((t) => t.name === n) || { fields: [] }).fields.length;
console.log('Introspection result OK: ' + schema.types.length + ' types, ' + root(schema.queryType.name) + ' queries, ' + root(schema.mutationType.name) + ' mutations');
" "$RAW_FILE" "$TMP_FILE"

HASH="$(node -e "
const crypto = require('crypto');
const fs = require('fs');
console.log(crypto.createHash('sha256').update(fs.readFileSync(process.argv[1])).digest('hex'));
" "$TMP_FILE")"

if [ -f "$PIN_FILE" ]; then
  PINNED_HASH="$(node -e "console.log(JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8')).sha256 || '')" "$PIN_FILE")"
  if [ "$HASH" = "$PINNED_HASH" ]; then
    echo "Schema matches the pin ($HASH); nothing written."
    exit 0
  fi
  if [ "$UPDATE" != "true" ]; then
    echo "Schema drift: served sha256 $HASH differs from the pinned $PINNED_HASH."
    echo "Nothing written. Re-run with --update (make refresh-schema) to accept the upstream change, then regenerate and review the diff."
    exit 1
  fi
  echo "Accepting schema change via --update."
fi

BYTES="$(wc -c < "$TMP_FILE" | tr -d ' ')"
FETCHED_AT="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

mv "$TMP_FILE" "$TARGET_FILE"

cat > "$PIN_FILE" <<EOF
{
  "url": "$SCHEMA_URL",
  "method": "POST introspection query (provider-dev/config/introspection_query.graphql), unauthenticated",
  "file": "provider-dev/downloaded/introspection_result.json",
  "fetchedAt": "$FETCHED_AT",
  "sha256": "$HASH",
  "bytes": $BYTES
}
EOF

echo "Pinned schema:"
cat "$PIN_FILE"
