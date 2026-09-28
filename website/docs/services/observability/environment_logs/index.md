--- 
title: environment_logs
hide_title: false
hide_table_of_contents: false
keywords:
  - environment_logs
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

Creates, updates, deletes, gets or lists an <code>environment_logs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environment_logs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.environment_logs" /></td></tr>
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

One row per Log. The result of a logs query.

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
    <td><CopyableCode code="attributes" /></td>
    <td><code>array</code></td>
    <td>The attributes that were parsed from a structured log</td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td>The contents of the log message</td>
</tr>
<tr>
    <td><CopyableCode code="severity" /></td>
    <td><code>string</code></td>
    <td>The severity of the log message (eg. err)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>object</code></td>
    <td>The tags that were associated with the log</td>
</tr>
<tr>
    <td><CopyableCode code="timestamp" /></td>
    <td><code>string</code></td>
    <td>The timestamp of the log message in format RFC3339 (nano)</td>
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
    <td><a href="#parameter-after_date"><code>after_date</code></a>, <a href="#parameter-after_limit"><code>after_limit</code></a>, <a href="#parameter-anchor_date"><code>anchor_date</code></a>, <a href="#parameter-before_date"><code>before_date</code></a>, <a href="#parameter-before_limit"><code>before_limit</code></a>, <a href="#parameter-filter"><code>filter</code></a></td>
    <td>Fetch logs for a project environment. Build logs are excluded unless a snapshot ID is explicitly provided in the filter. Backed by the Railway GraphQL query environmentLogs.</td>
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
<tr id="parameter-after_date">
    <td><CopyableCode code="after_date" /></td>
    <td><code>string</code></td>
    <td>Latest date to look for logs after the anchor.</td>
</tr>
<tr id="parameter-after_limit">
    <td><CopyableCode code="after_limit" /></td>
    <td><code>integer</code></td>
    <td>Limit the number of logs returned after the anchor.</td>
</tr>
<tr id="parameter-anchor_date">
    <td><CopyableCode code="anchor_date" /></td>
    <td><code>string</code></td>
    <td>Target date time to look for logs.</td>
</tr>
<tr id="parameter-before_date">
    <td><CopyableCode code="before_date" /></td>
    <td><code>string</code></td>
    <td>Oldest date to look for logs before the anchor.</td>
</tr>
<tr id="parameter-before_limit">
    <td><CopyableCode code="before_limit" /></td>
    <td><code>integer</code></td>
    <td>Limit the number of logs returned before the anchor.</td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>string</code></td>
    <td>Filter logs using a query syntax.</td>
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

Fetch logs for a project environment. Build logs are excluded unless a snapshot ID is explicitly provided in the filter. Backed by the Railway GraphQL query environmentLogs.

```sql
SELECT
attributes,
message,
severity,
tags,
timestamp
FROM railway.observability.environment_logs
WHERE environment_id = '{{ environment_id }}' -- required
AND after_date = '{{ after_date }}'
AND after_limit = '{{ after_limit }}'
AND anchor_date = '{{ anchor_date }}'
AND before_date = '{{ before_date }}'
AND before_limit = '{{ before_limit }}'
AND filter = '{{ filter }}'
;
```
</TabItem>
</Tabs>
