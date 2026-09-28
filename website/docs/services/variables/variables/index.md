--- 
title: variables
hide_title: false
hide_table_of_contents: false
keywords:
  - variables
  - variables
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

Creates, updates, deletes, gets or lists a <code>variables</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="variables" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.variables.variables" /></td></tr>
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

One row per entry of the map.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td>Entry name</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td>Entry value</td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-unrendered"><code>unrendered</code></a></td>
    <td>All variables by pluginId or serviceId. If neither are provided, all shared variables are returned. Backed by the Railway GraphQL query variables.</td>
</tr>
<tr>
    <td><a href="#upsert"><CopyableCode code="upsert" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-value"><code>value</code></a></td>
    <td></td>
    <td>Upserts a variable. Backed by the Railway GraphQL mutation variableUpsert.</td>
</tr>
<tr>
    <td><a href="#upsert_collection"><CopyableCode code="upsert_collection" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-variables"><code>variables</code></a></td>
    <td></td>
    <td>Upserts a collection of variables. Backed by the Railway GraphQL mutation variableCollectionUpsert.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a></td>
    <td>Deletes a variable. Backed by the Railway GraphQL mutation variableDelete.</td>
</tr>
<tr>
    <td><a href="#configure_shared"><CopyableCode code="configure_shared" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-disabled_service_ids"><code>disabled_service_ids</code></a>, <a href="#parameter-enabled_service_ids"><code>enabled_service_ids</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Configure a shared variable. Backed by the Railway GraphQL mutation sharedVariableConfigure.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Provide a serviceId to get all variables for a specific service.</td>
</tr>
<tr id="parameter-unrendered">
    <td><CopyableCode code="unrendered" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-disabled_service_ids">
    <td><CopyableCode code="disabled_service_ids" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-enabled_service_ids">
    <td><CopyableCode code="enabled_service_ids" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-value">
    <td><CopyableCode code="value" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-variables">
    <td><CopyableCode code="variables" /></td>
    <td><code>object</code></td>
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

All variables by pluginId or serviceId. If neither are provided, all shared variables are returned. Backed by the Railway GraphQL query variables.

```sql
SELECT
name,
value
FROM railway.variables.variables
WHERE environment_id = '{{ environment_id }}' -- required
AND project_id = '{{ project_id }}' -- required
AND service_id = '{{ service_id }}'
AND unrendered = '{{ unrendered }}'
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="upsert"
    values={[
        { label: 'upsert', value: 'upsert' },
        { label: 'upsert_collection', value: 'upsert_collection' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="upsert">

Upserts a variable. Backed by the Railway GraphQL mutation variableUpsert.

```sql
INSERT INTO railway.variables.variables (
environment_id,
name,
project_id,
service_id,
skip_deploys,
value
)
SELECT 
'{{ environment_id }}' /* required */,
'{{ name }}' /* required */,
'{{ project_id }}' /* required */,
'{{ service_id }}',
{{ skip_deploys }},
'{{ value }}' /* required */
RETURNING
result
;
```
</TabItem>
<TabItem value="upsert_collection">

Upserts a collection of variables. Backed by the Railway GraphQL mutation variableCollectionUpsert.

```sql
INSERT INTO railway.variables.variables (
environment_id,
project_id,
replace_,
service_id,
skip_deploys,
variables
)
SELECT 
'{{ environment_id }}' /* required */,
'{{ project_id }}' /* required */,
{{ replace_ }},
'{{ service_id }}',
{{ skip_deploys }},
'{{ variables }}' /* required */
RETURNING
result
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: variables
  props:
    - name: environment_id
      value: "{{ environment_id }}"
    - name: name
      value: "{{ name }}"
    - name: project_id
      value: "{{ project_id }}"
    - name: service_id
      value: "{{ service_id }}"
    - name: skip_deploys
      value: {{ skip_deploys }}
      description: |
        Skip deploys for affected services.
    - name: value
      value: "{{ value }}"
    - name: replace_
      value: {{ replace_ }}
      description: |
        When set to true, removes all existing variables before upserting the new collection.
    - name: variables
      value: "{{ variables }}"
`}</CodeBlock>

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

Deletes a variable. Backed by the Railway GraphQL mutation variableDelete.

```sql
DELETE FROM railway.variables.variables
WHERE 
environment_id = '{{ environment_id }}' --required
AND name = '{{ name }}' --required
AND project_id = '{{ project_id }}' --required
AND service_id = '{{ service_id }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="configure_shared"
    values={[
        { label: 'configure_shared', value: 'configure_shared' }
    ]}
>
<TabItem value="configure_shared">

Configure a shared variable. Backed by the Railway GraphQL mutation sharedVariableConfigure.

```sql
EXEC railway.variables.variables.configure_shared 
@disabled_service_ids='{{ disabled_service_ids }}', --required
@enabled_service_ids='{{ enabled_service_ids }}', --required
@environment_id='{{ environment_id }}', --required
@name='{{ name }}', --required
@project_id='{{ project_id }}' --required
;
```
</TabItem>
</Tabs>
