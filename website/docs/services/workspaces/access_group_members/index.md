--- 
title: access_group_members
hide_title: false
hide_table_of_contents: false
keywords:
  - access_group_members
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

Creates, updates, deletes, gets or lists an <code>access_group_members</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="access_group_members" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.access_group_members" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

`SELECT` not supported for this resource, use `SHOW METHODS` to view available operations for the resource.


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
    <td><a href="#add"><CopyableCode code="add" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-access_group_id"><code>access_group_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Add a workspace member to an access group. Backed by the Railway GraphQL mutation accessGroupMemberAdd.</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-access_group_id"><code>access_group_id</code></a>, <a href="#parameter-user_id"><code>user_id</code></a></td>
    <td></td>
    <td>Remove a member from an access group. Backed by the Railway GraphQL mutation accessGroupMemberRemove.</td>
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
<tr id="parameter-access_group_id">
    <td><CopyableCode code="access_group_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-user_id">
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="add"
    values={[
        { label: 'add', value: 'add' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="add">

Add a workspace member to an access group. Backed by the Railway GraphQL mutation accessGroupMemberAdd.

```sql
INSERT INTO railway.workspaces.access_group_members (
access_group_id,
user_id
)
SELECT 
'{{ access_group_id }}' /* required */,
'{{ user_id }}' /* required */
RETURNING
id,
access_group_id,
user_id,
access_group,
created_at,
updated_at,
user
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: access_group_members
  props:
    - name: access_group_id
      value: "{{ access_group_id }}"
    - name: user_id
      value: "{{ user_id }}"
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

Remove a member from an access group. Backed by the Railway GraphQL mutation accessGroupMemberRemove.

```sql
DELETE FROM railway.workspaces.access_group_members
WHERE 
access_group_id = '{{ access_group_id }}' --required
AND user_id = '{{ user_id }}' --required
;
```
</TabItem>
</Tabs>
