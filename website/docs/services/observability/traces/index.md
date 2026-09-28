--- 
title: traces
hide_title: false
hide_table_of_contents: false
keywords:
  - traces
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

Creates, updates, deletes, gets or lists a <code>traces</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="traces" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.traces" /></td></tr>
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

One row per TraceSummary. One trace of an environment: the request as a whole, summarised from its spans.

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
    <td><CopyableCode code="root_service_id" /></td>
    <td><code>string</code></td>
    <td>Railway service the root span belongs to</td>
</tr>
<tr>
    <td><CopyableCode code="trace_id" /></td>
    <td><code>string</code></td>
    <td>W3C trace id, 32 lower-case hex characters</td>
</tr>
<tr>
    <td><CopyableCode code="root_service_name" /></td>
    <td><code>string</code></td>
    <td>The root span's service.name</td>
</tr>
<tr>
    <td><CopyableCode code="root_span_name" /></td>
    <td><code>string</code></td>
    <td>Name of the root span, or of the earliest span when the root is missing</td>
</tr>
<tr>
    <td><CopyableCode code="service_name" /></td>
    <td><code>string</code></td>
    <td>service.name of the earliest span a service exported; null when the request never reached one</td>
</tr>
<tr>
    <td><CopyableCode code="duration_ms" /></td>
    <td><code>number</code></td>
    <td>From the earliest span start to the latest span end</td>
</tr>
<tr>
    <td><CopyableCode code="error_count" /></td>
    <td><code>integer</code></td>
    <td>Spans with an error status</td>
</tr>
<tr>
    <td><CopyableCode code="has_edge" /></td>
    <td><code>boolean</code></td>
    <td>Whether the edge exported any span of the trace</td>
</tr>
<tr>
    <td><CopyableCode code="root_component" /></td>
    <td><code>string</code></td>
    <td>Which hop exported the root span: edge (hikari), proxy (tcp-proxy) or service</td>
</tr>
<tr>
    <td><CopyableCode code="root_server_address" /></td>
    <td><code>string</code></td>
    <td>The root span's server.address, when it set one</td>
</tr>
<tr>
    <td><CopyableCode code="root_url_path" /></td>
    <td><code>string</code></td>
    <td>The root span's url.path, when it set one</td>
</tr>
<tr>
    <td><CopyableCode code="span_count" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>string</code></td>
    <td>Start of the earliest span (ISO timestamp)</td>
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
    <td><a href="#parameter-end_date"><code>end_date</code></a>, <a href="#parameter-filter"><code>filter</code></a>, <a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-start_date"><code>start_date</code></a></td>
    <td>Traces of an environment with at least one span matching the filter, newest first. Backed by the Railway GraphQL query traces. A SQL LIMIT is pushed down to the limit argument.</td>
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
<tr id="parameter-end_date">
    <td><CopyableCode code="end_date" /></td>
    <td><code>string</code></td>
    <td>Latest span start to consider (ISO); defaults to now.</td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>string</code></td>
    <td>Filter expression over spans, e.g. @status:error @component:edge @duration:&gt;500 @http.route:/api/users. Built-in fields: trace, span, name, serviceName, service, deployment, replica, component, kind, status, duration (ms). Any other @key looks the key up in the span and resource attributes; free text matches the span name. Prefix a term with - to exclude it.</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Only traces with a span from this Railway service (optional).</td>
</tr>
<tr id="parameter-start_date">
    <td><CopyableCode code="start_date" /></td>
    <td><code>string</code></td>
    <td>Oldest span start to consider (ISO). Clamped to the project's retention; defaults to one hour ago.</td>
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

Traces of an environment with at least one span matching the filter, newest first. Backed by the Railway GraphQL query traces. A SQL LIMIT is pushed down to the limit argument.

```sql
SELECT
root_service_id,
trace_id,
root_service_name,
root_span_name,
service_name,
duration_ms,
error_count,
has_edge,
root_component,
root_server_address,
root_url_path,
span_count,
started_at
FROM railway.observability.traces
WHERE environment_id = '{{ environment_id }}' -- required
AND end_date = '{{ end_date }}'
AND filter = '{{ filter }}'
AND service_id = '{{ service_id }}'
AND start_date = '{{ start_date }}'
;
```
</TabItem>
</Tabs>
