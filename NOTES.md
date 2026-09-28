# NOTES

Evidence behind the provider's design and its documented limitations. Sources: the pinned introspection schema, `stackql/any-sdk` (`pkg/graphql/graphql.go`, `internal/anysdk/operation_store.go`, `internal/anysdk/schema.go`, `pkg/stream_transform/`), `stackql/stackql` (`internal/stackql/execution/mono_valent_execution.go`, `internal/stackql/primitivebuilder/`, `internal/stackql/parserutil/parser_util.go`), the mock-server integration suite (`tests/integration/`) and live runs against the Railway API. Engine baseline: stackql v0.12.718 (any-sdk v0.6.0-alpha01), 2026-09-28. Sibling findings are reused, not re-derived: gitlab (GraphQL method shape, reserved words), supabase (request transforms, UPDATE values as strings), clickhouse (rate limit as a design input).

## 1. API surface and build input

Railway's public API is GraphQL only, at `https://backboard.railway.com/graphql/v2`. The OpenAPI document the vendor publishes (`https://railway.com/openapi.json`) describes that one endpoint as `executeGraphQL` plus seven OAuth flow paths (`/oauth/auth`, `/oauth/token`, `/oauth/register`, `/oauth/device/auth`, `/oauth/me`, `/oauth/request`, the OIDC discovery document). It carries no resource operations, so there is nothing to split and normalize: the OAuth paths are an interactive user-agent flow (the supabase `oauth_user_agent_flow` precedent) and are not part of the provider.

The build input is the introspection result. The endpoint answers the standard introspection query unauthenticated, and the unauthenticated and authenticated answers are byte identical (measured). `bin/fetch-schema.sh` posts `provider-dev/config/introspection_query.graphql`, canonicalises the result (types, fields, arguments and enum values sorted by name, so serving order is not drift) and pins it by hash in `provider-dev/config/schema_pin.json`. The copy in the Railway CLI repository (`src/gql/schema.json`) lags the served schema (158 queries and 233 mutations against 168 and 261), so the served schema is the source.

The served schema does not pass graphql-js schema validation: the deprecated `Team.id` implements the non-deprecated `Node.id`. The schema is loaded with `assumeValid` so that generated documents can still be validated against it.

Pinned schema (2026-09-28): 674 types, 168 queries, 261 mutations, 13 subscriptions (not mappable to SQL).

## 2. Two method shapes

The engine has a GraphQL read path and no GraphQL write path (any-sdk issue 142 and stackql issue 763 are open; the gitlab provider is read-only for this reason). This provider maps mutations through the REST path instead.

| | SELECT | INSERT / UPDATE / DELETE / EXEC |
|---|---|---|
| Engine path | native GraphQL reader (`x-stackQL-graphQL`) | REST (`POST` with a JSON body) |
| Inputs | WHERE values spliced into the query text by a Go template | real GraphQL variables: `{"query": "mutation(...)", "variables": {...}}` built by `request.transform` |
| Parameters | `parameters` (`in: query`), never sent as a query string | request body attributes, addressed by bare name (`requestBodyTranslate: naive`) |
| Rows | `responseSelection` | `response.objectKey` (`RETURNING`) |
| Errors in HTTP 200 | failed by the reader | failed by the response transform (finding 4) |
| Pagination | `page_info` cursor | none |

Every operation has its own path key, `/graphql/v2?__resource=<resource>&__method=<method>`, because OpenAPI allows one operation per path and verb. The query router matches on the query pairs. Nothing of it reaches the wire: the GraphQL reader clears the query string, and the mutation methods carry `requestTranslate: drop_double_underscore_params` (the digitalocean precedent). Asserted in the integration suite for both shapes (wire path is exactly `/graphql/v2`).

snake_case is produced in the GraphQL text itself, with no engine-side casing: selections alias every field (`created_at: createdAt`) at every depth, and mutation variables are named in snake_case (`$workspace_id`) and bound to the API's names in the document (`workspaceId: $workspace_id`). Input objects are flattened into variables one level (`projectCreate(input: { name: $name, ... })`), so `INSERT INTO ... (name, workspace_id)` needs no `input` wrapper. A variable that is not supplied is omitted by GraphQL (the input field is treated as absent, not null), so optional attributes need no template logic beyond leaving them out of `variables`. Asserted: `variables` carries only the supplied values.

## 3. Typed variables

`INSERT` and `EXEC @@json` values arrive typed; `UPDATE ... SET` values arrive as JSON strings (supabase finding 14, re-measured: `SET is_public = 'true'` sends `"true"`, and `SET is_public = true` is rejected by the engine with `update statement RHS of type 'sqlparser.BoolVal' not yet supported`). GraphQL variable coercion is strict - a string for a `Boolean` or `Int` variable is an error - so the request template coerces by declared type: `toBool` / `toInt` when the value is a string, raw emission of string values for `Float` and for JSON valued variables (input objects, lists, `JSON` scalars), `toJson` otherwise. The mock enforces the same strictness, so the coercion is tested rather than assumed. `UPDATE` examples in the docs quote every `SET` value.

## 4. GraphQL errors arrive with HTTP 200

Measured live: a runtime failure (unknown id, not authorized) answers HTTP 200 with `{"errors": [...], "data": null}`; only a document that fails validation answers 400. The REST path reads HTTP 200 as success.

The response transform of every mutation method therefore fails deliberately when `errors` is present. The template functions available offer no way to raise; `getRegexpFirstMatch` returns an error that quotes its input, so the transform calls it with the API's messages and a pattern that cannot match. The statement fails with:

```
error processing response: failed to transform: ... no match found for pattern "^(no_graphql_errors)$" in input "graphql error: Project not found"
```

What the engine does with that depends on the verb (`mono_valent_execution.go`: a response processing error is returned unless `isSkipResponse && isMutation`):

| Statement | Error surfaced |
|---|---|
| `SELECT` | yes (`graphql error: ...`, the reader's own check) |
| `INSERT`, `INSERT ... RETURNING` | yes |
| `UPDATE`, `UPDATE ... RETURNING` | yes |
| `EXEC /*+ SHOWRESULTS */` | yes (any method, including delete methods) |
| `DELETE` | no - `delete.go` builds the executor with skip-response set; the statement reports success |
| `DELETE ... RETURNING` | no message; returns `null` |
| `EXEC` without `SHOWRESULTS` | no - `exec.go` sets skip-response from the hint |

The two "no" rows are pinned in the integration suite as observed engine behaviour, so an engine change shows up as a test change. The smoke suite follows every `DELETE` with a read that proves the object is gone. When the engine gains a GraphQL write path with error selection, the transform should be replaced by it.

## 5. Live API behaviour

- **Tokens**: account and workspace tokens are bearer tokens. A project token is sent as `Project-Access-Token` and cannot be used; `projectToken` (the query that introspects one) is skip-coded. The Terraform provider reads `RAILWAY_TOKEN` as an account or workspace token; the Railway CLI uses the same name for a project token and `RAILWAY_API_TOKEN` for the others. Terraform parity wins.
- **Rate limit**: 100 (Free), 1000 (Hobby), 10000 (Pro) requests per hour; `RateLimit-Policy`, `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset` on every authenticated response, `Retry-After` with a 429. Test harnesses pace and check the remaining budget before starting.
- **Volumes are provisioned and deleted asynchronously**: the volume instance appears a few seconds after `volumeCreate`. `volumeDelete` is a soft delete - the volume stays listed and its instance gets `isPendingDeletion: true` with `deletedAt` 48 hours ahead.
- **`projectMembers` is empty for a workspace owned project**: access comes through the workspace.
- **Empty objects are free**: a project, an environment, a service without a source, variables, a service domain and a project token consume no metered resource. A service with a source deploys; nothing in the test suites creates one.
- **Project deletion is soft, and creation is throttled**: `projectDelete` sets `deletedAt`; the project leaves the default listing at once and stays visible with `includeDeleted` until it is purged. A workspace may create one project per 30 seconds (`You are creating projects too quickly`), so a harness that repeats a project create waits that long.
- **A request occasionally gets no answer**: three statements in about 250 ended in stackql's 45 second API timeout (`context deadline exceeded`), on a create and on reads, while direct calls answered in under a second throughout. A create that times out may have happened (the project existed). The smoke harness repeats safe statements and compensates creates (module docstring).

## 6. EXEC parameters are type checked against a short list

`EXEC ... @name = value` is checked by `CheckColUsagesAgainstTable` against the attribute's declared type, and `providerTypeConditionIsValid` (any-sdk `schema.go`) knows `string`, `object`, `array` (a SQL string literal) and `int` / `int32` / `int64` (an integer literal). OpenAPI's `boolean`, `integer` and `number` are not in the list, so an attribute declared with one of them is rejected whatever is supplied (`SHOW key = '@favorite' does NOT match SQL type 'StrVal'`), and `true` is not a literal the EXEC grammar accepts at all.

Resolution: on methods that are reached through `EXEC` alone (SQL verb `exec`), Boolean, Int and Float attributes are declared as strings and coerced by the request template (`@favorite = 'true'` sends `true`). Methods with a SQL verb keep their real types, which `INSERT` needs. To run one of those through `EXEC` with a typed value, the whole body goes in `@@json`, after the required attributes and without a comma: `EXEC ... @service_id = '...', @environment_id = '...' @@json = '{"service_id": "...", "environment_id": "...", "num_replicas": 2}'`. A lone `@@json` does not satisfy a required attribute, and `@params` are not merged into it. All three forms are asserted in the integration suite.

## 7. Reserved words

Names the stackql parser or the SQLite backend rejects as bare identifiers cannot be used in SQL at all (quoting does not rescue them - gitlab finding 10), so they carry a trailing underscore. `sqlReservedColumnNames` in `selection_policy.json` holds the gitlab list (`all`, `default`, `exists`, `from`, `group`, `limit`, `primary`, `release`, `to`) plus three measured here: `references` (SQLite stage), `replace` and `values` (parser). Four names in the current schema are affected: `default_`, `references_`, `replace_`, `values_`.

`tests/integration/run_reserved_names.mjs` puts every column, parameter and body attribute name of the generated provider (690) to the engine, so a schema refresh that introduces a reserved name fails in the suite. `action`, `key`, `mode`, `plan`, `provider`, `query`, `resources`, `status`, `text`, `timestamp` and `variables` are accepted.

## 8. Relay connections are reshaped

Railway connections answer `edges { node }` and `pageInfo` only (no `nodes`). The engine resolves columns from an object key of the form `$.data.projects.edges[*].node` but rejects the dotted form (`could not resolve json schema for key`); the docs generator resolves the dotted form but not `[*]` with a suffix (the Fields table comes out empty). No single key serves both, so list methods carry a response transform that reshapes the connection to `{ nodes: [...], pageInfo }`. Schema, object key (`$.data.projects.nodes`) and response selection (`$.data.projects.nodes[*]`) then describe one document, and the cursor paths, which also read the transformed document, keep working because `pageInfo` keeps its place.

## 9. Fields that fail the whole statement

The engine fails a statement on any GraphQL error, so one field the caller cannot read, or one resolver that cannot resolve, breaks every query that selects it.

- **Mechanical rule** (`skipNonNullReferencesWithNullableIds`): a nested reference declared non-null whose own id field on the same type is nullable is never selected; the id column carries the reference. Six fields: `Deployment.service`, `Event.project`, `Variable.environment`, `Variable.plugin`, `Variable.service`, `VolumeInstance.service`. Observed failing with `Problem processing request`: `Variable.service` once the environment holds a shared variable, `Variable.plugin`, `VolumeInstance.service` once the volume is deleted. The failures only show when there is a row in that state, which is why the rule is structural rather than a list of observations.
- **Observed** (`unstableFields`, each with its observation): `User.platformFeatureFlags` (Not Authorized for an account token), `EnvironmentPatch.environment` (fails on the synthetic staged patch, id `<empty>`), `Project.members` and `Project.workspace` (`Project not found` for every project deleted within its grace period, which made `include_deleted = true` unusable; `project_members` serves the members and `workspace_id` joins to `workspaces`).

`make validate-live` is the evidence: it runs every generated SELECT it has parameters for against a fixture project it creates and deletes. 2026-09-28: 119 pass; 15 fail on the root field for the sample values supplied (unknown invite code, no linked Heroku account, no registered domain, cloud agents not enabled) - entitlement and "no such object" answers, not field failures; 40 have no parameter values (objects the fixture does not contain). The report is `provider-dev/config/live_validation.csv`.

## 10. Mapping decisions

Railway names mutations `<noun><Verb>` (`projectCreate`, `deploymentRestart`, `serviceInstanceRedeploy`). The walk matches each mutation against the nouns the queries define, longest first, and the remainder is the method: `create` / `add` / `upsert` / `attach` map to INSERT, `update` / `rename` to UPDATE, `delete` / `remove` / `destroy` / `detach` to DELETE, anything else to EXEC on the resource it acts on. An UPDATE or DELETE without a required key is an action on the caller's own context and maps to EXEC (`preferences.update`, `current_user.delete`). Decisions the mechanics cannot make are rules in `provider-dev/config/operation_rules.json`.

- **396 of 491 candidate operations are mapped**: 174 SELECT, 35 INSERT, 31 UPDATE, 38 DELETE, 118 EXEC, across 151 resources in 15 services. 149 resources are selectable. The two that are not (`access_group_members`, `access_group_projects`) have mutations only: their rows are connections on `AccessGroup`, which is itself reached through a workspace (two levels of nesting), and there is no root query for either. A nested connection with no rule and no other source fails the inventory as `nested_connection_not_mapped` (none at present), because connections are never selected inline.
- **Nested fields**: several collections have no root query (the services and volumes of a project, the service instances of an environment, the workspaces of the user). Those named in the `nested` rules become list methods that wrap the host get (`project(id: ...) { services(...) }`), with the host's `id` renamed after the host (`project_id`). Single objects can be mapped the same way (`workspace.customer` -> `billing.customers`, `serviceInstance.edgeConfig` -> `services.service_edge_configs`), which is what makes the billing and edge configuration mutations land on selectable resources. Other nested lists stay available as JSON columns on the host row.
- **Wrappers**: `httpMetrics`, `projectWorkspaceMembers`, `apiToken` and others return an object around the rows; the `unwrap` rules name the field holding them, and the cursor where the wrapper pages (`cloudAgentTasks` with `nextCursor`, `projectServiceUsage` with its own page info and a documented maximum of 50).
- **Overloaded verbs** are told apart by required parameters, checked at generation: `projects` has `get` (`id`), `list`, `list_by_ids` (`ids`); `variables` has `upsert` and `upsert_collection`. `template` takes four optional identifiers and would be indistinguishable from `list`, so `code` is required on `templates.get`. The two egress gateway previews have the signature of `egress_gateways.list` and are resources of their own.
- **`upsert` is INSERT**: `variableUpsert` creates or replaces; the Terraform `railway_variable` resource is the same call.

Skip reason codes (95 operations):

| Code | Count | Meaning |
|---|---|---|
| `deprecated` | 29 | marked deprecated in the schema (plugins, teams, `tcpProxyCreate`, ...) |
| `inline_json_column` | 21 | nested list available as a JSON column on the host row |
| `interactive_auth_flow` | 15 | login sessions, email change, two factor enrolment, recovery codes, SSH signup |
| `served_by_root_query` | 12 | nested collection that a root query already serves |
| `client_telemetry` | 5 | CLI and agent event tracking |
| `internal_development_surface` | 3 | `devNewLandingTarget*` |
| `served_by_another_host` | 3 | nested collection already mapped from another host (`workspaceByCode` next to `workspace`) |
| `legal_consent_flow` | 2 | `fairUseAgree`, `userTermsUpdate` |
| `multipart_upload` | 1 | `jobApplicationCreate` takes an `Upload` |
| `platform_admin_only` | 1 | `adminVolumeInstancesForVolume` |
| `project_token_auth_only` | 1 | `projectToken` |
| `union_typed_field` | 1 | `projectInvitation` returns a union |
| `website_content` | 1 | `changelogBlockImage` |

## 11. Environment variables

`RAILWAY_TOKEN` is the only variable the Terraform provider reads, and the only one this provider reads. `x-stackQL-envVar` attaches to OpenAPI server variables (any-sdk `server.go`), and this API has none: the host is fixed and every identifier travels inside the GraphQL document. There is therefore no workspace, project or environment default to map. The Railway CLI's `RAILWAY_PROJECT_ID`, `RAILWAY_ENVIRONMENT_ID` and `RAILWAY_SERVICE_ID` would be the names to use if the engine gains environment defaults for ordinary parameters.

## 12. Pagination and pushdown

- Connections use the any-sdk `page_info` strategy with `first: 100` (gitlab finding 2). Traversal is bounded by `--http.response.pageLimit` (default 20). SQL `LIMIT` is not pushed into `first:`; with cursor traversal a small page would multiply requests rather than bound them.
- The log and trace reads take a `limit` argument and no cursor; SQL `LIMIT` is pushed down to it (`{{ if .limit }}limit: {{ .limit }}{{ end }}`). `limit` is not declared as a parameter because it is not addressable in a WHERE clause. Asserted with and without `LIMIT`.
- Every scalar or enum argument is a typed parameter: strings quoted, enums, numbers and Booleans bare (`false` and `0` render; only an empty string is treated as absent). Input object arguments are flattened one level (`deployments WHERE project_id = ...` renders `input: { projectId: "..." }`). Lists and input objects nested deeper are passed through as GraphQL literals (`measurements = '[CPU_USAGE]'`, `status = '{in: [FAILED]}'`), since the reader has no variables and its templates have no functions.

## 13. Selection policy

`selection_policy.json` governs what is selected: every scalar and enum field of the node, nested objects and lists of objects one level deep as JSON columns (snake_case keys), connections never inline. Large serialised documents (`EnvironmentConfig`, `JSON`, `DeploymentMeta`, ...) are selected on the node but not inside nested objects. `expandNested` selects one level deeper where the value objects beneath carry the data the resource exists for: `CustomDomain.status` (the DNS records) and `ServiceInstance.domains`.

## 14. Docs generator

The docs generator documents REST providers: WHERE keys are path and query parameters, and a body goes to EXEC as `@@json`. For the mutation methods here that produces a `DELETE` without a WHERE clause, an `UPDATE` that sets its own key, and `EXEC` examples the engine rejects (finding 6). `website/scripts/sanitize-docs.mjs` rewrites those sections from the provider documents and adds the missing rows to the Methods and Parameters tables. The statement forms it writes are asserted in the integration suite, and every example on the landing page and in the README runs against the mock in `tests/integration/run_docs_examples.mjs`.

## 15. Smoke suite cost

`make smoke` creates one project, a second environment, one service without a source, variables, a service domain, a volume and a project token, and deletes the project. Nothing deploys, so nothing is billed for compute. The volume exists empty for about a minute; at $0.15 per GB per month that is a small fraction of a cent. A full run is about 80 statements and about 80 API requests (measured: 79 statements, 78 requests); a read-only run is 18 statements.

## Pending

- **Published provider**: `make smoke-live` verifies the provider once it is in the public registry.
- **Featured image**: `website/static/img/stackql-railway-provider-featured-image.png` is a copy of the generic StackQL image.
- **Workspace token**: the live runs used an account token. A workspace token cannot read `account.current_user` (documented by the vendor); the rest is expected to behave the same and has not been measured.
