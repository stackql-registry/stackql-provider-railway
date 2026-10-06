---
title: railway
hide_title: false
hide_table_of_contents: false
keywords:
  - railway
  - stackql
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, provision and manage Railway projects, environments, services, deployments, variables, domains and volumes using SQL
custom_edit_url: null
image: /img/stackql-railway-provider-featured-image.png
id: 'provider-intro'
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';

Query, provision and manage Railway resources using SQL: projects, environments, services and service instances, deployments and their lifecycle, variables, domains, volumes, usage and logs. The provider is generated from the Railway public GraphQL API schema.


:::info[Provider Summary] 

total services: __15__  
total resources: __151__  
source project: __[stackql-provider-railway](https://github.com/stackql-registry/stackql-provider-railway)__  

:::

See also:
[[` SHOW `]](https://stackql.io/docs/language-spec/show) [[` DESCRIBE `]](https://stackql.io/docs/language-spec/describe)  [[` REGISTRY `]](https://stackql.io/docs/language-spec/registry)
* * *

## Installation

To pull the latest version of the `railway` provider, run the following command:

```bash
REGISTRY PULL railway;
```
> To view previous provider versions or to pull a specific provider version, see [here](https://stackql.io/docs/language-spec/registry).

## Authentication

The following system environment variable is used for authentication by default:

- <CopyableCode code="RAILWAY_TOKEN" /> - a Railway account token or workspace token, sent as a bearer token (create one under <a href="https://railway.com/account/tokens">Account settings, Tokens</a>). This is the same variable the Terraform `railway` provider reads.

The variable is sourced at runtime (from the local machine or as a CI variable/secret).

| Token | Works with this provider | Scope |
|---|---|---|
| Account token | yes | every workspace and project of the account |
| Workspace token | yes | one workspace (`railway.account.current_user` is not readable with it) |
| Project token | no | sent in a different header (`Project-Access-Token`), used by the Railway CLI |

<details>

<summary>Using a different environment variable</summary>

To use a different environment variable (instead of the default), use the `--auth` flag of the `stackql` program.  For example:

```bash

AUTH='{ "railway": { "type": "bearer", "credentialsenvvar": "YOUR_RAILWAY_TOKEN_VAR" }}'
stackql shell --auth="${AUTH}"

```
or using PowerShell:

```powershell

$Auth = "{ 'railway': { 'type': 'bearer', 'credentialsenvvar': 'YOUR_RAILWAY_TOKEN_VAR' }}"
stackql.exe shell --auth=$Auth

```
</details>

## Rate limits

Railway limits API requests per hour by plan: 100 (Free), 1000 (Hobby), 10000 (Pro). Every statement is at least one request, and a list that spans several pages is one request per 100 rows. A parameter given as an `IN` list makes one request per value.

## Working with the provider

The provider is generated from Railway's GraphQL schema. Queries are `SELECT`; mutations are `INSERT`, `UPDATE`, `DELETE`, or `EXEC` for lifecycle operations such as `redeploy`, `restart` and `rollback`, which are methods of the resource they act on.

- **Identifiers** are parameters: `WHERE id = '...'` reads one project, `WHERE project_id = '...'` lists the services of a project, `WHERE environment_id = '...'` lists the service instances of an environment. `SHOW METHODS IN railway.services.services` lists the methods of a resource and what each requires.
- **Columns are snake_case** (`created_at`, `is_public`). Nested objects are JSON columns read with `json_extract`. Four names that are SQL reserved words carry a trailing underscore: `default_`, `references_`, `replace_`, `values_`.
- **Filters are pushed down** into the API request. An argument that takes a list is written as a list literal: `measurements = '[CPU_USAGE, MEMORY_USAGE_GB]'` for enum values, `ids = '["...", "..."]'` for strings.
- **Several parents in one query** are read with an `IN` list on the parameter: `WHERE project_id IN ('...', '...')` makes one request per value.
- **Joins** are performed by the SQL engine on the rows each resource returns, so every resource in a join takes its own parameters in `WHERE`. A join does not supply a required parameter from the rows of another resource (`ON e.project_id = p.id` with no `project_id` in `WHERE` returns no rows).
- **`LIMIT` is pushed down** on the log and trace resources, which take a row limit.
- **`RETURNING`** returns the created or updated object. A mutation that answers with a single value (a token, a flag) returns it as the `result` column.
- **JSON valued attributes** (a service `source`, a variable collection) are written as JSON text; their keys keep the API's camelCase names.

:::note Errors on DELETE and EXEC

The Railway API reports a failed operation inside a successful HTTP response. `SELECT`, `INSERT` and `UPDATE` surface the API's message as an error. `DELETE`, and `EXEC` without the `SHOWRESULTS` hint, do not read the response and report success regardless. To see the outcome, run the method with `EXEC /*+ SHOWRESULTS */`, or read the object back:

```sql
EXEC /*+ SHOWRESULTS */ railway.projects.projects.delete @id = '3a9d5e72-6c1f-4b8a-8e40-5d2c7f9b1a36';
```

:::

## Example Queries

Try the following queries using `stackql shell`, or run them from a script or CI pipeline with `stackql exec`.

### Workspaces and projects

The workspaces the token can reach, then the projects of one:

```sql
SELECT id, name, plan, created_at
FROM railway.workspaces.workspaces;
```

```sql
SELECT id, name, description, is_public, pr_deploys, created_at
FROM railway.projects.projects
WHERE workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40'
ORDER BY created_at DESC;
```

A single project, and projects with the name of their workspace (a join the SQL engine performs locally):

```sql
SELECT id, name, description, workspace_id, primary_environment_id
FROM railway.projects.projects
WHERE id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14';
```

```sql
SELECT p.name AS project, w.name AS workspace, w.plan
FROM railway.projects.projects p
JOIN railway.workspaces.workspaces w ON w.id = p.workspace_id
WHERE p.workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40';
```

Projects deleted within their grace period are listed with `include_deleted`:

```sql
SELECT id, name, deleted_at
FROM railway.projects.projects
WHERE workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40'
AND include_deleted = true;
```

### Environments, services and service instances

```sql
SELECT id, name, is_ephemeral, created_at
FROM railway.environments.environments
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14';
```

```sql
SELECT id, name, created_at
FROM railway.services.services
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14';
```

The services of several projects, with the project names. The `IN` list reads each project, and the join to `projects` takes its own `workspace_id`:

```sql
SELECT p.name AS project, s.name AS service
FROM railway.services.services s
JOIN railway.projects.projects p ON p.id = s.project_id
WHERE p.workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40'
AND s.project_id IN ('8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', 'f06b8d14-9e2a-4c73-a5b1-2e7d4c8f3a90')
ORDER BY project, service;
```

A service instance is a service as configured in one environment: build and start commands, region, replicas, restart policy, and the latest deployment.

```sql
SELECT
  service_name,
  region,
  num_replicas,
  start_command,
  restart_policy_type,
  json_extract(latest_deployment, '$.status') AS latest_deployment_status,
  json_extract(source, '$.image') AS image,
  json_extract(source, '$.repo') AS repo
FROM railway.services.service_instances
WHERE environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28';
```

### Deployments

Deployments are filtered by project, environment and service, all optional:

```sql
SELECT id, status, created_at, static_url, can_rollback
FROM railway.deployments.deployments
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
AND environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28'
ORDER BY created_at DESC;
```

Deployment outcomes for a project:

```sql
SELECT status, count(*) AS deployments
FROM railway.deployments.deployments
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
GROUP BY status;
```

Failed deployments only. `status` takes the API's filter object:

```sql
SELECT id, service_id, created_at
FROM railway.deployments.deployments
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
AND status = '{in: [FAILED, CRASHED]}';
```

### Logs

The last 50 build log lines of a deployment (the `LIMIT` is sent to the API):

```sql
SELECT timestamp, severity, message
FROM railway.observability.build_logs
WHERE deployment_id = 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65'
LIMIT 50;
```

```sql
SELECT timestamp, severity, message
FROM railway.observability.deployment_logs
WHERE deployment_id = 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65'
AND filter = 'error'
LIMIT 100;
```

### Variables

Variables of a service in an environment, one row per variable. Values are returned in clear - treat the output as a secret.

```sql
SELECT name, value
FROM railway.variables.variables
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
AND environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28'
AND service_id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53';
```

Omit `service_id` for the shared variables of the environment.

### Domains

```sql
SELECT id, domain, target_port
FROM railway.networking.service_domains
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
AND environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28'
AND service_id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53';
```

Custom domains with their DNS and certificate state:

```sql
SELECT
  domain,
  json_extract(status, '$.certificate_status') AS certificate_status,
  json_extract(status, '$.dns_records') AS dns_records
FROM railway.networking.custom_domains
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
AND environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28'
AND service_id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53';
```

### Usage and cost

Usage of a workspace by measurement and project:

```sql
SELECT
  measurement,
  json_extract(tags, '$.project_id') AS project_id,
  value
FROM railway.billing.usage
WHERE workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40'
AND measurements = '[CPU_USAGE, MEMORY_USAGE_GB, NETWORK_TX_GB]'
AND group_by = '[PROJECT_ID]';
```

The billing position of the workspace:

```sql
SELECT state, current_usage, credit_balance, is_trialing
FROM railway.billing.customers
WHERE workspace_id = '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40';
```

### Provisioning

Create a project, then an empty service in it. `RETURNING` gives back the ids the next statements need. A project is created with one environment (`production` unless `default_environment_name` says otherwise).

```sql
INSERT INTO railway.projects.projects (name, description, workspace_id)
SELECT 'my-project', 'created with stackql', '5f6b1c9e-2d4a-4c1e-9a7b-3e8d2f1a6c40'
RETURNING id, name, created_at;
```

```sql
INSERT INTO railway.environments.environments (project_id, name)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', 'staging'
RETURNING id, name;
```

```sql
INSERT INTO railway.services.services (project_id, name)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', 'api'
RETURNING id, name;
```

A service from a container image. A service with a source deploys, and a running deployment is billed:

```sql
INSERT INTO railway.services.services (project_id, name, source)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', 'cache', '{"image": "redis:7-alpine"}'
RETURNING id, name;
```

Set one variable (an upsert: the statement also replaces an existing value), or several at once. `skip_deploys` keeps the change from redeploying the service.

```sql
INSERT INTO railway.variables.variables (project_id, environment_id, service_id, name, value, skip_deploys)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28', 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53', 'LOG_LEVEL', 'info', true;
```

```sql
INSERT INTO railway.variables.variables (project_id, environment_id, service_id, variables, skip_deploys)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28', 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53', '{"SENTRY_KEY": "key", "SENTRY_SECRET": "secret"}', true;
```

A `*.up.railway.app` domain for the service, and a volume:

```sql
INSERT INTO railway.networking.service_domains (environment_id, service_id)
SELECT '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28', 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53'
RETURNING id, domain;
```

```sql
INSERT INTO railway.storage.volumes (project_id, environment_id, service_id, mount_path)
SELECT '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14', '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28', 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53', '/data'
RETURNING id, name;
```

### Changing configuration

```sql
UPDATE railway.projects.projects
SET description = 'owned by the platform team', pr_deploys = 'true'
WHERE id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
RETURNING id, description, pr_deploys;
```

The build and deploy configuration of a service in an environment:

```sql
UPDATE railway.services.service_instances
SET start_command = 'npm run start', num_replicas = '2', healthcheck_path = '/healthz'
WHERE service_id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53'
AND environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28';
```

### Deployment lifecycle

Lifecycle operations are `EXEC` methods on the resource. Redeploy a service in an environment, then restart, roll back to, or stop a deployment:

```sql
EXEC /*+ SHOWRESULTS */ railway.services.service_instances.redeploy
@service_id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53',
@environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28';
```

```sql
EXEC /*+ SHOWRESULTS */ railway.deployments.deployments.restart @id = 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65';
```

```sql
EXEC /*+ SHOWRESULTS */ railway.deployments.deployments.rollback @id = 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65';
```

```sql
EXEC /*+ SHOWRESULTS */ railway.deployments.deployments.stop @id = 'd41f6b2a-7c93-4e08-a5d2-9b1e3c7f0a65';
```

### Removing resources

```sql
DELETE FROM railway.variables.variables
WHERE project_id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14'
AND environment_id = '2b7e4d19-8a3c-4f5e-9d61-7c0a5e3b9f28'
AND service_id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53'
AND name = 'LOG_LEVEL';
```

```sql
DELETE FROM railway.services.services
WHERE id = 'e7a3c5f1-2d8b-4a96-b0e4-6f1d9c2a7b53';
```

Deleting a project removes everything in it:

```sql
DELETE FROM railway.projects.projects
WHERE id = '8c2f7a31-4b9d-4e6a-b1c5-0d3e9f7a2b14';
```

### Platform reference data

```sql
SELECT name, country, location
FROM railway.platform.regions;
```

```sql
SELECT id, code, name, category, is_verified
FROM railway.templates.templates
WHERE code = 'postgres';
```


## Services
<div class="row">
<div class="providerDocColumn">
<a href="/services/account/">account</a><br />
<a href="/services/agents/">agents</a><br />
<a href="/services/billing/">billing</a><br />
<a href="/services/deployments/">deployments</a><br />
<a href="/services/environments/">environments</a><br />
<a href="/services/integrations/">integrations</a><br />
<a href="/services/networking/">networking</a><br />
<a href="/services/observability/">observability</a><br />
</div>
<div class="providerDocColumn">
<a href="/services/platform/">platform</a><br />
<a href="/services/projects/">projects</a><br />
<a href="/services/services/">services</a><br />
<a href="/services/storage/">storage</a><br />
<a href="/services/templates/">templates</a><br />
<a href="/services/variables/">variables</a><br />
<a href="/services/workspaces/">workspaces</a><br />
</div>
</div>
