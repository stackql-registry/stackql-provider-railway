--- 
title: cloud_agent_task_results
hide_title: false
hide_table_of_contents: false
keywords:
  - cloud_agent_task_results
  - agents
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

Creates, updates, deletes, gets or lists a <code>cloud_agent_task_results</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="cloud_agent_task_results" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.cloud_agent_task_results" /></td></tr>
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

One CloudAgentTaskResult row.

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
    <td><CopyableCode code="cloud_agent_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="task_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="error" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="external_ref" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="session_state" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (AWAITING_INPUT, COMPLETED, FAILED, PENDING, RUNNING)</td>
</tr>
<tr>
    <td><CopyableCode code="structured_output" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="text" /></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-cloud_agent_id"><code>cloud_agent_id</code></a>, <a href="#parameter-session_id"><code>session_id</code></a></td>
    <td></td>
    <td>Read the latest task on an agent/session without waking the VM. Backed by the Railway GraphQL query cloudAgentTask.</td>
</tr>
<tr>
    <td><a href="#recover"><CopyableCode code="recover" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-cloud_agent_id"><code>cloud_agent_id</code></a>, <a href="#parameter-session_id"><code>session_id</code></a></td>
    <td></td>
    <td>Recover the latest task response from the agent. May wake the VM. Backed by the Railway GraphQL mutation cloudAgentTaskRecover.</td>
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
<tr id="parameter-cloud_agent_id">
    <td><CopyableCode code="cloud_agent_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td></td>
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

Read the latest task on an agent/session without waking the VM. Backed by the Railway GraphQL query cloudAgentTask.

```sql
SELECT
cloud_agent_id,
session_id,
task_id,
completed_at,
error,
external_ref,
metadata,
session_state,
status,
structured_output,
text
FROM railway.agents.cloud_agent_task_results
WHERE cloud_agent_id = '{{ cloud_agent_id }}' -- required
AND session_id = '{{ session_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="recover"
    values={[
        { label: 'recover', value: 'recover' }
    ]}
>
<TabItem value="recover">

Recover the latest task response from the agent. May wake the VM. Backed by the Railway GraphQL mutation cloudAgentTaskRecover.

```sql
EXEC railway.agents.cloud_agent_task_results.recover 
@cloud_agent_id='{{ cloud_agent_id }}', --required
@session_id='{{ session_id }}' --required
;
```
</TabItem>
</Tabs>
