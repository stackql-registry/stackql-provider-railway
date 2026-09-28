--- 
title: cloud_agent_tasks
hide_title: false
hide_table_of_contents: false
keywords:
  - cloud_agent_tasks
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

Creates, updates, deletes, gets or lists a <code>cloud_agent_tasks</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="cloud_agent_tasks" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.cloud_agent_tasks" /></td></tr>
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

One row per CloudAgentTask. Task lifecycle and correlation. Read cloudAgentTask for the latest session response.

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
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="cloud_agent_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="requested_by_user_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_via" /></td>
    <td><code>string</code></td>
    <td> (API, MCP)</td>
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
    <td><CopyableCode code="prompt_preview" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (AWAITING_INPUT, COMPLETED, FAILED, PENDING, RUNNING)</td>
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
    <td><a href="#parameter-status"><code>status</code></a></td>
    <td>List task lifecycle records in an environment, newest first. Backed by the Railway GraphQL query cloudAgentTasks.</td>
</tr>
<tr>
    <td><a href="#dispatch"><CopyableCode code="dispatch" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-prompt"><code>prompt</code></a></td>
    <td><a href="#parameter-agent_name"><code>agent_name</code></a>, <a href="#parameter-cloud_agent_id"><code>cloud_agent_id</code></a>, <a href="#parameter-external_ref"><code>external_ref</code></a>, <a href="#parameter-idempotency_key"><code>idempotency_key</code></a>, <a href="#parameter-metadata"><code>metadata</code></a>, <a href="#parameter-mode"><code>mode</code></a>, <a href="#parameter-output_schema"><code>output_schema</code></a>, <a href="#parameter-reply_to_task_id"><code>reply_to_task_id</code></a>, <a href="#parameter-session_id"><code>session_id</code></a>, <a href="#parameter-source"><code>source</code></a>, <a href="#parameter-webhook_secret"><code>webhook_secret</code></a>, <a href="#parameter-webhook_url"><code>webhook_url</code></a></td>
    <td>Start a task and return its handle. Creates a fresh agent by default; replyToTaskId continues the original conversation. Backed by the Railway GraphQL mutation cloudAgentTaskDispatch.</td>
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
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-agent_name">
    <td><CopyableCode code="agent_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-cloud_agent_id">
    <td><CopyableCode code="cloud_agent_id" /></td>
    <td><code>string</code></td>
    <td>Explicit agent reuse. Omit all targets to create a fresh agent.</td>
</tr>
<tr id="parameter-external_ref">
    <td><CopyableCode code="external_ref" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-idempotency_key">
    <td><CopyableCode code="idempotency_key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-metadata">
    <td><CopyableCode code="metadata" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-mode">
    <td><CopyableCode code="mode" /></td>
    <td><code>string</code></td>
    <td>(FOLLOW_UP, PROMPT, STEER)</td>
</tr>
<tr id="parameter-output_schema">
    <td><CopyableCode code="output_schema" /></td>
    <td><code>object</code></td>
    <td>JSON Schema object for structured output; requires PROMPT mode.</td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-prompt">
    <td><CopyableCode code="prompt" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-reply_to_task_id">
    <td><CopyableCode code="reply_to_task_id" /></td>
    <td><code>string</code></td>
    <td>Continue this task's original agent/session. Mutually exclusive with cloudAgentId/sessionId.</td>
</tr>
<tr id="parameter-session_id">
    <td><CopyableCode code="session_id" /></td>
    <td><code>string</code></td>
    <td>Existing session to continue; requires cloudAgentId.</td>
</tr>
<tr id="parameter-source">
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td>JSON object of GraphQL type CloudAgentSourceInput; keys keep the API's camelCase names.</td>
</tr>
<tr id="parameter-webhook_secret">
    <td><CopyableCode code="webhook_secret" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-webhook_url">
    <td><CopyableCode code="webhook_url" /></td>
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

List task lifecycle records in an environment, newest first. Backed by the Railway GraphQL query cloudAgentTasks.

```sql
SELECT
id,
cloud_agent_id,
requested_by_user_id,
session_id,
completed_at,
created_at,
created_via,
error,
external_ref,
metadata,
prompt_preview,
started_at,
status
FROM railway.agents.cloud_agent_tasks
WHERE environment_id = '{{ environment_id }}' -- required
AND status = '{{ status }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="dispatch"
    values={[
        { label: 'dispatch', value: 'dispatch' }
    ]}
>
<TabItem value="dispatch">

Start a task and return its handle. Creates a fresh agent by default; replyToTaskId continues the original conversation. Backed by the Railway GraphQL mutation cloudAgentTaskDispatch.

```sql
EXEC railway.agents.cloud_agent_tasks.dispatch 
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@prompt='{{ prompt }}', --required
@agent_name='{{ agent_name }}',
@cloud_agent_id='{{ cloud_agent_id }}',
@external_ref='{{ external_ref }}',
@idempotency_key='{{ idempotency_key }}',
@metadata='{{ metadata }}',
@mode='{{ mode }}',
@output_schema='{{ output_schema }}',
@reply_to_task_id='{{ reply_to_task_id }}',
@session_id='{{ session_id }}',
@source='{{ source }}',
@webhook_secret='{{ webhook_secret }}',
@webhook_url='{{ webhook_url }}'
;
```
</TabItem>
</Tabs>
