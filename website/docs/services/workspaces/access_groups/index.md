--- 
title: access_groups
hide_title: false
hide_table_of_contents: false
keywords:
  - access_groups
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

Creates, updates, deletes, gets or lists an <code>access_groups</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="access_groups" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.access_groups" /></td></tr>
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

One row per AccessGroup.

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
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td> (ADMIN, MEMBER, VIEWER)</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>string</code></td>
    <td> (MANUAL)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspace" /></td>
    <td><code>object</code></td>
    <td>Workspace object</td>
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
    <td>Lists AccessGroup objects of a Workspace. Backed by the Railway GraphQL query workspace.accessGroups.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-role"><code>role</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Create an access group in a workspace. Backed by the Railway GraphQL mutation accessGroupCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Update an access group's name or role. Backed by the Railway GraphQL mutation accessGroupUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete an access group. Backed by the Railway GraphQL mutation accessGroupDelete.</td>
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
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-role">
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>(ADMIN, MEMBER, VIEWER)</td>
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

Lists AccessGroup objects of a Workspace. Backed by the Railway GraphQL query workspace.accessGroups.

```sql
SELECT
id,
name,
workspace_id,
created_at,
role,
source,
updated_at,
workspace
FROM railway.workspaces.access_groups
WHERE workspace_id = '{{ workspace_id }}' -- required
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

Create an access group in a workspace. Backed by the Railway GraphQL mutation accessGroupCreate.

```sql
INSERT INTO railway.workspaces.access_groups (
name,
role,
workspace_id
)
SELECT 
'{{ name }}' /* required */,
'{{ role }}' /* required */,
'{{ workspace_id }}' /* required */
RETURNING
id,
name,
workspace_id,
created_at,
role,
source,
updated_at,
workspace
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: access_groups
  props:
    - name: name
      value: "{{ name }}"
    - name: role
      value: "{{ role }}"
      valid_values: ['ADMIN', 'MEMBER', 'VIEWER']
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

Update an access group's name or role. Backed by the Railway GraphQL mutation accessGroupUpdate.

```sql
UPDATE railway.workspaces.access_groups
SET 
name = '{{ name }}',
role = '{{ role }}'
WHERE 
id = '{{ id }}' --required
RETURNING
id,
name,
workspace_id,
created_at,
role,
source,
updated_at,
workspace;
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

Delete an access group. Backed by the Railway GraphQL mutation accessGroupDelete.

```sql
DELETE FROM railway.workspaces.access_groups
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>
