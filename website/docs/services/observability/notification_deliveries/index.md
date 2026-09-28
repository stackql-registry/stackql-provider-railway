--- 
title: notification_deliveries
hide_title: false
hide_table_of_contents: false
keywords:
  - notification_deliveries
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

Creates, updates, deletes, gets or lists a <code>notification_deliveries</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="notification_deliveries" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.notification_deliveries" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One NotificationDelivery row.

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
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="notification_instance" /></td>
    <td><code>object</code></td>
    <td>NotificationInstance object</td>
</tr>
<tr>
    <td><CopyableCode code="read_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (FAILED, PENDING, SENT)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (EMAIL, INAPP, WEBHOOK)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per NotificationDelivery.

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
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="notification_instance" /></td>
    <td><code>object</code></td>
    <td>NotificationInstance object</td>
</tr>
<tr>
    <td><CopyableCode code="read_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (FAILED, PENDING, SENT)</td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (EMAIL, INAPP, WEBHOOK)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
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
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Gets a notification delivery by ID for the authenticated user. Backed by the Railway GraphQL query notificationDelivery.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-only_unread"><code>only_unread</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-status"><code>status</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Gets notification deliveries for the authenticated user. Backed by the Railway GraphQL query notificationDeliveries.</td>
</tr>
<tr>
    <td><a href="#mark_as_read"><CopyableCode code="mark_as_read" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-delivery_ids"><code>delivery_ids</code></a></td>
    <td></td>
    <td>Marks notification deliveries as read. Backed by the Railway GraphQL mutation notificationDeliveriesMarkAsRead.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-only_unread">
    <td><CopyableCode code="only_unread" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-type">
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-delivery_ids">
    <td><CopyableCode code="delivery_ids" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Gets a notification delivery by ID for the authenticated user. Backed by the Railway GraphQL query notificationDelivery.

```sql
SELECT
id,
user_id,
created_at,
notification_instance,
read_at,
status,
type,
updated_at
FROM railway.observability.notification_deliveries
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Gets notification deliveries for the authenticated user. Backed by the Railway GraphQL query notificationDeliveries.

```sql
SELECT
id,
user_id,
created_at,
notification_instance,
read_at,
status,
type,
updated_at
FROM railway.observability.notification_deliveries
WHERE environment_id = '{{ environment_id }}'
AND only_unread = '{{ only_unread }}'
AND project_id = '{{ project_id }}'
AND status = '{{ status }}'
AND type = '{{ type }}'
AND workspace_id = '{{ workspace_id }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="mark_as_read"
    values={[
        { label: 'mark_as_read', value: 'mark_as_read' }
    ]}
>
<TabItem value="mark_as_read">

Marks notification deliveries as read. Backed by the Railway GraphQL mutation notificationDeliveriesMarkAsRead.

```sql
EXEC railway.observability.notification_deliveries.mark_as_read 
@delivery_ids='{{ delivery_ids }}' --required
;
```
</TabItem>
</Tabs>
