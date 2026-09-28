--- 
title: volume_instance_backups
hide_title: false
hide_table_of_contents: false
keywords:
  - volume_instance_backups
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

Creates, updates, deletes, gets or lists a <code>volume_instance_backups</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="volume_instance_backups" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.volume_instance_backups" /></td></tr>
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

One row per VolumeInstanceBackup.

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
    <td><CopyableCode code="creator_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="external_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="schedule_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="referenced_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="used_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="volume_instance_size_mb" /></td>
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
    <td>List backups of a volume instance. Backed by the Railway GraphQL query volumeInstanceBackupList.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td></td>
    <td>Create backup of a volume instance. Backed by the Railway GraphQL mutation volumeInstanceBackupCreate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-volume_instance_backup_id"><code>volume_instance_backup_id</code></a>, <a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td></td>
    <td>Deletes volume instance backup. Backed by the Railway GraphQL mutation volumeInstanceBackupDelete.</td>
</tr>
<tr>
    <td><a href="#lock"><CopyableCode code="lock" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-volume_instance_backup_id"><code>volume_instance_backup_id</code></a>, <a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td></td>
    <td>Removes backup expiration date. Backed by the Railway GraphQL mutation volumeInstanceBackupLock.</td>
</tr>
<tr>
    <td><a href="#restore"><CopyableCode code="restore" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-volume_instance_backup_id"><code>volume_instance_backup_id</code></a>, <a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td><a href="#parameter-replica_service_ids"><code>replica_service_ids</code></a>, <a href="#parameter-wipe_service_ids"><code>wipe_service_ids</code></a></td>
    <td>Restore a volume instance from a backup. Backed by the Railway GraphQL mutation volumeInstanceBackupRestore.</td>
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
    <td>The id of the volume instance to list the backups of.</td>
</tr>
<tr id="parameter-replica_service_ids">
    <td><CopyableCode code="replica_service_ids" /></td>
    <td><code>array</code></td>
    <td>Optional: for HA cluster restores, service IDs of replicas that should also receive the backup.</td>
</tr>
<tr id="parameter-volume_instance_backup_id">
    <td><CopyableCode code="volume_instance_backup_id" /></td>
    <td><code>string</code></td>
    <td>The volume instance's backup id.</td>
</tr>
<tr id="parameter-wipe_service_ids">
    <td><CopyableCode code="wipe_service_ids" /></td>
    <td><code>array</code></td>
    <td>Service IDs whose volumes should be wiped (replaced with fresh empty volumes) as part of this restore.</td>
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

List backups of a volume instance. Backed by the Railway GraphQL query volumeInstanceBackupList.

```sql
SELECT
id,
name,
creator_id,
external_id,
schedule_id,
created_at,
expires_at,
referenced_mb,
used_mb,
volume_instance_size_mb
FROM railway.storage.volume_instance_backups
WHERE volume_instance_id = '{{ volume_instance_id }}' -- required
;
```
</TabItem>
</Tabs>


## `INSERT` examples

<Tabs
    defaultValue="create"
    values={[
        { label: 'create', value: 'create' },
        { label: 'Manifest', value: 'manifest' }
    ]}
>
<TabItem value="create">

Create backup of a volume instance. Backed by the Railway GraphQL mutation volumeInstanceBackupCreate.

```sql
INSERT INTO railway.storage.volume_instance_backups (
name,
volume_instance_id
)
SELECT 
'{{ name }}',
'{{ volume_instance_id }}' /* required */
RETURNING
workflow_id,
archive_continuity_unverified_reason,
archive_continuity_verified
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: volume_instance_backups
  props:
    - name: name
      value: "{{ name }}"
      description: |
        Optional name/label for the backup. Defaults to 'Manual' if not provided.
    - name: volume_instance_id
      value: "{{ volume_instance_id }}"
      description: |
        The id of the volume instance to create a backup of.
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="delete"
    values={[
        { label: 'delete', value: 'delete' }
    ]}
>
<TabItem value="delete">

Deletes volume instance backup. Backed by the Railway GraphQL mutation volumeInstanceBackupDelete.

```sql
DELETE FROM railway.storage.volume_instance_backups
WHERE 
volume_instance_backup_id = '{{ volume_instance_backup_id }}' --required
AND volume_instance_id = '{{ volume_instance_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="lock"
    values={[
        { label: 'lock', value: 'lock' },
        { label: 'restore', value: 'restore' }
    ]}
>
<TabItem value="lock">

Removes backup expiration date. Backed by the Railway GraphQL mutation volumeInstanceBackupLock.

```sql
EXEC railway.storage.volume_instance_backups.lock 
@volume_instance_backup_id='{{ volume_instance_backup_id }}', --required
@volume_instance_id='{{ volume_instance_id }}' --required
;
```
</TabItem>
<TabItem value="restore">

Restore a volume instance from a backup. Backed by the Railway GraphQL mutation volumeInstanceBackupRestore.

```sql
EXEC railway.storage.volume_instance_backups.restore 
@volume_instance_backup_id='{{ volume_instance_backup_id }}', --required
@volume_instance_id='{{ volume_instance_id }}', --required
@replica_service_ids='{{ replica_service_ids }}',
@wipe_service_ids='{{ wipe_service_ids }}'
;
```
</TabItem>
</Tabs>
