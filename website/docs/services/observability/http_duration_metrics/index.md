--- 
title: http_duration_metrics
hide_title: false
hide_table_of_contents: false
keywords:
  - http_duration_metrics
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

Creates, updates, deletes, gets or lists a <code>http_duration_metrics</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="http_duration_metrics" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.http_duration_metrics" /></td></tr>
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

One row per HttpDurationMetricsSample. A single sample of HTTP duration metrics.

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
    <td><CopyableCode code="p50" /></td>
    <td><code>number</code></td>
    <td>50th percentile (median) request duration in milliseconds.</td>
</tr>
<tr>
    <td><CopyableCode code="p90" /></td>
    <td><code>number</code></td>
    <td>90th percentile request duration in milliseconds.</td>
</tr>
<tr>
    <td><CopyableCode code="p95" /></td>
    <td><code>number</code></td>
    <td>95th percentile request duration in milliseconds.</td>
</tr>
<tr>
    <td><CopyableCode code="p99" /></td>
    <td><code>number</code></td>
    <td>99th percentile request duration in milliseconds.</td>
</tr>
<tr>
    <td><CopyableCode code="ts" /></td>
    <td><code>integer</code></td>
    <td>The timestamp of the sample. Represented as number of seconds since the Unix epoch.</td>
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
    <td><a href="#parameter-end_date"><code>end_date</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-start_date"><code>start_date</code></a></td>
    <td><a href="#parameter-method"><code>method</code></a>, <a href="#parameter-path"><code>path</code></a>, <a href="#parameter-status_code"><code>status_code</code></a>, <a href="#parameter-step_seconds"><code>step_seconds</code></a></td>
    <td>Get HTTP request duration metrics for a service (avg, p50, p90, p95, p99). Backed by the Railway GraphQL query httpDurationMetrics.</td>
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
<tr id="parameter-end_date">
    <td><CopyableCode code="end_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The end of the period to get metrics for.</td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-start_date">
    <td><CopyableCode code="start_date" /></td>
    <td><code>string (date-time)</code></td>
    <td>The start of the period to get metrics for.</td>
</tr>
<tr id="parameter-method">
    <td><CopyableCode code="method" /></td>
    <td><code>string</code></td>
    <td>Filter by HTTP method (e.g., GET, POST).</td>
</tr>
<tr id="parameter-path">
    <td><CopyableCode code="path" /></td>
    <td><code>string</code></td>
    <td>Filter by request path.</td>
</tr>
<tr id="parameter-status_code">
    <td><CopyableCode code="status_code" /></td>
    <td><code>integer</code></td>
    <td>Filter by HTTP status code (e.g., 200, 404, 500).</td>
</tr>
<tr id="parameter-step_seconds">
    <td><CopyableCode code="step_seconds" /></td>
    <td><code>integer</code></td>
    <td>The frequency of data points in the response. If the `stepSeconds` is 60, then the response will contain one data point per minute.</td>
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

Get HTTP request duration metrics for a service (avg, p50, p90, p95, p99). Backed by the Railway GraphQL query httpDurationMetrics.

```sql
SELECT
p50,
p90,
p95,
p99,
ts
FROM railway.observability.http_duration_metrics
WHERE end_date = '{{ end_date }}' -- required
AND environment_id = '{{ environment_id }}' -- required
AND service_id = '{{ service_id }}' -- required
AND start_date = '{{ start_date }}' -- required
AND method = '{{ method }}'
AND path = '{{ path }}'
AND status_code = '{{ status_code }}'
AND step_seconds = '{{ step_seconds }}'
;
```
</TabItem>
</Tabs>
