--- 
title: volume_instances
hide_title: false
hide_table_of_contents: false
keywords:
  - volume_instances
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

Creates, updates, deletes, gets or lists a <code>volume_instances</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="volume_instances" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.volume_instances" /></td></tr>
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

One VolumeInstance row.

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
    <td><CopyableCode code="external_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="volume_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="current_size_mb" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="is_pending_deletion" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="mount_path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="size_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td> (DELETED, DELETING, ERROR, MIGRATING, MIGRATION_PENDING, READY, RESTORING, UPDATING)</td>
</tr>
<tr>
    <td><CopyableCode code="volume" /></td>
    <td><code>object</code></td>
    <td>Volume object</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per VolumeInstance.

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
    <td><CopyableCode code="external_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="volume_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="current_size_mb" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="is_pending_deletion" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="mount_path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="size_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td> (DELETED, DELETING, ERROR, MIGRATING, MIGRATION_PENDING, READY, RESTORING, UPDATING)</td>
</tr>
<tr>
    <td><CopyableCode code="volume" /></td>
    <td><code>object</code></td>
    <td>Volume object</td>
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
    <td>Get a single volume instance by id. Backed by the Railway GraphQL query volumeInstance.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Lists VolumeInstance objects of a Environment. Backed by the Railway GraphQL query environment.volumeInstances.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-volume_id"><code>volume_id</code></a></td>
    <td></td>
    <td>Update a volume instance. If no environmentId is provided, all volume instances for the volume will be updated. Backed by the Railway GraphQL mutation volumeInstanceUpdate.</td>
</tr>
<tr>
    <td><a href="#pitr_restore"><CopyableCode code="pitr_restore" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-target_timestamp"><code>target_timestamp</code></a>, <a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td><a href="#parameter-new_service_name"><code>new_service_name</code></a>, <a href="#parameter-source_repo_path"><code>source_repo_path</code></a></td>
    <td>Point-in-time restore. Creates a brand-new database service in the project, recovered to the target timestamp from the source service's backup history. The source service stays online and untouched. Backed by the Railway GraphQL mutation volumeInstancePITRRestore.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-new_service_name">
    <td><CopyableCode code="new_service_name" /></td>
    <td><code>string</code></td>
    <td>Optional name for the new restored service. Defaults to '&lt;source&gt;-restored-YYYYMMDD-HHMM'.</td>
</tr>
<tr id="parameter-source_repo_path">
    <td><CopyableCode code="source_repo_path" /></td>
    <td><code>string</code></td>
    <td>Opaque identifier for one archive history, from the multi-history picker when the source bucket holds more than one. It scopes both the restore-window pre-check and the restored fork's archive source, treating the selected history as frozen. Pass null to restore the source's current history.</td>
</tr>
<tr id="parameter-target_timestamp">
    <td><CopyableCode code="target_timestamp" /></td>
    <td><code>string (date-time)</code></td>
    <td>Point-in-time target. Must be within the available restore window.</td>
</tr>
<tr id="parameter-volume_id">
    <td><CopyableCode code="volume_id" /></td>
    <td><code>string</code></td>
    <td>The id of the volume to update.</td>
</tr>
<tr id="parameter-volume_instance_id">
    <td><CopyableCode code="volume_instance_id" /></td>
    <td><code>string</code></td>
    <td>The id of the volume instance to restore from.</td>
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

Get a single volume instance by id. Backed by the Railway GraphQL query volumeInstance.

```sql
SELECT
id,
environment_id,
external_id,
service_id,
volume_id,
created_at,
current_size_mb,
deleted_at,
environment,
is_pending_deletion,
mount_path,
region,
size_mb,
state,
volume
FROM railway.storage.volume_instances
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists VolumeInstance objects of a Environment. Backed by the Railway GraphQL query environment.volumeInstances.

```sql
SELECT
id,
environment_id,
external_id,
service_id,
volume_id,
created_at,
current_size_mb,
deleted_at,
environment,
is_pending_deletion,
mount_path,
region,
size_mb,
state,
volume
FROM railway.storage.volume_instances
WHERE environment_id = '{{ environment_id }}' -- required
AND project_id = '{{ project_id }}'
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

Update a volume instance. If no environmentId is provided, all volume instances for the volume will be updated. Backed by the Railway GraphQL mutation volumeInstanceUpdate.

```sql
UPDATE railway.storage.volume_instances
SET 
environment_id = '{{ environment_id }}',
mount_path = '{{ mount_path }}',
service_id = '{{ service_id }}',
state = '{{ state }}'
WHERE 
volume_id = '{{ volume_id }}' --required
RETURNING
result;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="pitr_restore"
    values={[
        { label: 'pitr_restore', value: 'pitr_restore' }
    ]}
>
<TabItem value="pitr_restore">

Point-in-time restore. Creates a brand-new database service in the project, recovered to the target timestamp from the source service's backup history. The source service stays online and untouched. Backed by the Railway GraphQL mutation volumeInstancePITRRestore.

```sql
EXEC railway.storage.volume_instances.pitr_restore 
@target_timestamp='{{ target_timestamp }}', --required
@volume_instance_id='{{ volume_instance_id }}', --required
@new_service_name='{{ new_service_name }}',
@source_repo_path='{{ source_repo_path }}'
;
```
</TabItem>
</Tabs>
