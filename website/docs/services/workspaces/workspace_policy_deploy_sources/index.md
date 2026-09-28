--- 
title: workspace_policy_deploy_sources
hide_title: false
hide_table_of_contents: false
keywords:
  - workspace_policy_deploy_sources
  - workspaces
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

Creates, updates, deletes, gets or lists a <code>workspace_policy_deploy_sources</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workspace_policy_deploy_sources" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.workspace_policy_deploy_sources" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

One row per WorkspacePolicyDeploySourceAllowlist.

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
    <td><CopyableCode code="source_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="added_by" /></td>
    <td><code>object</code></td>
    <td>User object</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source_icon" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source_type" /></td>
    <td><code>string</code></td>
    <td> (GITHUB_ORG)</td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Lists WorkspacePolicyDeploySourceAllowlist objects of a WorkspacePolicy. Backed by the Railway GraphQL query workspacePolicy.deploySourceAllowlist.</td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-source_id"><code>source_id</code></a>, <a href="#parameter-source_type"><code>source_type</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Add a deploy source to a workspace policy allowlist. Backed by the Railway GraphQL mutation workspacePolicyDeploySourceAllowlistAdd.</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Remove a deploy source from a workspace policy allowlist. Backed by the Railway GraphQL mutation workspacePolicyDeploySourceAllowlistRemove.</td>
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
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-source_id">
    <td><CopyableCode code="source_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-source_type">
    <td><CopyableCode code="source_type" /></td>
    <td><code>string</code></td>
    <td>(GITHUB_ORG)</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="list">

Lists WorkspacePolicyDeploySourceAllowlist objects of a WorkspacePolicy. Backed by the Railway GraphQL query workspacePolicy.deploySourceAllowlist.

```sql
SELECT
id,
source_id,
source_name,
added_by,
created_at,
source_icon,
source_type
FROM railway.workspaces.workspace_policy_deploy_sources
WHERE workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="add"
    values={[
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add">

Add a deploy source to a workspace policy allowlist. Backed by the Railway GraphQL mutation workspacePolicyDeploySourceAllowlistAdd.

```sql
INSERT INTO railway.workspaces.workspace_policy_deploy_sources (
source_id,
source_type,
workspace_id
)
SELECT 
'{{ source_id }}' /* required */,
'{{ source_type }}' /* required */,
'{{ workspace_id }}' /* required */
RETURNING
id,
source_id,
source_name,
added_by,
created_at,
source_icon,
source_type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: workspace_policy_deploy_sources
  props:
    - name: source_id
      value: "{{ source_id }}"
    - name: source_type
      value: "{{ source_type }}"
      valid_values: ['GITHUB_ORG']
    - name: workspace_id
      value: "{{ workspace_id }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove"
    values={[
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="remove">

Remove a deploy source from a workspace policy allowlist. Backed by the Railway GraphQL mutation workspacePolicyDeploySourceAllowlistRemove.

```sql
DELETE FROM railway.workspaces.workspace_policy_deploy_sources
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>
