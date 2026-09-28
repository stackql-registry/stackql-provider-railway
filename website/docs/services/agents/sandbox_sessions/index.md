--- 
title: sandbox_sessions
hide_title: false
hide_table_of_contents: false
keywords:
  - sandbox_sessions
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

Creates, updates, deletes, gets or lists a <code>sandbox_sessions</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sandbox_sessions" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.sandbox_sessions" /></td></tr>
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

One row per SandboxSession. A resumable session inside a sandbox: an interactive shell or a one-off exec command.

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
    <td>Stable session name; reconnect/attach by this.</td>
</tr>
<tr>
    <td><CopyableCode code="attached" /></td>
    <td><code>boolean</code></td>
    <td>Whether a client is currently connected.</td>
</tr>
<tr>
    <td><CopyableCode code="command" /></td>
    <td><code>string</code></td>
    <td>The command being run; empty for an interactive shell.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="foreground_active" /></td>
    <td><code>boolean</code></td>
    <td>For an interactive shell, whether a foreground program currently holds the terminal. Null otherwise, or when the runtime can't report it.</td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td> (EXEC, SHELL)</td>
</tr>
<tr>
    <td><CopyableCode code="run_state" /></td>
    <td><code>object</code></td>
    <td>SandboxSessionRunState object</td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Resumable sessions inside a sandbox — interactive shells and one-off exec commands, live or recently exited. Null when the sandbox can't report them (e.g. its vm-init predates session listing). Backed by the Railway GraphQL query sandboxSessions.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
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

Resumable sessions inside a sandbox — interactive shells and one-off exec commands, live or recently exited. Null when the sandbox can't report them (e.g. its vm-init predates session listing). Backed by the Railway GraphQL query sandboxSessions.

```sql
SELECT
name,
attached,
command,
created_at,
foreground_active,
kind,
run_state
FROM railway.agents.sandbox_sessions
WHERE environment_id = '{{ environment_id }}' -- required
AND id = '{{ id }}' -- required
;
```
</TabItem>
</Tabs>
