--- 
title: project_members
hide_title: false
hide_table_of_contents: false
keywords:
  - project_members
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

Creates, updates, deletes, gets or lists a <code>project_members</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_members" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.projects.project_members" /></td></tr>
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

One row per ProjectMember.

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
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td> (ADMIN, MEMBER, VIEWER)</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Gets users who belong to a project along with their role. Backed by the Railway GraphQL query projectMembers.</td>
</tr>
<tr>
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-role"><code>role</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Add a workspace member to a project with a specific role. The user must already be a member of the project's workspace. Backed by the Railway GraphQL mutation projectMemberAdd.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-role"><code>role</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Change the role for a user within a project. Backed by the Railway GraphQL mutation projectMemberUpdate.</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Remove user from a project. Backed by the Railway GraphQL mutation projectMemberRemove.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
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

Gets users who belong to a project along with their role. Backed by the Railway GraphQL query projectMembers.

```sql
SELECT
id,
name,
avatar,
email,
role
FROM railway.projects.project_members
WHERE project_id = '{{ project_id }}' -- required
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

Add a workspace member to a project with a specific role. The user must already be a member of the project's workspace. Backed by the Railway GraphQL mutation projectMemberAdd.

```sql
INSERT INTO railway.projects.project_members (
project_id,
role,
user_id
)
SELECT 
'{{ project_id }}' /* required */,
'{{ role }}' /* required */,
'{{ user_id }}' /* required */
RETURNING
id,
name,
avatar,
email,
role
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: project_members
  props:
    - name: project_id
      value: "{{ project_id }}"
    - name: role
      value: "{{ role }}"
      valid_values: ['ADMIN', 'MEMBER', 'VIEWER']
    - name: user_id
      value: "{{ user_id }}"
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

Change the role for a user within a project. Backed by the Railway GraphQL mutation projectMemberUpdate.

```sql
UPDATE railway.projects.project_members
SET 

WHERE 
project_id = '{{ project_id }}' --required
AND role = '{{ role }}' --required
AND user_id = '{{ user_id }}' --required
RETURNING
id,
name,
avatar,
email,
role;
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

Remove user from a project. Backed by the Railway GraphQL mutation projectMemberRemove.

```sql
DELETE FROM railway.projects.project_members
WHERE 
project_id = '{{ project_id }}' --required
AND user_id = '{{ user_id }}' --required
;
```
</TabItem>
</Tabs>
