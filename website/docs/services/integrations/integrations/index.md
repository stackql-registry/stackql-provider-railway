--- 
title: integrations
hide_title: false
hide_table_of_contents: false
keywords:
  - integrations
  - integrations
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

Creates, updates, deletes, gets or lists an <code>integrations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="integrations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.integrations.integrations" /></td></tr>
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

One row per Integration.

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
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Get all integrations for a project. Backed by the Railway GraphQL query integrations.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-config"><code>config</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Create an integration for a project. Backed by the Railway GraphQL mutation integrationCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-config"><code>config</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Update an integration for a project. Backed by the Railway GraphQL mutation integrationUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete an integration for a project. Backed by the Railway GraphQL mutation integrationDelete.</td>
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
<tr id="parameter-config">
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
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

Get all integrations for a project. Backed by the Railway GraphQL query integrations.

```sql
SELECT
id,
name,
project_id,
config
FROM railway.integrations.integrations
WHERE project_id = '{{ project_id }}' -- required
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

Create an integration for a project. Backed by the Railway GraphQL mutation integrationCreate.

```sql
INSERT INTO railway.integrations.integrations (
config,
integration_auth_id,
name,
project_id
)
SELECT 
'{{ config }}' /* required */,
'{{ integration_auth_id }}',
'{{ name }}' /* required */,
'{{ project_id }}' /* required */
RETURNING
id,
name,
project_id,
config
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: integrations
  props:
    - name: config
      value: "{{ config }}"
    - name: integration_auth_id
      value: "{{ integration_auth_id }}"
    - name: name
      value: "{{ name }}"
    - name: project_id
      value: "{{ project_id }}"
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

Update an integration for a project. Backed by the Railway GraphQL mutation integrationUpdate.

```sql
UPDATE railway.integrations.integrations
SET 
integration_auth_id = '{{ integration_auth_id }}'
WHERE 
id = '{{ id }}' --required
AND config = '{{ config }}' --required
AND name = '{{ name }}' --required
AND project_id = '{{ project_id }}' --required
RETURNING
id,
name,
project_id,
config;
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

Delete an integration for a project. Backed by the Railway GraphQL mutation integrationDelete.

```sql
DELETE FROM railway.integrations.integrations
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>
