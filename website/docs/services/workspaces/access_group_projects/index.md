--- 
title: access_group_projects
hide_title: false
hide_table_of_contents: false
keywords:
  - access_group_projects
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

Creates, updates, deletes, gets or lists an <code>access_group_projects</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="access_group_projects" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.access_group_projects" /></td></tr>
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
    <td><a href="#attach"><CopyableCode code="attach" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-access_group_id"><code>access_group_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Attach a project to an access group. Backed by the Railway GraphQL mutation accessGroupProjectAttach.</td>
</tr>
<tr>
    <td><a href="#detach"><CopyableCode code="detach" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-access_group_id"><code>access_group_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Detach a project from an access group. Backed by the Railway GraphQL mutation accessGroupProjectDetach.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `INSERT` examples

<Tabs
    defaultValue="attach"
    values={[
        { label: 'attach', value: 'attach' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="attach">

Attach a project to an access group. Backed by the Railway GraphQL mutation accessGroupProjectAttach.

```sql
INSERT INTO railway.workspaces.access_group_projects (
access_group_id,
project_id
)
SELECT 
'{{ access_group_id }}' /* required */,
'{{ project_id }}' /* required */
RETURNING
id,
access_group_id,
project_id,
access_group,
created_at,
project,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: access_group_projects
  props:
    - name: access_group_id
      value: "{{ access_group_id }}"
    - name: project_id
      value: "{{ project_id }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="detach"
    values={[
        { label: 'detach', value: 'detach' }
    ]}
>
<TabItem value="detach">

Detach a project from an access group. Backed by the Railway GraphQL mutation accessGroupProjectDetach.

```sql
DELETE FROM railway.workspaces.access_group_projects
WHERE 
access_group_id = '{{ access_group_id }}' --required
AND project_id = '{{ project_id }}' --required
;
```
</TabItem>
</Tabs>
