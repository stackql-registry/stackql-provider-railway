--- 
title: http_logs
hide_title: false
hide_table_of_contents: false
keywords:
  - http_logs
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

Creates, updates, deletes, gets or lists a <code>http_logs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="http_logs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.http_logs" /></td></tr>
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

One row per HttpLog. The result of a http logs query.

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
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string</code></td>
    <td>The deployment ID that was requested</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_instance_id" /></td>
    <td><code>string</code></td>
    <td>The deployment instance ID that was requested</td>
</tr>
<tr>
    <td><CopyableCode code="request_id" /></td>
    <td><code>string</code></td>
    <td>The unique request ID</td>
</tr>
<tr>
    <td><CopyableCode code="client_ua" /></td>
    <td><code>string</code></td>
    <td>The client user agent</td>
</tr>
<tr>
    <td><CopyableCode code="downstream_proto" /></td>
    <td><code>string</code></td>
    <td>The downstream HTTP protocol version</td>
</tr>
<tr>
    <td><CopyableCode code="edge_region" /></td>
    <td><code>string</code></td>
    <td>The edge region the client connected to</td>
</tr>
<tr>
    <td><CopyableCode code="host" /></td>
    <td><code>string</code></td>
    <td>The requested host</td>
</tr>
<tr>
    <td><CopyableCode code="http_status" /></td>
    <td><code>integer</code></td>
    <td>The http status of the log</td>
</tr>
<tr>
    <td><CopyableCode code="method" /></td>
    <td><code>string</code></td>
    <td>The request HTTP method</td>
</tr>
<tr>
    <td><CopyableCode code="path" /></td>
    <td><code>string</code></td>
    <td>The requested path</td>
</tr>
<tr>
    <td><CopyableCode code="response_details" /></td>
    <td><code>string</code></td>
    <td>Details about the upstream response</td>
</tr>
<tr>
    <td><CopyableCode code="rx_bytes" /></td>
    <td><code>integer</code></td>
    <td>Received bytes</td>
</tr>
<tr>
    <td><CopyableCode code="src_ip" /></td>
    <td><code>string</code></td>
    <td>The source IP of the request</td>
</tr>
<tr>
    <td><CopyableCode code="timestamp" /></td>
    <td><code>string</code></td>
    <td>The timestamp the log was created</td>
</tr>
<tr>
    <td><CopyableCode code="total_duration" /></td>
    <td><code>integer</code></td>
    <td>The total duration the request took</td>
</tr>
<tr>
    <td><CopyableCode code="tx_bytes" /></td>
    <td><code>integer</code></td>
    <td>Outgoing bytes</td>
</tr>
<tr>
    <td><CopyableCode code="upstream_address" /></td>
    <td><code>string</code></td>
    <td>The upstream address</td>
</tr>
<tr>
    <td><CopyableCode code="upstream_errors" /></td>
    <td><code>string</code></td>
    <td>Any upstream errors that occurred</td>
</tr>
<tr>
    <td><CopyableCode code="upstream_proto" /></td>
    <td><code>string</code></td>
    <td>The upstream HTTP protocol version</td>
</tr>
<tr>
    <td><CopyableCode code="upstream_rq_duration" /></td>
    <td><code>integer</code></td>
    <td>How long the upstream request took to respond</td>
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
    <td><a href="#parameter-deployment_id"><code>deployment_id</code></a></td>
    <td><a href="#parameter-after_date"><code>after_date</code></a>, <a href="#parameter-after_limit"><code>after_limit</code></a>, <a href="#parameter-anchor_date"><code>anchor_date</code></a>, <a href="#parameter-before_date"><code>before_date</code></a>, <a href="#parameter-before_limit"><code>before_limit</code></a>, <a href="#parameter-filter"><code>filter</code></a></td>
    <td>Fetch HTTP logs for a deployment. Backed by the Railway GraphQL query httpLogs. A SQL LIMIT is pushed down to the limit argument.</td>
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
<tr id="parameter-deployment_id">
    <td><CopyableCode code="deployment_id" /></td>
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

Fetch HTTP logs for a deployment. Backed by the Railway GraphQL query httpLogs. A SQL LIMIT is pushed down to the limit argument.

```sql
SELECT
deployment_id,
deployment_instance_id,
request_id,
client_ua,
downstream_proto,
edge_region,
host,
http_status,
method,
path,
response_details,
rx_bytes,
src_ip,
timestamp,
total_duration,
tx_bytes,
upstream_address,
upstream_errors,
upstream_proto,
upstream_rq_duration
FROM railway.observability.http_logs
WHERE deployment_id = '{{ deployment_id }}' -- required
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
