# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this repo is

This repository generates and documents the `railway` provider for [StackQL](https://github.com/stackql/stackql). StackQL is a SQL-based query and provisioning engine for cloud and SaaS providers; this repo produces the provider artifacts that let StackQL query and manage Railway with SQL (for example `SELECT ... FROM railway.services.service_instances`, `INSERT INTO railway.projects.projects`, `EXEC railway.deployments.deployments.restart`).

Railway's public API is GraphQL only (`https://backboard.railway.com/graphql/v2`). The provider is generated from the API's introspection schema, snapshotted into `provider-dev/downloaded/` and pinned by hash in `provider-dev/config/schema_pin.json`. No token is needed at build time: introspection is served unauthenticated.

**Two method shapes, because the engine has two code paths** (NOTES.md finding 2):

- `SELECT` - the any-sdk native GraphQL read path (`x-stackQL-graphQL` on the operation: query template, response selection, cursor).
- `INSERT` / `UPDATE` / `DELETE` / `EXEC` - the REST path. The engine has no GraphQL write path, so a mutation method is a `POST` whose body `{"query": "mutation(...)", "variables": {...}}` is built by `request.transform`, and whose `response.transform` turns a GraphQL `errors` array (HTTP 200) into a statement failure.

If the engine gains a GraphQL write path (any-sdk issue 142, stackql issue 763), the transforms should be replaced by it - that is a generator change, not a redesign.

## What this repo does

Every stage is a `make` target (`make help` lists them); `make all` runs the full token-free chain (deps -> build -> test -> docs -> website):

1. **Fetch and pin** - `make fetch-schema` runs the introspection query and fails on drift against the pin without writing anything; `make refresh-schema` accepts the upstream change (the generated diff is the review)
2. **Inventory** - `make inventory` walks `Query`, the nested collections of objects returned by root gets, and `Mutation` (`provider-dev/scripts/lib/schema_walk.mjs`) into `provider-dev/config/operation_inventory.csv`: one row per candidate operation with its proposed service / resource / method / SQL verb, or a skip reason code
3. **Generate** - `make generate` emits `provider-dev/openapi/src/railway/v00.00.00000/` and `provider-dev/config/all_services.csv`. Every GraphQL document is validated against the pinned schema and every overloaded SQL verb is checked for an ambiguous signature before anything is written. It FAILS if a committed mapping row is removed, moves, is renamed or changes SQL verb; `make generate-accept` accepts (these break existing queries - review the CSV diff)
4. **Test** - `make test` = offline checks + mapping stability tests (`tests/offline_validation.mjs`, `tests/mapping_stability_test.mjs`), integration tests against the mock GraphQL server + every docs example + the reserved word sweep (`tests/integration/`), and the meta-route walk (`bin/test-meta-routes.cjs` via a local `stackql srv`)
5. **Live** - `make smoke` (pystackql, reads and one free project lifecycle), `make smoke-live` (the same against the PUBLISHED provider), `make smoke-read-only`, `make smoke-cleanup`, `make validate-live` (every generated SELECT against a self-provisioned fixture). These source `.env` (`RAILWAY_TOKEN`) and are never part of `make all`
6. **Docs** - `make docs` runs `@stackql/provider-utils` docgen (landing page content from `provider-dev/docgen/provider-data/headerContent{1,2}.txt`) then `website/scripts/sanitize-docs.mjs`; `make website` builds the Docusaurus 3.10 microsite (`showLastUpdateTime` on)
7. **Publish** - the provider dir is pushed to `providers/src/railway` in [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry) (PR against `dev`; `make publish-registry` stages it into a local checkout); the microsite publishes to https://railway-provider.stackql.io via GitHub Pages

The README documents each step. NOTES.md holds the evidence behind every design decision and limitation - read it before changing a mapping, a template or the policy.

## Key directories

```
provider-dev/downloaded/   pinned introspection snapshot (committed - the build input)
provider-dev/config/       schema_pin.json, introspection_query.graphql, operation_rules.json, selection_policy.json,
                           service_names.json, operation_inventory.csv, all_services.csv, live_validation.csv
provider-dev/scripts/      lib/schema_walk.mjs (walk, naming, selection sets, argument trees), lib/mapping_stability.mjs,
                           lib/template.mjs, build_inventory.mjs, generate_provider.mjs, check_mapping_stability.mjs,
                           validate_live.mjs
provider-dev/openapi/      generated provider output (regenerable, committed, never hand-edited)
provider-dev/docgen/       provider-data/headerContent{1,2}.txt for the docs landing page
tests/                     offline_validation.mjs, mapping_stability_test.mjs, lib/stackql.mjs, smoke_test.py,
                           integration/ (mock_railway_server.mjs, run_integration_tests.mjs, run_docs_examples.mjs,
                           run_reserved_names.mjs, probe.mjs)
website/                   Docusaurus microsite - provider identity in website/provider.js; docs/ generated by docgen + sanitize-docs.mjs
bin/                       fetch-schema.sh, start/stop/server-status.sh, test-meta-routes.cjs
```

## Conventions

- **Naming is mechanical, decisions are configuration.** Railway names mutations `<noun><Verb>`; the walk matches the longest known noun and the remainder is the method. `create` / `add` / `upsert` / `attach` -> INSERT, `update` / `rename` -> UPDATE, `delete` / `remove` / `destroy` / `detach` -> DELETE, anything else -> EXEC on the resource it acts on. An UPDATE or DELETE without a required key maps to EXEC. What the mechanics cannot decide is a rule in `operation_rules.json`
- **Lifecycle operations attach to selectable resources.** A new mutation that lands on a resource with no SELECT method should be given a rule that places it on the resource it acts on. 149 of 151 resources are selectable; keep it that way
- **Nested fields** with no root query are mapped through the `nested` rules (`project.services` -> `services.list` requiring `project_id`). The host's bare `id` is renamed after the host
- **Service assignment** is the ordered `rules` in `service_names.json` plus `overrides`; a resource that lands in `misc` fails generation
- **Columns, parameters and attributes are snake_case** via GraphQL aliases and variable names (`snake_case_aliases` is deliberately NOT set). Nested objects are JSON columns with snake_case keys. Input objects are flattened one level; JSON valued attributes keep the API's camelCase keys
- **Reserved words** (`sqlReservedColumnNames` in `selection_policy.json`) get a trailing underscore: `default_`, `references_`, `replace_`, `values_`. The reserved word sweep fails when a schema refresh brings a new one
- **Fields that fail statements** are excluded by policy with their evidence: the mechanical rule `skipNonNullReferencesWithNullableIds`, and `unstableFields` for observed cases. `make validate-live` is how they are found
- **Query text is single line** (the reader strips newlines without replacement) and generated GraphQL never contains `{{` or `}}` outside template actions
- **Auth** is a bearer token from `RAILWAY_TOKEN`, the Terraform provider's variable. There are no server variables, so `x-stackQL-envVar` has nothing to attach to (NOTES.md finding 11)

## Things to know

- `all_services.csv` is the stability contract for published resource names, keyed on the upstream GraphQL operation (the `tags` column). The baseline is the committed file (git HEAD). A mapping change is a breaking change: accept it explicitly, record it in NOTES.md, call it out in the release notes
- `DELETE` and `EXEC` without `/*+ SHOWRESULTS */` report success whatever the API answered (engine behaviour, pinned in the integration suite). Tests follow a DELETE with a read
- `UPDATE ... SET` values reach the provider as strings; the request template coerces Boolean / Int / Float / JSON. `SET flag = true` is rejected by the engine; write `'true'`
- `EXEC` only accepts `@params` declared as string, object or array, so EXEC-only methods declare Boolean and numeric attributes as strings
- A join cannot supply a required parameter from another resource's rows: it returns no rows and no error (engine behaviour for GraphQL methods, pinned in the integration suite, NOTES.md finding 16). Examples read across parents with an `IN` list and give every resource in a join its own parameters in `WHERE`. Assert rows, not the absence of an error
- The docs generator assumes REST semantics; `sanitize-docs.mjs` rewrites the DELETE / UPDATE / EXEC examples of mutation methods. If docgen output changes shape after a `@stackql/provider-utils` upgrade, check those passes first (the script reports how many examples it rewrote: 38 DELETE, 31 UPDATE, 118 EXEC)
- The API allows 1000 requests per hour on the Hobby plan (100 on Free). Live harnesses pace themselves and check the remaining budget before starting; a 429 in CI is a harness bug
- The mock server executes the incoming GraphQL documents against fixtures and enforces strict variable types. Its fixture ids are the ids the documentation examples use - change them together
- `.scratch/` is gitignored working space for probes

## Live account safety

- The live suites create projects named `stackql-smoke-<stamp>` and `stackql-validate-<stamp>` and delete them. Sweeps match the `stackql-smoke-` name prefix and nothing else. Never delete, modify or sweep anything a run did not create - the workspace holds real projects
- Nothing in the test suites may deploy: no `source` on a service create, no deploy / redeploy call, variables written with `skip_deploys`. A running deployment is billed
- Never run the live suites against a production workspace

## Writing conventions

- README and docs copy: measured, precise, no hyperbole. Third-person or passive framing for descriptive copy
- No em dashes; use `-`. No characters not on a QWERTY keyboard; use `->` for arrows
- Sample queries: realistic, runnable, snake_case columns, `json_extract` for nested objects. Every example in `headerContent2.txt` and the README must pass `tests/integration/run_docs_examples.mjs`

## Non-negotiables

1. Latest `@stackql/provider-utils` and `@stackql/pgwire-lite` (see `package.json` ranges; `make deps`), Docusaurus 3.10.x
2. The gitlab repo is the reference for a GraphQL-generated provider, the fivetran and supabase repos for Makefile, mapping stability, tests and smoke structure; sibling NOTES.md findings are reused, not re-derived - deviate only with a documented reason in NOTES.md
3. GraphQL text, parameters or request body, and response schema are generated from one walk by one code path - they can never drift
4. Deterministic scripts and policy config, never hand-edits to generated artifacts
5. Every regeneration is followed by `make test` before commit
6. Live suites clean up everything they create and only what they created
