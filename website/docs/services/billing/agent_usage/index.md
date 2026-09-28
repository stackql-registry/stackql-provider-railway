--- 
title: agent_usage
hide_title: false
hide_table_of_contents: false
keywords:
  - agent_usage
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

Creates, updates, deletes, gets or lists an <code>agent_usage</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="agent_usage" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.billing.agent_usage" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

One AgentUsageSummary row.

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
    <td><CopyableCode code="billing_period_end" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="hard_limit_cents" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has_custom_hard_limit" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="soft_limit_cents" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="total_used_cents" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="usage_remaining" /></td>
    <td><code>number</code></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Get unified AI usage for a workspace. Backed by the Railway GraphQL query agentUsage.</td>
</tr>
<tr>
    <td><a href="#set_limit"><CopyableCode code="set_limit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-hard_limit_cents"><code>hard_limit_cents</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-soft_limit_cents"><code>soft_limit_cents</code></a></td>
    <td>Set agent usage limit for a workspace. Backed by the Railway GraphQL mutation agentUsageLimitSet.</td>
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
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-hard_limit_cents">
    <td><CopyableCode code="hard_limit_cents" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
<tr id="parameter-soft_limit_cents">
    <td><CopyableCode code="soft_limit_cents" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Get unified AI usage for a workspace. Backed by the Railway GraphQL query agentUsage.

```sql
SELECT
billing_period_end,
hard_limit_cents,
has_custom_hard_limit,
soft_limit_cents,
total_used_cents,
usage_remaining
FROM railway.billing.agent_usage
WHERE workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="set_limit"
    values={[
        { label: 'set_limit', value: 'set_limit' }
    ]}
>
<TabItem value="set_limit">

Set agent usage limit for a workspace. Backed by the Railway GraphQL mutation agentUsageLimitSet.

```sql
EXEC railway.billing.agent_usage.set_limit 
@hard_limit_cents='{{ hard_limit_cents }}', --required
@workspace_id='{{ workspace_id }}', --required
@soft_limit_cents='{{ soft_limit_cents }}'
;
```
</TabItem>
</Tabs>
