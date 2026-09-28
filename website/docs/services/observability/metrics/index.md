--- 
title: metrics
hide_title: false
hide_table_of_contents: false
keywords:
  - metrics
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

Creates, updates, deletes, gets or lists a <code>metrics</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="metrics" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.metrics" /></td></tr>
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

One row per MetricsResult. The result of a metrics query.

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
    <td>The measurement of the metric. (AGENT_CACHE_READ_TOKENS, AGENT_CACHE_WRITE_TOKENS, AGENT_INPUT_TOKENS, AGENT_OUTPUT_TOKENS, AGENT_SPEND_USD, BACKUP_USAGE_GB, CPU_LIMIT, CPU_USAGE, CPU_USAGE_2, DISK_USAGE_GB, EPHEMERAL_DISK_USAGE_GB, MEASUREMENT_UNSPECIFIED, MEMORY_LIMIT_GB, MEMORY_USAGE_GB, NETWORK_RX_GB, NETWORK_TX_GB, UNRECOGNIZED)</td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>object</code></td>
    <td>The tags that were used to group the metric. Only the tags that were used to by will be present.</td>
</tr>
<tr>
    <td><CopyableCode code="values_" /></td>
    <td><code>array</code></td>
    <td>The samples of the metric.</td>
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
    <td><a href="#parameter-measurements"><code>measurements</code></a>, <a href="#parameter-start_date"><code>start_date</code></a></td>
    <td><a href="#parameter-averaging_window_seconds"><code>averaging_window_seconds</code></a>, <a href="#parameter-end_date"><code>end_date</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-group_by"><code>group_by</code></a>, <a href="#parameter-include_deleted"><code>include_deleted</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-sample_rate_seconds"><code>sample_rate_seconds</code></a>, <a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-volume_id"><code>volume_id</code></a>, <a href="#parameter-volume_instance_external_id"><code>volume_instance_external_id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Get metrics for a project, environment, and service. Backed by the Railway GraphQL query metrics.</td>
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
<tr id="parameter-start_date">
    <td><CopyableCode code="start_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The start of the period to get metrics for.</td>
</tr>
<tr id="parameter-averaging_window_seconds">
    <td><CopyableCode code="averaging_window_seconds" /></td>
    <td><code>integer</code></td>
    <td>The averaging window when computing CPU usage. By default, it is the same as the `sampleRateSeconds`.</td>
</tr>
<tr id="parameter-end_date">
    <td><CopyableCode code="end_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The end of the period to get metrics for. If not provided, the current datetime is used.</td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-group_by">
    <td><CopyableCode code="group_by" /></td>
    <td><code>string</code></td>
    <td>What to group the aggregated usage by. By default, it is grouped over the entire project. GraphQL list literal of MetricTag values, for example &#91;BILLABLE, DEPLOYMENT_ID&#93;.</td>
</tr>
<tr id="parameter-include_deleted">
    <td><CopyableCode code="include_deleted" /></td>
    <td><code>boolean</code></td>
    <td>Whether or not to include deleted projects in the results.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-sample_rate_seconds">
    <td><CopyableCode code="sample_rate_seconds" /></td>
    <td><code>integer</code></td>
    <td>The frequency of data points in the response. If the `sampleRateSeconds` is 60, then the response will contain one data point per minute.</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-volume_id">
    <td><CopyableCode code="volume_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-volume_instance_external_id">
    <td><CopyableCode code="volume_instance_external_id" /></td>
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

Get metrics for a project, environment, and service. Backed by the Railway GraphQL query metrics.

```sql
SELECT
measurement,
tags,
values_
FROM railway.observability.metrics
WHERE measurements = '{{ measurements }}' -- required
AND start_date = '{{ start_date }}' -- required
AND averaging_window_seconds = '{{ averaging_window_seconds }}'
AND end_date = '{{ end_date }}'
AND environment_id = '{{ environment_id }}'
AND group_by = '{{ group_by }}'
AND include_deleted = '{{ include_deleted }}'
AND project_id = '{{ project_id }}'
AND sample_rate_seconds = '{{ sample_rate_seconds }}'
AND service_id = '{{ service_id }}'
AND volume_id = '{{ volume_id }}'
AND volume_instance_external_id = '{{ volume_instance_external_id }}'
AND workspace_id = '{{ workspace_id }}'
;
```
</TabItem>
</Tabs>
