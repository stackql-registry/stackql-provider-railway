--- 
title: environment_history
hide_title: false
hide_table_of_contents: false
keywords:
  - environment_history
  - environments
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

Creates, updates, deletes, gets or lists an <code>environment_history</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environment_history" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.environments.environment_history" /></td></tr>
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

One row per ProjectHistoryEntry. One settled change in an environment: a system event or a terminal operation (patch, deploy, …).

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
    <td><CopyableCode code="workflow_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="action" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="activity_payload" /></td>
    <td><code>object</code></td>
    <td>Minimal payload for activity feed list rendering. Same trimming as Event.activityPayload.</td>
</tr>
<tr>
    <td><CopyableCode code="actor" /></td>
    <td><code>object</code></td>
    <td>ProjectOperationActor object</td>
</tr>
<tr>
    <td><CopyableCode code="changes" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td>When the change settled.</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="operation_kind" /></td>
    <td><code>string</code></td>
    <td>'' for a plain event; e.g. 'patch', 'deploy' for operations.</td>
</tr>
<tr>
    <td><CopyableCode code="outcome" /></td>
    <td><code>string</code></td>
    <td>'' for a plain event; 'applied' or 'failed' for operations.</td>
</tr>
<tr>
    <td><CopyableCode code="parent_ref" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="payload" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_ids" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="severity" /></td>
    <td><code>string</code></td>
    <td> (CRITICAL, INFO, NOTICE, WARNING)</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-actions"><code>actions</code></a>, <a href="#parameter-objects"><code>objects</code></a>, <a href="#parameter-outcomes"><code>outcomes</code></a>, <a href="#parameter-service_ids"><code>service_ids</code></a></td>
    <td>Settled history for an environment (system events + terminal operations), newest first. Cursor-paginated. Backed by the Railway GraphQL query environmentHistory.</td>
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
<tr id="parameter-actions">
    <td><CopyableCode code="actions" /></td>
    <td><code>string</code></td>
    <td>GraphQL list literal, for example &#91;"a", "b"&#93;.</td>
</tr>
<tr id="parameter-objects">
    <td><CopyableCode code="objects" /></td>
    <td><code>string</code></td>
    <td>GraphQL list literal, for example &#91;"a", "b"&#93;.</td>
</tr>
<tr id="parameter-outcomes">
    <td><CopyableCode code="outcomes" /></td>
    <td><code>string</code></td>
    <td>Any of '', 'applied', 'failed'. GraphQL list literal, for example &#91;"a", "b"&#93;.</td>
</tr>
<tr id="parameter-service_ids">
    <td><CopyableCode code="service_ids" /></td>
    <td><code>string</code></td>
    <td>GraphQL list literal, for example &#91;"a", "b"&#93;.</td>
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

Settled history for an environment (system events + terminal operations), newest first. Cursor-paginated. Backed by the Railway GraphQL query environmentHistory.

```sql
SELECT
id,
workflow_id,
action,
activity_payload,
actor,
changes,
created_at,
object,
operation_kind,
outcome,
parent_ref,
payload,
service_ids,
severity,
source
FROM railway.environments.environment_history
WHERE environment_id = '{{ environment_id }}' -- required
AND actions = '{{ actions }}'
AND objects = '{{ objects }}'
AND outcomes = '{{ outcomes }}'
AND service_ids = '{{ service_ids }}'
;
```
</TabItem>
</Tabs>
