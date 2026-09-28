--- 
title: dns_query_logs
hide_title: false
hide_table_of_contents: false
keywords:
  - dns_query_logs
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

Creates, updates, deletes, gets or lists a <code>dns_query_logs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="dns_query_logs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.dns_query_logs" /></td></tr>
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

One row per DnsQueryLog. A single DNS query resolved for a service (one row per query, not aggregated).

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
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>The service ID that made the queries</td>
</tr>
<tr>
    <td><CopyableCode code="answers" /></td>
    <td><code>array</code></td>
    <td>The IP addresses the name resolved to</td>
</tr>
<tr>
    <td><CopyableCode code="cname_chain" /></td>
    <td><code>array</code></td>
    <td>Ordered CNAME targets the queried name aliased through before the final answer (empty when the response had no CNAME)</td>
</tr>
<tr>
    <td><CopyableCode code="qname" /></td>
    <td><code>string</code></td>
    <td>The domain name that was looked up</td>
</tr>
<tr>
    <td><CopyableCode code="qtype" /></td>
    <td><code>string</code></td>
    <td>The DNS record type queried (A, AAAA, TXT, ...)</td>
</tr>
<tr>
    <td><CopyableCode code="queried_at" /></td>
    <td><code>string</code></td>
    <td>When the query was resolved (ISO timestamp)</td>
</tr>
<tr>
    <td><CopyableCode code="query_zone" /></td>
    <td><code>string</code></td>
    <td>Whether the query targeted the internal zone or the public internet (external, internal)</td>
</tr>
<tr>
    <td><CopyableCode code="rcode" /></td>
    <td><code>string</code></td>
    <td>The DNS response code (NOERROR, NXDOMAIN, SERVFAIL, ...) or synthetic TIMEOUT/ERROR when no upstream response was received</td>
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
    <td>Fetch individual DNS query logs for an environment. Backed by the Railway GraphQL query dnsQueryLogs.</td>
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
    <td>Filter expression (e.g., @rcode:NXDOMAIN @qtype:A @domain:example.com @status:failed). Prefix a term with - to exclude it; repeat a key to match any of its values.</td>
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

Fetch individual DNS query logs for an environment. Backed by the Railway GraphQL query dnsQueryLogs.

```sql
SELECT
deployment_id,
deployment_instance_id,
service_id,
answers,
cname_chain,
qname,
qtype,
queried_at,
query_zone,
rcode
FROM railway.observability.dns_query_logs
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
