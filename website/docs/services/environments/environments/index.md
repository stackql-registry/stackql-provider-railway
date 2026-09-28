--- 
title: environments
hide_title: false
hide_table_of_contents: false
keywords:
  - environments
  - environments
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

Creates, updates, deletes, gets or lists an <code>environments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.environments.environments" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One Environment row.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="can_access" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="canvas_group_refs" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="config_etag" /></td>
    <td><code>string</code></td>
    <td>Opaque snapshot token of the environment's IaC-relevant config. Echo it back as baseConfigEtag on environmentApplyChangeSet for optimistic concurrency.</td>
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
    <td><CopyableCode code="iac_partials" /></td>
    <td><code>object</code></td>
    <td>IaC resource address → partial name for this environment. '*' is the whole-project owner. Used so omit=delete only applies to resources this file already owns.</td>
</tr>
<tr>
    <td><CopyableCode code="is_ephemeral" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="meta" /></td>
    <td><code>object</code></td>
    <td>EnvironmentMeta object</td>
</tr>
<tr>
    <td><CopyableCode code="unmerged_changes_count" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Environment.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="can_access" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="canvas_group_refs" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="config_etag" /></td>
    <td><code>string</code></td>
    <td>Opaque snapshot token of the environment's IaC-relevant config. Echo it back as baseConfigEtag on environmentApplyChangeSet for optimistic concurrency.</td>
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
    <td><CopyableCode code="iac_partials" /></td>
    <td><code>object</code></td>
    <td>IaC resource address → partial name for this environment. '*' is the whole-project owner. Used so omit=delete only applies to resources this file already owns.</td>
</tr>
<tr>
    <td><CopyableCode code="is_ephemeral" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="meta" /></td>
    <td><code>object</code></td>
    <td>EnvironmentMeta object</td>
</tr>
<tr>
    <td><CopyableCode code="unmerged_changes_count" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Find a single environment. Backed by the Railway GraphQL query environment.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-is_ephemeral"><code>is_ephemeral</code></a></td>
    <td>Gets all environments for a project. Backed by the Railway GraphQL query environments.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Creates a new environment. Backed by the Railway GraphQL mutation environmentCreate.</td>
</tr>
<tr>
    <td><a href="#rename"><CopyableCode code="rename" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Renames an environment. Backed by the Railway GraphQL mutation environmentRename.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Deletes an environment. Backed by the Railway GraphQL mutation environmentDelete.</td>
</tr>
<tr>
    <td><a href="#import_docker_compose"><CopyableCode code="import_docker_compose" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-yaml"><code>yaml</code></a></td>
    <td><a href="#parameter-skip_staging_patch"><code>skip_staging_patch</code></a></td>
    <td>Create services and volumes from docker compose. Backed by the Railway GraphQL mutation dockerComposeImport.</td>
</tr>
<tr>
    <td><a href="#release_iac_partial"><CopyableCode code="release_iac_partial" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-partial"><code>partial</code></a></td>
    <td><a href="#parameter-base_config_etag"><code>base_config_etag</code></a>, <a href="#parameter-resources"><code>resources</code></a></td>
    <td>Release resources from a named IaC partial without deleting, redeploying, or changing them. Omit resources to release the entire partial. Whole-project management is possible once no named partials remain. A later named-partial apply can claim released resources again. Backed by the Railway GraphQL mutation environmentIacPartialRelease.</td>
</tr>
<tr>
    <td><a href="#transfer_iac_partial"><CopyableCode code="transfer_iac_partial" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-from_partial"><code>from_partial</code></a>, <a href="#parameter-to_partial"><code>to_partial</code></a></td>
    <td><a href="#parameter-base_config_etag"><code>base_config_etag</code></a>, <a href="#parameter-resources"><code>resources</code></a></td>
    <td>Transfer resources between named IaC partials without deleting, redeploying, or changing them. Omit resources to transfer the entire source partial. The destination may be a new or existing partial. Backed by the Railway GraphQL mutation environmentIacPartialTransfer.</td>
</tr>
<tr>
    <td><a href="#unskip_service"><CopyableCode code="unskip_service" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Deploy a service that was skipped when its environment was created, along with its skipped transitive dependencies. Backed by the Railway GraphQL mutation environmentUnskipService.</td>
</tr>
<tr>
    <td><a href="#upsert_config_plan_comment"><CopyableCode code="upsert_config_plan_comment" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-github_oidc_token"><code>github_oidc_token</code></a>, <a href="#parameter-plan"><code>plan</code></a>, <a href="#parameter-pr_number"><code>pr_number</code></a></td>
    <td></td>
    <td>Posts or updates a `railway config plan` comment on a GitHub pull request under the Railway app identity. The caller proves it runs in the target repo with a GitHub Actions OIDC token; the comment body is composed server-side from the structured plan. Backed by the Railway GraphQL mutation environmentConfigPlanCommentUpsert.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-is_ephemeral">
    <td><CopyableCode code="is_ephemeral" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-base_config_etag">
    <td><CopyableCode code="base_config_etag" /></td>
    <td><code>string</code></td>
    <td>Snapshot token from Environment.configEtag the ownership preview was computed against. When set, the release is rejected if the environment has changed since.</td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-from_partial">
    <td><CopyableCode code="from_partial" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-github_oidc_token">
    <td><CopyableCode code="github_oidc_token" /></td>
    <td><code>string</code></td>
    <td>GitHub Actions OIDC token (id-token: write) with audience `railway`. Its `repository` claim proves the caller runs in the repo the comment is posted to.</td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-partial">
    <td><CopyableCode code="partial" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-plan">
    <td><CopyableCode code="plan" /></td>
    <td><code>object</code></td>
    <td>Structured plan summary: &#123; changes: &#91;&#123; kind?, summary &#125;&#93;, destructive, sourceTree, configEtag, changeSetHash, cliVersion? &#125;. The comment body is composed server-side.</td>
</tr>
<tr id="parameter-pr_number">
    <td><CopyableCode code="pr_number" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
<tr id="parameter-resources">
    <td><CopyableCode code="resources" /></td>
    <td><code>array</code></td>
    <td>Resource addresses to release (for example service.api). Every address must belong to the named partial. Omit to release all of its resources; an empty list is rejected.</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-skip_staging_patch">
    <td><CopyableCode code="skip_staging_patch" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-to_partial">
    <td><CopyableCode code="to_partial" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-yaml">
    <td><CopyableCode code="yaml" /></td>
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
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Find a single environment. Backed by the Railway GraphQL query environment.

```sql
SELECT
id,
name,
project_id,
can_access,
canvas_group_refs,
config,
config_etag,
created_at,
deleted_at,
iac_partials,
is_ephemeral,
meta,
unmerged_changes_count,
updated_at
FROM railway.environments.environments
WHERE id = '{{ id }}' -- required
AND project_id = '{{ project_id }}'
;
```
</TabItem>
<TabItem value="list">

Gets all environments for a project. Backed by the Railway GraphQL query environments.

```sql
SELECT
id,
name,
project_id,
can_access,
canvas_group_refs,
config,
config_etag,
created_at,
deleted_at,
iac_partials,
is_ephemeral,
meta,
unmerged_changes_count,
updated_at
FROM railway.environments.environments
WHERE project_id = '{{ project_id }}' -- required
AND is_ephemeral = '{{ is_ephemeral }}'
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

Creates a new environment. Backed by the Railway GraphQL mutation environmentCreate.

```sql
INSERT INTO railway.environments.environments (
apply_changes_in_background,
ephemeral,
name,
project_id,
skip_initial_deploys,
source_environment_id,
stage_initial_changes
)
SELECT 
{{ apply_changes_in_background }},
{{ ephemeral }},
'{{ name }}' /* required */,
'{{ project_id }}' /* required */,
{{ skip_initial_deploys }},
'{{ source_environment_id }}',
{{ stage_initial_changes }}
RETURNING
id,
name,
project_id,
can_access,
canvas_group_refs,
config,
config_etag,
created_at,
deleted_at,
iac_partials,
is_ephemeral,
meta,
unmerged_changes_count,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: environments
  props:
    - name: apply_changes_in_background
      value: {{ apply_changes_in_background }}
      description: |
        If true, the changes will be applied in the background and the mutation will return immediately. If false, the mutation will wait for the changes to be applied before returning.
    - name: ephemeral
      value: {{ ephemeral }}
    - name: name
      value: "{{ name }}"
    - name: project_id
      value: "{{ project_id }}"
    - name: skip_initial_deploys
      value: {{ skip_initial_deploys }}
      description: |
        When committing the changes immediately, skip any initial deployments.
    - name: source_environment_id
      value: "{{ source_environment_id }}"
      description: |
        Create the environment with all of the services, volumes, configuration, and variables from this source environment.
    - name: stage_initial_changes
      value: {{ stage_initial_changes }}
      description: |
        Stage the initial changes for the environment. If false (default), the changes will be committed immediately.
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="rename"
    values={[
        { label: 'rename', value: 'rename' }
    ]}
>
<TabItem value="rename">

Renames an environment. Backed by the Railway GraphQL mutation environmentRename.

```sql
UPDATE railway.environments.environments
SET 

WHERE 
id = '{{ id }}' --required
AND name = '{{ name }}' --required
RETURNING
id,
name,
project_id,
can_access,
canvas_group_refs,
config,
config_etag,
created_at,
deleted_at,
iac_partials,
is_ephemeral,
meta,
unmerged_changes_count,
updated_at;
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

Deletes an environment. Backed by the Railway GraphQL mutation environmentDelete.

```sql
DELETE FROM railway.environments.environments
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="import_docker_compose"
    values={[
        { label: 'import_docker_compose', value: 'import_docker_compose' },
        { label: 'release_iac_partial', value: 'release_iac_partial' },
        { label: 'transfer_iac_partial', value: 'transfer_iac_partial' },
        { label: 'unskip_service', value: 'unskip_service' },
        { label: 'upsert_config_plan_comment', value: 'upsert_config_plan_comment' }
    ]}
>
<TabItem value="import_docker_compose">

Create services and volumes from docker compose. Backed by the Railway GraphQL mutation dockerComposeImport.

```sql
EXEC railway.environments.environments.import_docker_compose 
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@yaml='{{ yaml }}', --required
@skip_staging_patch='{{ skip_staging_patch }}'
;
```
</TabItem>
<TabItem value="release_iac_partial">

Release resources from a named IaC partial without deleting, redeploying, or changing them. Omit resources to release the entire partial. Whole-project management is possible once no named partials remain. A later named-partial apply can claim released resources again. Backed by the Railway GraphQL mutation environmentIacPartialRelease.

```sql
EXEC railway.environments.environments.release_iac_partial 
@environment_id='{{ environment_id }}', --required
@partial='{{ partial }}', --required
@base_config_etag='{{ base_config_etag }}',
@resources='{{ resources }}'
;
```
</TabItem>
<TabItem value="transfer_iac_partial">

Transfer resources between named IaC partials without deleting, redeploying, or changing them. Omit resources to transfer the entire source partial. The destination may be a new or existing partial. Backed by the Railway GraphQL mutation environmentIacPartialTransfer.

```sql
EXEC railway.environments.environments.transfer_iac_partial 
@environment_id='{{ environment_id }}', --required
@from_partial='{{ from_partial }}', --required
@to_partial='{{ to_partial }}', --required
@base_config_etag='{{ base_config_etag }}',
@resources='{{ resources }}'
;
```
</TabItem>
<TabItem value="unskip_service">

Deploy a service that was skipped when its environment was created, along with its skipped transitive dependencies. Backed by the Railway GraphQL mutation environmentUnskipService.

```sql
EXEC railway.environments.environments.unskip_service 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="upsert_config_plan_comment">

Posts or updates a `railway config plan` comment on a GitHub pull request under the Railway app identity. The caller proves it runs in the target repo with a GitHub Actions OIDC token; the comment body is composed server-side from the structured plan. Backed by the Railway GraphQL mutation environmentConfigPlanCommentUpsert.

```sql
EXEC railway.environments.environments.upsert_config_plan_comment 
@environment_id='{{ environment_id }}', --required
@github_oidc_token='{{ github_oidc_token }}', --required
@plan='{{ plan }}', --required
@pr_number='{{ pr_number }}' --required
;
```
</TabItem>
</Tabs>
