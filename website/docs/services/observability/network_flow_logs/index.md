--- 
title: network_flow_logs
hide_title: false
hide_table_of_contents: false
keywords:
  - network_flow_logs
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

Creates, updates, deletes, gets or lists a <code>network_flow_logs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="network_flow_logs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.network_flow_logs" /></td></tr>
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

One row per NetworkFlowLog. A single network flow log entry.

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
    <td>The deployment ID</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_instance_id" /></td>
    <td><code>string</code></td>
    <td>The deployment instance ID</td>
</tr>
<tr>
    <td><CopyableCode code="flow_id" /></td>
    <td><code>string</code></td>
    <td>Unique identifier for the flow</td>
</tr>
<tr>
    <td><CopyableCode code="peer_service_id" /></td>
    <td><code>string</code></td>
    <td>Service instance ID of the peer (for service-to-service flows)</td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>The service ID this flow belongs to</td>
</tr>
<tr>
    <td><CopyableCode code="byte_count" /></td>
    <td><code>integer</code></td>
    <td>Number of bytes transferred</td>
</tr>
<tr>
    <td><CopyableCode code="capture_end" /></td>
    <td><code>string</code></td>
    <td>When the flow capture ended (ISO timestamp)</td>
</tr>
<tr>
    <td><CopyableCode code="capture_start" /></td>
    <td><code>string</code></td>
    <td>When the flow capture started (ISO timestamp)</td>
</tr>
<tr>
    <td><CopyableCode code="direction" /></td>
    <td><code>string</code></td>
    <td>Traffic direction (ingress or egress) (egress, ingress)</td>
</tr>
<tr>
    <td><CopyableCode code="drop_cause" /></td>
    <td><code>string</code></td>
    <td>If packets were dropped, the reason</td>
</tr>
<tr>
    <td><CopyableCode code="dst_addr" /></td>
    <td><code>string</code></td>
    <td>Destination IP address</td>
</tr>
<tr>
    <td><CopyableCode code="dst_port" /></td>
    <td><code>integer</code></td>
    <td>Destination port number</td>
</tr>
<tr>
    <td><CopyableCode code="flow_state" /></td>
    <td><code>string</code></td>
    <td>Whether the flow is partial or complete (complete, partial)</td>
</tr>
<tr>
    <td><CopyableCode code="l4_latency_ms" /></td>
    <td><code>number</code></td>
    <td>Layer 4 latency in milliseconds</td>
</tr>
<tr>
    <td><CopyableCode code="l4_protocol" /></td>
    <td><code>string</code></td>
    <td>Layer 4 protocol (TCP, UDP, ICMP, etc) (icmp, icmpv6, tcp, udp, unknown)</td>
</tr>
<tr>
    <td><CopyableCode code="packet_count" /></td>
    <td><code>integer</code></td>
    <td>Number of packets transferred</td>
</tr>
<tr>
    <td><CopyableCode code="peer_kind" /></td>
    <td><code>string</code></td>
    <td>Type of peer (service, internet, DNS, etc) (edge_proxy, internet, local_dns, service, unknown)</td>
</tr>
<tr>
    <td><CopyableCode code="src_addr" /></td>
    <td><code>string</code></td>
    <td>Source IP address</td>
</tr>
<tr>
    <td><CopyableCode code="src_port" /></td>
    <td><code>integer</code></td>
    <td>Source port number</td>
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
    <td><a href="#parameter-after_date"><code>after_date</code></a>, <a href="#parameter-after_limit"><code>after_limit</code></a>, <a href="#parameter-anchor_date"><code>anchor_date</code></a>, <a href="#parameter-before_date"><code>before_date</code></a>, <a href="#parameter-before_limit"><code>before_limit</code></a>, <a href="#parameter-deployment_instance_id"><code>deployment_instance_id</code></a>, <a href="#parameter-filter"><code>filter</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td>Fetch individual network flow logs for an environment. Backed by the Railway GraphQL query networkFlowLogs.</td>
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
    <td>Limit logs returned after the anchor.</td>
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
    <td>Limit logs returned before the anchor.</td>
</tr>
<tr id="parameter-deployment_instance_id">
    <td><CopyableCode code="deployment_instance_id" /></td>
    <td><code>string</code></td>
    <td>Filter by deployment instance / sandbox ID (optional).</td>
</tr>
<tr id="parameter-filter">
    <td><CopyableCode code="filter" /></td>
    <td><code>string</code></td>
    <td>Filter expression (e.g., @protocol:tcp @direction:egress @dropped:true).</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>Filter by service ID (optional).</td>
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

Fetch individual network flow logs for an environment. Backed by the Railway GraphQL query networkFlowLogs.

```sql
SELECT
deployment_id,
deployment_instance_id,
flow_id,
peer_service_id,
service_id,
byte_count,
capture_end,
capture_start,
direction,
drop_cause,
dst_addr,
dst_port,
flow_state,
l4_latency_ms,
l4_protocol,
packet_count,
peer_kind,
src_addr,
src_port
FROM railway.observability.network_flow_logs
WHERE environment_id = '{{ environment_id }}' -- required
AND after_date = '{{ after_date }}'
AND after_limit = '{{ after_limit }}'
AND anchor_date = '{{ anchor_date }}'
AND before_date = '{{ before_date }}'
AND before_limit = '{{ before_limit }}'
AND deployment_instance_id = '{{ deployment_instance_id }}'
AND filter = '{{ filter }}'
AND service_id = '{{ service_id }}'
;
```
</TabItem>
</Tabs>
