--- 
title: projects
hide_title: false
hide_table_of_contents: false
keywords:
  - projects
  - projects
  - railway
  - infrastructure-as-code
  - configuration-as-data
  - cloud inventory
description: Query, deploy and manage railway resources using SQL
custom_edit_url: null
image: /img/stackql-railway-provider-featured-image.png
---

import CopyableCode from '@site/src/components/CopyableCode/CopyableCode';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Creates, updates, deletes, gets or lists a <code>projects</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="projects" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.projects.projects" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list_by_ids', value: 'list_by_ids' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One Project row.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="base_environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="primary_environment_id" /></td>
    <td><code>string</code></td>
    <td>The id of the oldest non-ephemeral environment for this project (typically production). Used by the dashboard to render project cards without fetching the full environments connection.</td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="base_environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="bot_pr_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="focused_pr_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_temp_project" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pr_deploys" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_plan_limit" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_type" /></td>
    <td><code>string</code></td>
    <td> (free, hobby, pro, trial)</td>
</tr>
<tr>
    <td><CopyableCode code="tracing_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project's services are traced by default. A service can override it with its own tracingEnabled.</td>
</tr>
<tr>
    <td><CopyableCode code="tracing_sample_rate" /></td>
    <td><code>number</code></td>
    <td>Fraction of client-facing requests the edge traces, 0..1. Null uses Railway's default.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="viewer_role" /></td>
    <td><code>string</code></td>
    <td>Highest project-scoped role the current user holds on this project, through a direct project permission or an access group. Does not include the workspace role. (ADMIN, MEMBER, VIEWER)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_by_ids">

One row per Project.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="base_environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="primary_environment_id" /></td>
    <td><code>string</code></td>
    <td>The id of the oldest non-ephemeral environment for this project (typically production). Used by the dashboard to render project cards without fetching the full environments connection.</td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="base_environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="bot_pr_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="focused_pr_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_temp_project" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pr_deploys" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_plan_limit" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_type" /></td>
    <td><code>string</code></td>
    <td> (free, hobby, pro, trial)</td>
</tr>
<tr>
    <td><CopyableCode code="tracing_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project's services are traced by default. A service can override it with its own tracingEnabled.</td>
</tr>
<tr>
    <td><CopyableCode code="tracing_sample_rate" /></td>
    <td><code>number</code></td>
    <td>Fraction of client-facing requests the edge traces, 0..1. Null uses Railway's default.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="viewer_role" /></td>
    <td><code>string</code></td>
    <td>Highest project-scoped role the current user holds on this project, through a direct project permission or an access group. Does not include the workspace role. (ADMIN, MEMBER, VIEWER)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Project.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="base_environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="primary_environment_id" /></td>
    <td><code>string</code></td>
    <td>The id of the oldest non-ephemeral environment for this project (typically production). Used by the dashboard to render project cards without fetching the full environments connection.</td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="base_environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="bot_pr_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expired_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="focused_pr_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_public" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_temp_project" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pr_deploys" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_plan_limit" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_type" /></td>
    <td><code>string</code></td>
    <td> (free, hobby, pro, trial)</td>
</tr>
<tr>
    <td><CopyableCode code="tracing_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Whether the project's services are traced by default. A service can override it with its own tracingEnabled.</td>
</tr>
<tr>
    <td><CopyableCode code="tracing_sample_rate" /></td>
    <td><code>number</code></td>
    <td>Fraction of client-facing requests the edge traces, 0..1. Null uses Railway's default.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="viewer_role" /></td>
    <td><code>string</code></td>
    <td>Highest project-scoped role the current user holds on this project, through a direct project permission or an access group. Does not include the workspace role. (ADMIN, MEMBER, VIEWER)</td>
</tr>
</tbody>
</table>
</TabItem>
</Tabs>

## Methods

The following methods are available for this resource:

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Accessible by</th>
    <th>Required Params</th>
    <th>Optional Params</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Get a project by ID. Backed by the Railway GraphQL query project.</td>
</tr>
<tr>
    <td><a href="#list_by_ids"><CopyableCode code="list_by_ids" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-ids"><code>ids</code></a></td>
    <td></td>
    <td>Fetch multiple projects by id. Skips ids the caller cannot access (does not throw on partial denial). Intended for batched dashboard hydration of a small viewport-sized set of cards. Backed by the Railway GraphQL query projectsByIds.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-include_deleted"><code>include_deleted</code></a>, <a href="#parameter-order_by"><code>order_by</code></a>, <a href="#parameter-user_id"><code>user_id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Gets all projects for a user or workspace. Backed by the Railway GraphQL query projects.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td></td>
    <td></td>
    <td>Creates a new project. Backed by the Railway GraphQL mutation projectCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Updates a project. Backed by the Railway GraphQL mutation projectUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Deletes a project. Backed by the Railway GraphQL mutation projectDelete.</td>
</tr>
<tr>
    <td><a href="#add_feature_flag"><CopyableCode code="add_feature_flag" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flag"><code>flag</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Add a feature flag for a project. Backed by the Railway GraphQL mutation projectFeatureFlagAdd.</td>
</tr>
<tr>
    <td><a href="#claim"><CopyableCode code="claim" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Claims a project. Backed by the Railway GraphQL mutation projectClaim.</td>
</tr>
<tr>
    <td><a href="#invite_user"><CopyableCode code="invite_user" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-email"><code>email</code></a>, <a href="#parameter-link"><code>link</code></a></td>
    <td></td>
    <td>Invite a user by email to a project. Backed by the Railway GraphQL mutation projectInviteUser.</td>
</tr>
<tr>
    <td><a href="#leave"><CopyableCode code="leave" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Leave project as currently authenticated user. Backed by the Railway GraphQL mutation projectLeave.</td>
</tr>
<tr>
    <td><a href="#override_base_environment"><CopyableCode code="override_base_environment" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-base_environment_override_id"><code>base_environment_override_id</code></a></td>
    <td>Sets the base environment override for a deployment trigger. Backed by the Railway GraphQL mutation baseEnvironmentOverride.</td>
</tr>
<tr>
    <td><a href="#remove_feature_flag"><CopyableCode code="remove_feature_flag" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flag"><code>flag</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Remove a feature flag for a project. Backed by the Railway GraphQL mutation projectFeatureFlagRemove.</td>
</tr>
<tr>
    <td><a href="#schedule_delete"><CopyableCode code="schedule_delete" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Deletes a project with a 48 hour grace period. Backed by the Railway GraphQL mutation projectScheduleDelete.</td>
</tr>
<tr>
    <td><a href="#schedule_delete_cancel"><CopyableCode code="schedule_delete_cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Cancel scheduled deletion of a project. Backed by the Railway GraphQL mutation projectScheduleDeleteCancel.</td>
</tr>
<tr>
    <td><a href="#schedule_delete_force"><CopyableCode code="schedule_delete_force" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Force delete a scheduled deletion of a project (skips the grace period). Backed by the Railway GraphQL mutation projectScheduleDeleteForce.</td>
</tr>
<tr>
    <td><a href="#transfer"><CopyableCode code="transfer" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Transfer a project to a workspace. Backed by the Railway GraphQL mutation projectTransfer.</td>
</tr>
<tr>
    <td><a href="#transfer_confirm"><CopyableCode code="transfer_confirm" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-ownership_transfer_id"><code>ownership_transfer_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-destination_workspace_id"><code>destination_workspace_id</code></a></td>
    <td>Confirm the transfer of project ownership. Backed by the Railway GraphQL mutation projectTransferConfirm.</td>
</tr>
<tr>
    <td><a href="#transfer_initiate"><CopyableCode code="transfer_initiate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-member_id"><code>member_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Initiate the transfer of project ownership. Backed by the Railway GraphQL mutation projectTransferInitiate.</td>
</tr>
</tbody>
</table>

## Parameters

Parameters can be passed in the `WHERE` clause of a query. Check the [Methods](#methods) section to see which parameters are required or optional for each operation.

<table>
<thead>
    <tr>
    <th>Name</th>
    <th>Datatype</th>
    <th>Description</th>
    </tr>
</thead>
<tbody>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-ids">
    <td><CopyableCode code="ids" /></td>
    <td><code>string</code></td>
    <td>GraphQL list literal, for example &#91;"a", "b"&#93;.</td>
</tr>
<tr id="parameter-include_deleted">
    <td><CopyableCode code="include_deleted" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-user_id">
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-base_environment_override_id">
    <td><CopyableCode code="base_environment_override_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-destination_workspace_id">
    <td><CopyableCode code="destination_workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-email">
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-flag">
    <td><CopyableCode code="flag" /></td>
    <td><code>string</code></td>
    <td>(PLACEHOLDER, RBS_VOLUMES)</td>
</tr>
<tr id="parameter-link">
    <td><CopyableCode code="link" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-member_id">
    <td><CopyableCode code="member_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-ownership_transfer_id">
    <td><CopyableCode code="ownership_transfer_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list_by_ids', value: 'list_by_ids' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get a project by ID. Backed by the Railway GraphQL query project.

```sql
SELECT
id,
name,
base_environment_id,
primary_environment_id,
workspace_id,
base_environment,
bot_pr_environments,
created_at,
deleted_at,
description,
expired_at,
feature_flags,
focused_pr_environments,
is_public,
is_temp_project,
pr_deploys,
subscription_plan_limit,
subscription_type,
tracing_enabled,
tracing_sample_rate,
updated_at,
viewer_role
FROM railway.projects.projects
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list_by_ids">

Fetch multiple projects by id. Skips ids the caller cannot access (does not throw on partial denial). Intended for batched dashboard hydration of a small viewport-sized set of cards. Backed by the Railway GraphQL query projectsByIds.

```sql
SELECT
id,
name,
base_environment_id,
primary_environment_id,
workspace_id,
base_environment,
bot_pr_environments,
created_at,
deleted_at,
description,
expired_at,
feature_flags,
focused_pr_environments,
is_public,
is_temp_project,
pr_deploys,
subscription_plan_limit,
subscription_type,
tracing_enabled,
tracing_sample_rate,
updated_at,
viewer_role
FROM railway.projects.projects
WHERE ids = '{{ ids }}' -- required
;
```
</TabItem>
<TabItem value="list">

Gets all projects for a user or workspace. Backed by the Railway GraphQL query projects.

```sql
SELECT
id,
name,
base_environment_id,
primary_environment_id,
workspace_id,
base_environment,
bot_pr_environments,
created_at,
deleted_at,
description,
expired_at,
feature_flags,
focused_pr_environments,
is_public,
is_temp_project,
pr_deploys,
subscription_plan_limit,
subscription_type,
tracing_enabled,
tracing_sample_rate,
updated_at,
viewer_role
FROM railway.projects.projects
WHERE include_deleted = '{{ include_deleted }}'
AND order_by = '{{ order_by }}'
AND user_id = '{{ user_id }}'
AND workspace_id = '{{ workspace_id }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Creates a new project. Backed by the Railway GraphQL mutation projectCreate.

```sql
INSERT INTO railway.projects.projects (
default_environment_name,
description,
is_monorepo,
is_public,
name,
pr_deploys,
repo,
runtime,
workspace_id
)
SELECT 
'{{ default_environment_name }}',
'{{ description }}',
{{ is_monorepo }},
{{ is_public }},
'{{ name }}',
{{ pr_deploys }},
'{{ repo }}',
'{{ runtime }}',
'{{ workspace_id }}'
RETURNING
id,
name,
base_environment_id,
primary_environment_id,
workspace_id,
base_environment,
bot_pr_environments,
created_at,
deleted_at,
description,
expired_at,
feature_flags,
focused_pr_environments,
is_public,
is_temp_project,
pr_deploys,
subscription_plan_limit,
subscription_type,
tracing_enabled,
tracing_sample_rate,
updated_at,
viewer_role
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: projects
  props:
    - name: default_environment_name
      value: "{{ default_environment_name }}"
    - name: description
      value: "{{ description }}"
    - name: is_monorepo
      value: {{ is_monorepo }}
    - name: is_public
      value: {{ is_public }}
    - name: name
      value: "{{ name }}"
    - name: pr_deploys
      value: {{ pr_deploys }}
    - name: repo
      value: "{{ repo }}"
      description: |
        JSON object of GraphQL type ProjectCreateRepo; keys keep the API's camelCase names.
    - name: runtime
      value: "{{ runtime }}"
      valid_values: ['LEGACY', 'UNSPECIFIED', 'V2']
    - name: workspace_id
      value: "{{ workspace_id }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Updates a project. Backed by the Railway GraphQL mutation projectUpdate.

```sql
UPDATE railway.projects.projects
SET 
base_environment_id = '{{ base_environment_id }}',
bot_pr_environments = '{{ bot_pr_environments }}',
description = '{{ description }}',
focused_pr_environments = '{{ focused_pr_environments }}',
is_public = '{{ is_public }}',
name = '{{ name }}',
pr_deploys = '{{ pr_deploys }}',
tracing_enabled = '{{ tracing_enabled }}',
tracing_sample_rate = '{{ tracing_sample_rate }}'
WHERE 
id = '{{ id }}' --required
RETURNING
id,
name,
base_environment_id,
primary_environment_id,
workspace_id,
base_environment,
bot_pr_environments,
created_at,
deleted_at,
description,
expired_at,
feature_flags,
focused_pr_environments,
is_public,
is_temp_project,
pr_deploys,
subscription_plan_limit,
subscription_type,
tracing_enabled,
tracing_sample_rate,
updated_at,
viewer_role;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes a project. Backed by the Railway GraphQL mutation projectDelete.

```sql
DELETE FROM railway.projects.projects
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="add_feature_flag"
    values={[
        { label: 'add_feature_flag', value: 'add_feature_flag' },
        { label: 'claim', value: 'claim' },
        { label: 'invite_user', value: 'invite_user' },
        { label: 'leave', value: 'leave' },
        { label: 'override_base_environment', value: 'override_base_environment' },
        { label: 'remove_feature_flag', value: 'remove_feature_flag' },
        { label: 'schedule_delete', value: 'schedule_delete' },
        { label: 'schedule_delete_cancel', value: 'schedule_delete_cancel' },
        { label: 'schedule_delete_force', value: 'schedule_delete_force' },
        { label: 'transfer', value: 'transfer' },
        { label: 'transfer_confirm', value: 'transfer_confirm' },
        { label: 'transfer_initiate', value: 'transfer_initiate' }
    ]}
>
<TabItem value="add_feature_flag">

Add a feature flag for a project. Backed by the Railway GraphQL mutation projectFeatureFlagAdd.

```sql
EXEC railway.projects.projects.add_feature_flag 
@flag='{{ flag }}', --required
@project_id='{{ project_id }}' --required
;
```
</TabItem>
<TabItem value="claim">

Claims a project. Backed by the Railway GraphQL mutation projectClaim.

```sql
EXEC railway.projects.projects.claim 
@id='{{ id }}', --required
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
<TabItem value="invite_user">

Invite a user by email to a project. Backed by the Railway GraphQL mutation projectInviteUser.

```sql
EXEC railway.projects.projects.invite_user 
@id='{{ id }}', --required
@email='{{ email }}', --required
@link='{{ link }}' --required
;
```
</TabItem>
<TabItem value="leave">

Leave project as currently authenticated user. Backed by the Railway GraphQL mutation projectLeave.

```sql
EXEC railway.projects.projects.leave 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="override_base_environment">

Sets the base environment override for a deployment trigger. Backed by the Railway GraphQL mutation baseEnvironmentOverride.

```sql
EXEC railway.projects.projects.override_base_environment 
@id='{{ id }}', --required
@base_environment_override_id='{{ base_environment_override_id }}'
;
```
</TabItem>
<TabItem value="remove_feature_flag">

Remove a feature flag for a project. Backed by the Railway GraphQL mutation projectFeatureFlagRemove.

```sql
EXEC railway.projects.projects.remove_feature_flag 
@flag='{{ flag }}', --required
@project_id='{{ project_id }}' --required
;
```
</TabItem>
<TabItem value="schedule_delete">

Deletes a project with a 48 hour grace period. Backed by the Railway GraphQL mutation projectScheduleDelete.

```sql
EXEC railway.projects.projects.schedule_delete 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="schedule_delete_cancel">

Cancel scheduled deletion of a project. Backed by the Railway GraphQL mutation projectScheduleDeleteCancel.

```sql
EXEC railway.projects.projects.schedule_delete_cancel 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="schedule_delete_force">

Force delete a scheduled deletion of a project (skips the grace period). Backed by the Railway GraphQL mutation projectScheduleDeleteForce.

```sql
EXEC railway.projects.projects.schedule_delete_force 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="transfer">

Transfer a project to a workspace. Backed by the Railway GraphQL mutation projectTransfer.

```sql
EXEC railway.projects.projects.transfer 
@workspace_id='{{ workspace_id }}', --required
@project_id='{{ project_id }}' --required
;
```
</TabItem>
<TabItem value="transfer_confirm">

Confirm the transfer of project ownership. Backed by the Railway GraphQL mutation projectTransferConfirm.

```sql
EXEC railway.projects.projects.transfer_confirm 
@ownership_transfer_id='{{ ownership_transfer_id }}', --required
@project_id='{{ project_id }}', --required
@destination_workspace_id='{{ destination_workspace_id }}'
;
```
</TabItem>
<TabItem value="transfer_initiate">

Initiate the transfer of project ownership. Backed by the Railway GraphQL mutation projectTransferInitiate.

```sql
EXEC railway.projects.projects.transfer_initiate 
@member_id='{{ member_id }}', --required
@project_id='{{ project_id }}' --required
;
```
</TabItem>
</Tabs>
