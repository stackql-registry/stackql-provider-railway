--- 
title: observability_dashboards
hide_title: false
hide_table_of_contents: false
keywords:
  - observability_dashboards
  - observability
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

Creates, updates, deletes, gets or lists an <code>observability_dashboards</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="observability_dashboards" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.observability_dashboards" /></td></tr>
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

One row per ObservabilityDashboard.

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
    <td><CopyableCode code="items" /></td>
    <td><code>array</code></td>
    <td>List of ObservabilityDashboardItemInstance objects</td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Get all observability dashboards for an environment. Backed by the Railway GraphQL query observabilityDashboards.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Create an observability dashboard. Backed by the Railway GraphQL mutation observabilityDashboardCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-input"><code>input</code></a></td>
    <td></td>
    <td>Update an observability dashboard. Backed by the Railway GraphQL mutation observabilityDashboardUpdate.</td>
</tr>
<tr>
    <td><a href="#reset"><CopyableCode code="reset" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Reset an observability dashboard to default dashboard items. Backed by the Railway GraphQL mutation observabilityDashboardReset.</td>
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
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-input">
    <td><CopyableCode code="input" /></td>
    <td><code>array</code></td>
    <td>JSON array of objects of GraphQL type ObservabilityDashboardUpdateInput; keys keep the API's camelCase names.</td>
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

Get all observability dashboards for an environment. Backed by the Railway GraphQL query observabilityDashboards.

```sql
SELECT
id,
items
FROM railway.observability.observability_dashboards
WHERE environment_id = '{{ environment_id }}' -- required
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

Create an observability dashboard. Backed by the Railway GraphQL mutation observabilityDashboardCreate.

```sql
INSERT INTO railway.observability.observability_dashboards (
environment_id,
items
)
SELECT 
'{{ environment_id }}' /* required */,
'{{ items }}'
RETURNING
result
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: observability_dashboards
  props:
    - name: environment_id
      value: "{{ environment_id }}"
    - name: items
      value: "{{ items }}"
      description: |
        If no items are provided, a default dashboard will be created. JSON array of objects of GraphQL type ObservabilityDashboardUpdateInput; keys keep the API's camelCase names.
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

Update an observability dashboard. Backed by the Railway GraphQL mutation observabilityDashboardUpdate.

```sql
UPDATE railway.observability.observability_dashboards
SET 

WHERE 
id = '{{ id }}' --required
AND input = '{{ input }}' --required
RETURNING
result;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="reset"
    values={[
        { label: 'reset', value: 'reset' }
    ]}
>
<TabItem value="reset">

Reset an observability dashboard to default dashboard items. Backed by the Railway GraphQL mutation observabilityDashboardReset.

```sql
EXEC railway.observability.observability_dashboards.reset 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
