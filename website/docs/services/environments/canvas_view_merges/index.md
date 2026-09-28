--- 
title: canvas_view_merges
hide_title: false
hide_table_of_contents: false
keywords:
  - canvas_view_merges
  - environments
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

Creates, updates, deletes, gets or lists a <code>canvas_view_merges</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="canvas_view_merges" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.environments.canvas_view_merges" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_preview"
    values={[
        { label: 'get_preview', value: 'get_preview' }
    ]}
>
<TabItem value="get_preview">

One CanvasViewMergePreview row.

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
    <td><CopyableCode code="mutations" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
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
    <td><a href="#get_preview"><CopyableCode code="get_preview" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-source_environment_id"><code>source_environment_id</code></a>, <a href="#parameter-target_environment_id"><code>target_environment_id</code></a></td>
    <td></td>
    <td>Preview a canvas layout merge from one environment to another. Returns the merged state and the mutations needed to reach it. Backed by the Railway GraphQL query canvasViewMergePreview.</td>
</tr>
<tr>
    <td><a href="#merge"><CopyableCode code="merge" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-source_environment_id"><code>source_environment_id</code></a>, <a href="#parameter-target_environment_id"><code>target_environment_id</code></a></td>
    <td></td>
    <td>Merge a canvas layout from one environment into another. Re-computes the merge from current state and applies mutations. Backed by the Railway GraphQL mutation canvasViewMerge.</td>
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
<tr id="parameter-source_environment_id">
    <td><CopyableCode code="source_environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-target_environment_id">
    <td><CopyableCode code="target_environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_preview"
    values={[
        { label: 'get_preview', value: 'get_preview' }
    ]}
>
<TabItem value="get_preview">

Preview a canvas layout merge from one environment to another. Returns the merged state and the mutations needed to reach it. Backed by the Railway GraphQL query canvasViewMergePreview.

```sql
SELECT
mutations,
state
FROM railway.environments.canvas_view_merges
WHERE source_environment_id = '{{ source_environment_id }}' -- required
AND target_environment_id = '{{ target_environment_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="merge"
    values={[
        { label: 'merge', value: 'merge' }
    ]}
>
<TabItem value="merge">

Merge a canvas layout from one environment into another. Re-computes the merge from current state and applies mutations. Backed by the Railway GraphQL mutation canvasViewMerge.

```sql
EXEC railway.environments.canvas_view_merges.merge 
@source_environment_id='{{ source_environment_id }}', --required
@target_environment_id='{{ target_environment_id }}' --required
;
```
</TabItem>
</Tabs>
