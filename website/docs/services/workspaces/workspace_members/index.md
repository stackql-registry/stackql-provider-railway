--- 
title: workspace_members
hide_title: false
hide_table_of_contents: false
keywords:
  - workspace_members
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

Creates, updates, deletes, gets or lists a <code>workspace_members</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workspace_members" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.workspace_members" /></td></tr>
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

One row per WorkspaceMember.

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
    <td><CopyableCode code="avatar" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td>Only retrieved if requested by an admin</td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td> (ADMIN, MEMBER, VIEWER)</td>
</tr>
<tr>
    <td><CopyableCode code="two_factor_auth_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Only retrieved if requested by an admin</td>
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
    <td>Lists WorkspaceMember objects of a Workspace. Backed by the Railway GraphQL query workspace.members.</td>
</tr>
<tr>
    <td><a href="#invite"><CopyableCode code="invite" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-code"><code>code</code></a>, <a href="#parameter-email"><code>email</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Invite a user by email to a workspace. Backed by the Railway GraphQL mutation workspaceUserInvite.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-role"><code>role</code></a>, <a href="#parameter-user_id"><code>user_id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Changes a user workspace permissions. Backed by the Railway GraphQL mutation workspacePermissionChange.</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-user_id"><code>user_id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Remove a user from a workspace. Backed by the Railway GraphQL mutation workspaceUserRemove.</td>
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
<tr id="parameter-code">
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-email">
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-role">
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>(ADMIN, MEMBER, VIEWER)</td>
</tr>
<tr id="parameter-user_id">
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td></td>
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

Lists WorkspaceMember objects of a Workspace. Backed by the Railway GraphQL query workspace.members.

```sql
SELECT
id,
name,
avatar,
email,
feature_flags,
role,
two_factor_auth_enabled
FROM railway.workspaces.workspace_members
WHERE workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="invite"
    values={[
        { label: 'invite', value: 'invite' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="invite">

Invite a user by email to a workspace. Backed by the Railway GraphQL mutation workspaceUserInvite.

```sql
INSERT INTO railway.workspaces.workspace_members (
code,
email,
workspace_id
)
SELECT 
'{{ code }}' /* required */,
'{{ email }}' /* required */,
'{{ workspace_id }}' /* required */
RETURNING
result
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: workspace_members
  props:
    - name: code
      value: "{{ code }}"
    - name: email
      value: "{{ email }}"
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

Changes a user workspace permissions. Backed by the Railway GraphQL mutation workspacePermissionChange.

```sql
UPDATE railway.workspaces.workspace_members
SET 

WHERE 
role = '{{ role }}' --required
AND user_id = '{{ user_id }}' --required
AND workspace_id = '{{ workspace_id }}' --required
RETURNING
result;
```
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

Remove a user from a workspace. Backed by the Railway GraphQL mutation workspaceUserRemove.

```sql
DELETE FROM railway.workspaces.workspace_members
WHERE 
user_id = '{{ user_id }}' --required
AND workspace_id = '{{ workspace_id }}' --required
;
```
</TabItem>
</Tabs>
