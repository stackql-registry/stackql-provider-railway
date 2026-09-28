--- 
title: trace_spans
hide_title: false
hide_table_of_contents: false
keywords:
  - trace_spans
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

Creates, updates, deletes, gets or lists a <code>trace_spans</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="trace_spans" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.trace_spans" /></td></tr>
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

One row per TraceSpan. One span of a trace.

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
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deployment_instance_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="parent_span_id" /></td>
    <td><code>string</code></td>
    <td>Absent on a root span</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Railway service the span belongs to, when known</td>
</tr>
<tr>
    <td><CopyableCode code="span_id" /></td>
    <td><code>string</code></td>
    <td>16 lower-case hex characters</td>
</tr>
<tr>
    <td><CopyableCode code="trace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_name" /></td>
    <td><code>string</code></td>
    <td>The exporter's service.name resource attribute</td>
</tr>
<tr>
    <td><CopyableCode code="component" /></td>
    <td><code>string</code></td>
    <td>Which hop exported the span: edge, proxy or service</td>
</tr>
<tr>
    <td><CopyableCode code="duration_ms" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="events" /></td>
    <td><code>array</code></td>
    <td>List of TraceSpanEvent objects</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td>INTERNAL, SERVER, CLIENT, PRODUCER, CONSUMER or UNSPECIFIED</td>
</tr>
<tr>
    <td><CopyableCode code="links" /></td>
    <td><code>array</code></td>
    <td>List of TraceSpanLink objects</td>
</tr>
<tr>
    <td><CopyableCode code="resource_attributes" /></td>
    <td><code>object</code></td>
    <td>Resource attributes as exported, without the railway.* keys Railway promotes into typed fields</td>
</tr>
<tr>
    <td><CopyableCode code="span_attributes" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>string</code></td>
    <td>ISO timestamp</td>
</tr>
<tr>
    <td><CopyableCode code="status_code" /></td>
    <td><code>string</code></td>
    <td>UNSET, OK or ERROR</td>
</tr>
<tr>
    <td><CopyableCode code="status_message" /></td>
    <td><code>string</code></td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-trace_id"><code>trace_id</code></a></td>
    <td><a href="#parameter-max_spans"><code>max_spans</code></a></td>
    <td>The spans of one trace, oldest first. Only spans belonging to the environment are returned. Backed by the Railway GraphQL query trace.</td>
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
<tr id="parameter-trace_id">
    <td><CopyableCode code="trace_id" /></td>
    <td><code>string</code></td>
    <td>W3C trace id, 32 hex characters.</td>
</tr>
<tr id="parameter-max_spans">
    <td><CopyableCode code="max_spans" /></td>
    <td><code>integer</code></td>
    <td>Spans returned (defaults 1000, max 2000).</td>
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

The spans of one trace, oldest first. Only spans belonging to the environment are returned. Backed by the Railway GraphQL query trace.

```sql
SELECT
name,
deployment_id,
deployment_instance_id,
parent_span_id,
service_id,
span_id,
trace_id,
service_name,
component,
duration_ms,
events,
kind,
links,
resource_attributes,
span_attributes,
started_at,
status_code,
status_message
FROM railway.observability.trace_spans
WHERE environment_id = '{{ environment_id }}' -- required
AND trace_id = '{{ trace_id }}' -- required
AND max_spans = '{{ max_spans }}'
;
```
</TabItem>
</Tabs>
