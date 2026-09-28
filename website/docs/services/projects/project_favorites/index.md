--- 
title: project_favorites
hide_title: false
hide_table_of_contents: false
keywords:
  - project_favorites
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

Creates, updates, deletes, gets or lists a <code>project_favorites</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_favorites" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.projects.project_favorites" /></td></tr>
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

One row per value, as the result column.

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
    <td><CopyableCode code="result" /></td>
    <td><code>string</code></td>
    <td>projectFavorites value</td>
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
    <td><a href="#parameter-order_by"><code>order_by</code></a></td>
    <td>The authenticated user's favorited project ids in a workspace, in the order the Favorites row should render them. Defaults to the order they were starred in. Backed by the Railway GraphQL query projectFavorites.</td>
</tr>
<tr>
    <td><a href="#set"><CopyableCode code="set" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-favorite"><code>favorite</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Star or unstar a project for the authenticated user. Returns the resulting state. Backed by the Railway GraphQL mutation projectFavoriteSet.</td>
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
<tr id="parameter-order_by">
    <td><CopyableCode code="order_by" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-favorite">
    <td><CopyableCode code="favorite" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
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

The authenticated user's favorited project ids in a workspace, in the order the Favorites row should render them. Defaults to the order they were starred in. Backed by the Railway GraphQL query projectFavorites.

```sql
SELECT
result
FROM railway.projects.project_favorites
WHERE workspace_id = '{{ workspace_id }}' -- required
AND order_by = '{{ order_by }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="set"
    values={[
        { label: 'set', value: 'set' }
    ]}
>
<TabItem value="set">

Star or unstar a project for the authenticated user. Returns the resulting state. Backed by the Railway GraphQL mutation projectFavoriteSet.

```sql
EXEC railway.projects.project_favorites.set 
@favorite='{{ favorite }}', --required
@project_id='{{ project_id }}' --required
;
```
</TabItem>
</Tabs>
