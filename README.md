# `railway` provider for [`stackql`](https://github.com/stackql/stackql)

This repository generates and documents the `railway` provider for StackQL, enabling SQL-based query and provisioning operations against the [Railway](https://railway.com) public API - workspaces, projects, environments, services and service instances, deployments and their lifecycle, variables, domains, volumes and backups, usage and billing, logs, metrics and templates.

Railway's public API is GraphQL only. The provider is generated from the API's introspection schema: queries become `SELECT`, and mutations become `INSERT`, `UPDATE`, `DELETE` or `EXEC`.

Documentation: [railway-provider.stackql.io](https://railway-provider.stackql.io)

## Design Principles

- **Generated from the served schema** - the API answers the standard introspection query without a token. The result is canonicalised, snapshotted into `provider-dev/downloaded/` and pinned by hash in `provider-dev/config/schema_pin.json`. A refresh is a reviewed diff (`make refresh-schema`), never a silent regeneration.
- **Queries and mutations, two method shapes** - `SELECT` methods use the engine's native GraphQL read path. The engine has no GraphQL write path, so mutation methods are `POST` operations whose JSON body, `{"query": "mutation(...)", "variables": {...}}`, is built by a request transform from the statement's values. See [NOTES.md](NOTES.md) finding 2.
- **Lifecycle operations belong to their resource** - `deploymentRestart` is `EXEC railway.deployments.deployments.restart`, `serviceInstanceRedeploy` is `EXEC railway.services.service_instances.redeploy`. 149 of the 151 resources are selectable.
- **snake_case surface** - columns, parameters and request attributes are snake_case, produced in the GraphQL text itself (field aliases, variable names), with no engine-side aliasing.
- **Relay pagination** - connections are traversed with the any-sdk `page_info` cursor strategy, 100 rows per request.
- **Predicate pushdown** - every argument of a query field is a parameter. Input object arguments are flattened (`deployments WHERE project_id = ...`), and SQL `LIMIT` is pushed down on the log and trace reads.
- **Stable operation mapping** - `provider-dev/config/all_services.csv` records which GraphQL operation backs every `service.resource.method`. Generation fails if a committed mapping disappears, moves, or changes SQL verb, unless the change is accepted explicitly.

## Authentication

Authentication uses a Railway account token or workspace token, supplied as a bearer token in the `RAILWAY_TOKEN` environment variable - the variable the Terraform `railway` provider reads:

```bash
export RAILWAY_TOKEN=<your-token>
```

Create a token under [Account settings, Tokens](https://railway.com/account/tokens). A project token is sent in a different header and does not work with this provider. Note that the Railway CLI uses the name `RAILWAY_TOKEN` for a project token; here it holds an account or workspace token, as it does for Terraform.

## Examples

```sql
SELECT id, name, plan
FROM railway.workspaces.workspaces;
```

```sql
SELECT id, name, created_at
FROM railway.projects.projects
WHERE workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40';
```

```sql
SELECT service_name, region, num_replicas,
  json_extract(latest_deployment, '$.status') AS latest_deployment_status
FROM railway.services.service_instances
WHERE environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28';
```

```sql
INSERT INTO railway.projects.projects (name, workspace_id)
SELECT 'my-project', '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40'
RETURNING id, name;
```

```sql
INSERT INTO railway.variables.variables (project_id, environment_id, service_id, name, value, skip_deploys)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28', 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53', 'LOG_LEVEL', 'info', true;
```

```sql
EXEC /*+ SHOWRESULTS */ railway.deployments.deployments.restart @id = 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65';
```

Every example here and on the docs landing page runs against the mock server in the test suite.

## Prerequisites

To build or test the provider you will need:

1. Node.js 20+ and GNU make (Linux, macOS or WSL)
2. A `stackql` binary - `$STACKQL`, `./stackql`, or on `PATH` (see [StackQL](https://github.com/stackql/stackql))
3. Python 3 for the smoke suite (a venv with `pystackql` is created on demand)
4. yarn and Node 22.12+ for the docs microsite
5. A Railway account or workspace token for the live suites (see `.env.example`); `make all` needs none

```bash
make deps
```

`make help` lists every target. `make all` runs the whole token-free chain: deps, pipeline, tests, docs, website build.

## 1. Fetch and Pin the Schema (`make fetch-schema`)

Posts the introspection query (`provider-dev/config/introspection_query.graphql`), canonicalises the result and compares its hash with `provider-dev/config/schema_pin.json`. A match writes nothing; a mismatch fails without writing. To accept an upstream change:

```bash
make refresh-schema
```

This rewrites the snapshot and the pin; the regenerated inventory and provider are then the reviewed diff.

## 2. Build the Operation Inventory (`make inventory`)

Walks the pinned schema (`provider-dev/scripts/lib/schema_walk.mjs`, the same code path the generator uses) and writes `provider-dev/config/operation_inventory.csv`: one row per candidate operation - every field on `Query`, every nested collection on an object a root query returns, every field on `Mutation` - with arguments, return shape, proposed service, resource, method and SQL verb, and a reason code where it is not mapped.

Current inventory: 491 candidate operations, 396 mapped, 95 skipped with a reason code ([NOTES.md](NOTES.md) finding 10).

Mapping decisions are configuration, never edits to generated files:

| File | Holds |
|---|---|
| `provider-dev/config/operation_rules.json` | naming overrides, nested collections to map, wrapper unwrapping, skip reason codes |
| `provider-dev/config/selection_policy.json` | what is selected: nesting depth, field exclusions with their evidence, reserved words, scalar types |
| `provider-dev/config/service_names.json` | the service split: ordered rules on the resource name, overrides, descriptions |

## 3. Generate the Provider (`make generate`)

Emits one service document per service into `provider-dev/openapi/src/railway/v00.00.00000/services/`, plus `provider.yaml`, and rewrites `provider-dev/config/all_services.csv`. Every generated GraphQL document is parsed and validated against the pinned schema before anything is written, and overloaded SQL verbs are checked for ambiguous signatures.

| Service | Resources | Examples |
|---|---|---|
| `projects` | 13 | `projects`, `project_members`, `project_invitations`, `project_tokens` |
| `environments` | 8 | `environments`, `environment_patches`, `environment_staged_changes`, `environment_change_sets` |
| `services` | 9 | `services`, `service_instances`, `service_instance_limits`, `service_edge_configs` |
| `deployments` | 6 | `deployments`, `deployment_triggers`, `deployment_events`, `deployment_instances` |
| `variables` | 3 | `variables`, `environment_variables`, `variables_for_service_deployment` |
| `networking` | 17 | `service_domains`, `custom_domains`, `tcp_proxies`, `private_networks`, `egress_gateways`, `railway_domains` |
| `storage` | 12 | `volumes`, `volume_instances`, `volume_instance_backups`, `buckets` |
| `billing` | 6 | `usage`, `estimated_usage`, `customers`, `project_service_usage` |
| `observability` | 17 | `build_logs`, `deployment_logs`, `http_logs`, `metrics`, `traces`, `events`, `notification_rules` |
| `workspaces` | 15 | `workspaces`, `workspace_members`, `access_groups`, `trusted_domains`, `audit_logs` |
| `account` | 11 | `current_user`, `api_tokens`, `api_token_workspaces`, `sessions`, `ssh_public_keys` |
| `templates` | 6 | `templates`, `template_search`, `template_services` |
| `integrations` | 12 | `integrations`, `github_repos`, `github_repo_branches`, `heroku_apps` |
| `platform` | 7 | `regions`, `platform_status`, `signals` |
| `agents` | 9 | `cloud_agents`, `cloud_agent_tasks`, `sandboxes` |

A generation that removes, moves or changes the SQL verb of a committed mapping fails without writing:

```
Operation mapping changed against the committed provider-dev/config/all_services.csv:
  ! moved resource: Mutation.projectCreate projects.projects.create -> projects.project_factory.create
These are breaking changes for existing queries. ...
```

Accept a deliberate change with `make generate-accept`, record it in NOTES.md and call it out in the release notes. `make check-mappings` runs the same comparison on its own.

### Live validation (`make validate-live`)

Runs every generated `SELECT` it has parameters for against the live API and reports failing fields. The engine fails a whole statement on any GraphQL error, so a field the caller cannot read has to be excluded by policy. The run creates an empty fixture project of its own and deletes it; nothing is deployed. It needs a token and is not part of `make all`.

## 4. Test (`make test`)

1. **Offline validation** (`make test-offline`) - invariants of the generated documents (snake_case surface, resolvable references, complete methods, agreement with `all_services.csv`), `SHOW` / `DESCRIBE` against the local file registry, and the mapping stability check's own tests.
2. **Integration tests** (`make test-integration`) - the generated provider against a mock Railway GraphQL server that executes the incoming documents: pagination, parameter templating, nested collections, response transforms, `LIMIT` pushdown, typed variables, `RETURNING`, error surfacing per verb; then every documentation example; then the reserved word sweep over every column, parameter and attribute name.
3. **Meta-route tests** (`make test-meta`) - starts a local `stackql srv` and walks every service, resource and method.
4. **Smoke tests** (`make smoke`) - `tests/smoke_test.py` (pystackql) against a real account: read smokes, then one project lifecycle modelled on the resources the Terraform provider documents.

| Target | Runs |
|---|---|
| `make smoke` | the locally generated provider: reads and the project lifecycle |
| `make smoke-live` | the same against the published provider in the StackQL registry |
| `make smoke-read-only` | read smokes only |
| `make smoke-cleanup` | sweeps `stackql-smoke-*` projects and exits |

The smoke suite creates one project named `stackql-smoke-<stamp>` and deletes it. It deploys nothing: the service has no source and variables are written with `skip_deploys`. The one metered object is an empty volume that exists for about a minute (under $0.01). It checks the API's remaining hourly budget before it starts. Never run it against a production workspace.

## 5. Publish

Copy `provider-dev/openapi/src/railway` to `providers/src/railway` in a feature branch of [`stackql-provider-registry`](https://github.com/stackql/stackql-provider-registry) (`make publish-registry` stages it into a local checkout), raise a PR against `dev`, then verify against the dev registry:

```bash
export DEV_REG='{ "url": "https://registry-dev.stackql.app/providers" }'
stackql --registry="${DEV_REG}" exec "REGISTRY PULL railway"
make smoke-live
```

## 6. Generate Web Docs (`make docs website`)

`website/` is a Docusaurus 3.10 microsite following the shared provider-docs architecture: navbar, footer, theme and plugin configuration come from [`stackql/docusaurus-config`](https://github.com/stackql/docusaurus-config), vendored into `.shared-config/` at build time. Every page carries its last update time (`showLastUpdateTime`).

1. Author the landing page content in `provider-dev/docgen/provider-data/headerContent1.txt` and `headerContent2.txt`.
2. `make docs` - runs `@stackql/provider-utils` docgen into `website/docs/`, then `website/scripts/sanitize-docs.mjs`, which escapes description content MDX would parse as JSX and rewrites the `DELETE`, `UPDATE` and `EXEC` examples of the mutation methods ([NOTES.md](NOTES.md) finding 14).
3. `make website` - `yarn install && yarn build` (needs Node 22.12 or newer and network access to GitHub for the shared config). `make website-start` runs the dev server.

The site publishes via GitHub Pages; DNS: `railway-provider.stackql.io` CNAME -> `stackql.github.io.`

## 7. CI

`.github/workflows/build-and-test.yml`: schema pin verification (warns on drift), inventory and generation with the mapping stability gate and a generation-drift gate, offline, integration and meta-route tests, and docs generation on every push and PR; a secret-gated live smoke job (`RAILWAY_TOKEN`); and a weekly schema-drift job that opens an issue when the served schema moves.

## Known Limitations

- `DELETE`, and `EXEC` without the `SHOWRESULTS` hint, report success whatever the API answered, because the API reports failures inside an HTTP 200 and the engine does not read the response of those statements. Use `EXEC /*+ SHOWRESULTS */` or read the object back.
- `UPDATE` values are written as strings (`SET pr_deploys = 'true'`); the provider converts them to the API's types.
- Boolean and numeric attributes of `EXEC` methods are passed as strings (`@favorite = 'true'`).
- Arguments that take a list or a nested input object are written as GraphQL literals (`measurements = '[CPU_USAGE]'`).
- Any GraphQL error fails the whole statement, and a `get` on an object that does not exist is an error, not an empty result.
- List traversal is bounded by `--http.response.pageLimit` (default 20 requests of 100 rows).
- Subscriptions (log and event streams) have no SQL form and are not mapped.
- A project token cannot be used.

See [NOTES.md](NOTES.md) for the evidence behind each of these.

## Repository Layout

```
provider-dev/
  downloaded/            # pinned introspection snapshot (the build input)
  config/                # schema pin, operation rules, selection policy, service split,
                         # operation_inventory.csv, all_services.csv, live_validation.csv
  openapi/src/railway/   # generated provider output
  scripts/               # lib/schema_walk.mjs, build_inventory.mjs, generate_provider.mjs,
                         # check_mapping_stability.mjs, validate_live.mjs
  docgen/provider-data/  # headerContent1.txt, headerContent2.txt
bin/                     # fetch-schema.sh, server lifecycle scripts, test-meta-routes.cjs
tests/
  offline_validation.mjs
  mapping_stability_test.mjs
  integration/           # mock GraphQL server, row-level assertions, docs examples, reserved word sweep, probe
  smoke_test.py          # pystackql smoke suite (--live for the published provider)
website/                 # Docusaurus microsite
Makefile                 # every stage as a target; make all
```

## License

MIT
