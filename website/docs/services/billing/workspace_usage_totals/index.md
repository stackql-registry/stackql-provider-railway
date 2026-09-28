--- 
title: workspace_usage_totals
hide_title: false
hide_table_of_contents: false
keywords:
  - workspace_usage_totals
  - billing
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

Creates, updates, deletes, gets or lists a <code>workspace_usage_totals</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workspace_usage_totals" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.billing.workspace_usage_totals" /></td></tr>
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

One row per AggregatedUsage. The aggregated usage of a single measurement.

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
    <td><CopyableCode code="measurement" /></td>
    <td><code>string</code></td>
    <td>The measurement that was aggregated. (AGENT_CACHE_READ_TOKENS, AGENT_CACHE_WRITE_TOKENS, AGENT_INPUT_TOKENS, AGENT_OUTPUT_TOKENS, AGENT_SPEND_USD, BACKUP_USAGE_GB, CPU_LIMIT, CPU_USAGE, CPU_USAGE_2, DISK_USAGE_GB, EPHEMERAL_DISK_USAGE_GB, MEASUREMENT_UNSPECIFIED, MEMORY_LIMIT_GB, MEMORY_USAGE_GB, NETWORK_RX_GB, NETWORK_TX_GB, UNRECOGNIZED)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>object</code></td>
    <td>The tags that were used to group the metric. Only the tags that were used in the `groupBy` will be present.</td>
</tr>
<tr>
    <td><CopyableCode code="value" /></td>
    <td><code>number</code></td>
    <td>The aggregated value.</td>
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
    <td><a href="#parameter-measurements"><code>measurements</code></a></td>
    <td><a href="#parameter-end_date"><code>end_date</code></a>, <a href="#parameter-include_deleted"><code>include_deleted</code></a>, <a href="#parameter-start_date"><code>start_date</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Workspace-wide SUM of the same UI usage rollup as `usage` grouped by project. Use this for the usage-page header so it does not wait on per-project rows. Deleted projects that still bill are included when `includeDeleted` is true. Backed by the Railway GraphQL query workspaceUsageTotals.</td>
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
<tr id="parameter-measurements">
    <td><CopyableCode code="measurements" /></td>
    <td><code>string</code></td>
    <td>GraphQL list literal of MetricMeasurement values, for example &#91;AGENT_CACHE_READ_TOKENS, AGENT_CACHE_WRITE_TOKENS&#93;.</td>
</tr>
<tr id="parameter-end_date">
    <td><CopyableCode code="end_date" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr id="parameter-include_deleted">
    <td><CopyableCode code="include_deleted" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include deleted projects in the usage.</td>
</tr>
<tr id="parameter-start_date">
    <td><CopyableCode code="start_date" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
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

Workspace-wide SUM of the same UI usage rollup as `usage` grouped by project. Use this for the usage-page header so it does not wait on per-project rows. Deleted projects that still bill are included when `includeDeleted` is true. Backed by the Railway GraphQL query workspaceUsageTotals.

```sql
SELECT
measurement,
tags,
value
FROM railway.billing.workspace_usage_totals
WHERE measurements = '{{ measurements }}' -- required
AND end_date = '{{ end_date }}'
AND include_deleted = '{{ include_deleted }}'
AND start_date = '{{ start_date }}'
AND workspace_id = '{{ workspace_id }}'
;
```
</TabItem>
</Tabs>
