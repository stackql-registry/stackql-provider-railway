--- 
title: volume_instance_pitr_restore_estimates
hide_title: false
hide_table_of_contents: false
keywords:
  - volume_instance_pitr_restore_estimates
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

Creates, updates, deletes, gets or lists a <code>volume_instance_pitr_restore_estimates</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="volume_instance_pitr_restore_estimates" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.volume_instance_pitr_restore_estimates" /></td></tr>
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

One PitrRestoreScratchEstimate row. Estimated destination-volume scratch a PITR restore to a target needs: the base backup's data plus every WAL segment replayed from that backup to the target (Postgres holds replayed WAL in pg_wal faster than restartpoints recycle it). A conservative over-estimate for a non-blocking pre-restore warning — not a gate.

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
    <td><CopyableCode code="base_backup_label" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="data_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="estimated_scratch_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="likely_to_fit" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="plan_max_size_mb" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="wal_mb" /></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-target_timestamp"><code>target_timestamp</code></a>, <a href="#parameter-volume_instance_id"><code>volume_instance_id</code></a></td>
    <td><a href="#parameter-source_repo_path"><code>source_repo_path</code></a></td>
    <td>Estimated destination-volume scratch a PITR restore of this volume instance to a target would need, and whether it fits the workspace plan's max volume size. Read-only pre-check the restore dialog calls to warn before a restore that would fill the disk mid-replay; returns null when no estimate can be formed (non-pgBackRest source, incomplete archive creds, or a target before the earliest backup). Backed by the Railway GraphQL query volumeInstancePitrRestoreEstimate.</td>
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
<tr id="parameter-target_timestamp">
    <td><CopyableCode code="target_timestamp" /></td>
    <td><code>string (date-time)</code></td>
    <td>Point-in-time target the estimate is computed for.</td>
</tr>
<tr id="parameter-volume_instance_id">
    <td><CopyableCode code="volume_instance_id" /></td>
    <td><code>string</code></td>
    <td>The id of the source volume instance to restore from.</td>
</tr>
<tr id="parameter-source_repo_path">
    <td><CopyableCode code="source_repo_path" /></td>
    <td><code>string</code></td>
    <td>Multi-history picker's selected archive sub-prefix, matching the restore mutation's argument. Pass null for the source's current history.</td>
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

Estimated destination-volume scratch a PITR restore of this volume instance to a target would need, and whether it fits the workspace plan's max volume size. Read-only pre-check the restore dialog calls to warn before a restore that would fill the disk mid-replay; returns null when no estimate can be formed (non-pgBackRest source, incomplete archive creds, or a target before the earliest backup). Backed by the Railway GraphQL query volumeInstancePitrRestoreEstimate.

```sql
SELECT
base_backup_label,
data_mb,
estimated_scratch_mb,
likely_to_fit,
plan_max_size_mb,
wal_mb
FROM railway.storage.volume_instance_pitr_restore_estimates
WHERE target_timestamp = '{{ target_timestamp }}' -- required
AND volume_instance_id = '{{ volume_instance_id }}' -- required
AND source_repo_path = '{{ source_repo_path }}'
;
```
</TabItem>
</Tabs>
