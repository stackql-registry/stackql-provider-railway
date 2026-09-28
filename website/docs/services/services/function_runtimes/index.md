--- 
title: function_runtimes
hide_title: false
hide_table_of_contents: false
keywords:
  - function_runtimes
  - services
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

Creates, updates, deletes, gets or lists a <code>function_runtimes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="function_runtimes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.services.function_runtimes" /></td></tr>
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

One FunctionRuntime row.

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
    <td>The name of the function runtime (bun)</td>
</tr>
<tr>
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td>The image of the function runtime</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version" /></td>
    <td><code>object</code></td>
    <td>The latest version of the function runtime</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td>The versions of the function runtime</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per FunctionRuntime.

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
    <td>The name of the function runtime (bun)</td>
</tr>
<tr>
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td>The image of the function runtime</td>
</tr>
<tr>
    <td><CopyableCode code="latest_version" /></td>
    <td><code>object</code></td>
    <td>The latest version of the function runtime</td>
</tr>
<tr>
    <td><CopyableCode code="versions" /></td>
    <td><code>array</code></td>
    <td>The versions of the function runtime</td>
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
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Get information about a specific function runtime. Backed by the Railway GraphQL query functionRuntime.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>List available function runtimes. Backed by the Railway GraphQL query functionRuntimes.</td>
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
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
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

Get information about a specific function runtime. Backed by the Railway GraphQL query functionRuntime.

```sql
SELECT
name,
image,
latest_version,
versions
FROM railway.services.function_runtimes
WHERE name = '{{ name }}' -- required
;
```
</TabItem>
<TabItem value="list">

List available function runtimes. Backed by the Railway GraphQL query functionRuntimes.

```sql
SELECT
name,
image,
latest_version,
versions
FROM railway.services.function_runtimes
;
```
</TabItem>
</Tabs>
