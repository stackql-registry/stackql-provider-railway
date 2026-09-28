--- 
title: estimated_usage
hide_title: false
hide_table_of_contents: false
keywords:
  - estimated_usage
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

Creates, updates, deletes, gets or lists an <code>estimated_usage</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="estimated_usage" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.billing.estimated_usage" /></td></tr>
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

One row per EstimatedUsage. The estimated usage of a single measurement.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="estimated_value" /></td>
    <td><code>number</code></td>
    <td>The estimated value.</td>
</tr>
<tr>
    <td><CopyableCode code="measurement" /></td>
    <td><code>string</code></td>
    <td>The measurement that was estimated. (AGENT_CACHE_READ_TOKENS, AGENT_CACHE_WRITE_TOKENS, AGENT_INPUT_TOKENS, AGENT_OUTPUT_TOKENS, AGENT_SPEND_USD, BACKUP_USAGE_GB, CPU_LIMIT, CPU_USAGE, CPU_USAGE_2, DISK_USAGE_GB, EPHEMERAL_DISK_USAGE_GB, MEASUREMENT_UNSPECIFIED, MEMORY_LIMIT_GB, MEMORY_USAGE_GB, NETWORK_RX_GB, NETWORK_TX_GB, UNRECOGNIZED)</td>
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
    <td><a href="#parameter-include_deleted"><code>include_deleted</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Get the estimated total cost of the project at the end of the current billing cycle. If no `startDate` is provided, the usage for the current billing period of the project owner is returned. Backed by the Railway GraphQL query estimatedUsage.</td>
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
<tr id="parameter-include_deleted">
    <td><CopyableCode code="include_deleted" /></td>
    <td><code>boolean</code></td>
    <td>Whether to include deleted projects in estimations.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
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

Get the estimated total cost of the project at the end of the current billing cycle. If no `startDate` is provided, the usage for the current billing period of the project owner is returned. Backed by the Railway GraphQL query estimatedUsage.

```sql
SELECT
project_id,
estimated_value,
measurement
FROM railway.billing.estimated_usage
WHERE measurements = '{{ measurements }}' -- required
AND include_deleted = '{{ include_deleted }}'
AND project_id = '{{ project_id }}'
AND workspace_id = '{{ workspace_id }}'
;
```
</TabItem>
</Tabs>
