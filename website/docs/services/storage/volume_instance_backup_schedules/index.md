--- 
title: volume_instance_backup_schedules
hide_title: false
hide_table_of_contents: false
keywords:
  - volume_instance_backup_schedules
  - storage
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

Creates, updates, deletes, gets or lists a <code>volume_instance_backup_schedules</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="volume_instance_backup_schedules" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.volume_instance_backup_schedules" /></td></tr>
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

One row per VolumeInstanceBackupSchedule.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="cron" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td> (DAILY, MONTHLY, WEEKLY)</td>
</tr>
<tr>
    <td><CopyableCode code="retention_seconds" /></td>
    <td><code>integer</code></td>
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
    <td><a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td></td>
    <td>List backups schedules of a volume instance. Backed by the Railway GraphQL query volumeInstanceBackupScheduleList.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-kinds"><code>kinds</code></a>, <a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td></td>
    <td>Manage schedule for backups of a volume instance. Backed by the Railway GraphQL mutation volumeInstanceBackupScheduleUpdate.</td>
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
<tr id="parameter-volume_instance_id">
    <td><CopyableCode code="volume_instance_id" /></td>
    <td><code>string</code></td>
    <td>The id of the volume instance to list the schedules of.</td>
</tr>
<tr id="parameter-kinds">
    <td><CopyableCode code="kinds" /></td>
    <td><code>array</code></td>
    <td>The frequency/retention of the backups.</td>
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

List backups schedules of a volume instance. Backed by the Railway GraphQL query volumeInstanceBackupScheduleList.

```sql
SELECT
id,
name,
created_at,
cron,
kind,
retention_seconds
FROM railway.storage.volume_instance_backup_schedules
WHERE volume_instance_id = '{{ volume_instance_id }}' -- required
;
```
</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Manage schedule for backups of a volume instance. Backed by the Railway GraphQL mutation volumeInstanceBackupScheduleUpdate.

```sql
UPDATE railway.storage.volume_instance_backup_schedules
SET 

WHERE 
kinds = '{{ kinds }}' --required
AND volume_instance_id = '{{ volume_instance_id }}' --required
RETURNING
result;
```
</TabItem>
</Tabs>
