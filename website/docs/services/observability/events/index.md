--- 
title: events
hide_title: false
hide_table_of_contents: false
keywords:
  - events
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

Creates, updates, deletes, gets or lists an <code>events</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="events" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.events" /></td></tr>
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

One row per Event.

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
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
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
    <td>Minimal event payload for activity feed list rendering. Avoids returning large deployment payload fields like commit messages.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="payload" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="severity" /></td>
    <td><code>string</code></td>
    <td> (CRITICAL, INFO, NOTICE, WARNING)</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-action"><code>action</code></a>, <a href="#parameter-object"><code>object</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td>Gets the events for a project. Backed by the Railway GraphQL query events.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-action">
    <td><CopyableCode code="action" /></td>
    <td><code>string</code></td>
    <td>GraphQL input object literal of type EventStringListFilter, for example &#123;field: "value"&#125;.</td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-object">
    <td><CopyableCode code="object" /></td>
    <td><code>string</code></td>
    <td>GraphQL input object literal of type EventStringListFilter, for example &#123;field: "value"&#125;.</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td>GraphQL input object literal of type EventStringListFilter, for example &#123;field: "value"&#125;.</td>
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

Gets the events for a project. Backed by the Railway GraphQL query events.

```sql
SELECT
id,
environment_id,
project_id,
action,
activity_payload,
created_at,
environment,
object,
payload,
severity
FROM railway.observability.events
WHERE project_id = '{{ project_id }}' -- required
AND environment_id = '{{ environment_id }}'
AND action = '{{ action }}'
AND object = '{{ object }}'
AND service_id = '{{ service_id }}'
;
```
</TabItem>
</Tabs>
