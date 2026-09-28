--- 
title: pitr_ha_workflows
hide_title: false
hide_table_of_contents: false
keywords:
  - pitr_ha_workflows
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

Creates, updates, deletes, gets or lists a <code>pitr_ha_workflows</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="pitr_ha_workflows" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.pitr_ha_workflows" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_progress"
    values={[
        { label: 'get_progress', value: 'get_progress' }
    ]}
>
<TabItem value="get_progress">

One PitrHaWorkflowProgress row. Progress of an in-flight or recently completed PITR enable/disable rollout on an HA database cluster.

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
    <td><CopyableCode code="current_member_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="new_leader_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="root_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workflow_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="cluster_mutated" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="completed_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="direction" /></td>
    <td><code>string</code></td>
    <td> (DISABLE, ENABLE)</td>
</tr>
<tr>
    <td><CopyableCode code="engine" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="error_message" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="failed_at_phase" /></td>
    <td><code>string</code></td>
    <td> (CREATING_BUCKET, DONE, FAILED, PATCHING_DCS, PLANNING, REMOVING_VARIABLES, ROLLING_EX_LEADER, ROLLING_REPLICAS, SWITCHING_OVER, VERIFYING, WRITING_VARIABLES)</td>
</tr>
<tr>
    <td><CopyableCode code="members" /></td>
    <td><code>array</code></td>
    <td>List of PitrHaWorkflowMemberProgress objects</td>
</tr>
<tr>
    <td><CopyableCode code="phase" /></td>
    <td><code>string</code></td>
    <td> (CREATING_BUCKET, DONE, FAILED, PATCHING_DCS, PLANNING, REMOVING_VARIABLES, ROLLING_EX_LEADER, ROLLING_REPLICAS, SWITCHING_OVER, VERIFYING, WRITING_VARIABLES)</td>
</tr>
<tr>
    <td><CopyableCode code="started_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
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
    <td><a href="#get_progress"><CopyableCode code="get_progress" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a></td>
    <td></td>
    <td>One-shot read of the current progress of a PITR enable/disable rollout on an HA database cluster. Use it to rehydrate state on page load, then poll this field for updates. Returns null when no rollout has run recently. Backed by the Railway GraphQL query pitrHaWorkflowProgress.</td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a></td>
    <td></td>
    <td>Cancels an in-progress PITR enable/disable rollout on an HA database cluster and resets its progress so the UI re-reads from the live cluster. No-ops when nothing is running. Backed by the Railway GraphQL mutation cancelPitrHaWorkflow.</td>
</tr>
<tr>
    <td><a href="#clear_progress"><CopyableCode code="clear_progress" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a></td>
    <td></td>
    <td>Clears the recorded progress of a finished PITR enable/disable rollout so the Backups page starts fresh. A rollout still in progress cannot be cleared. Backed by the Railway GraphQL mutation clearPitrHaWorkflowProgress.</td>
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
<tr id="parameter-root_service_id">
    <td><CopyableCode code="root_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_progress"
    values={[
        { label: 'get_progress', value: 'get_progress' }
    ]}
>
<TabItem value="get_progress">

One-shot read of the current progress of a PITR enable/disable rollout on an HA database cluster. Use it to rehydrate state on page load, then poll this field for updates. Returns null when no rollout has run recently. Backed by the Railway GraphQL query pitrHaWorkflowProgress.

```sql
SELECT
current_member_service_id,
environment_id,
new_leader_service_id,
project_id,
root_service_id,
workflow_id,
cluster_mutated,
completed_at,
direction,
engine,
error_message,
failed_at_phase,
members,
phase,
started_at,
updated_at
FROM railway.storage.pitr_ha_workflows
WHERE environment_id = '{{ environment_id }}' -- required
AND root_service_id = '{{ root_service_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="cancel"
    values={[
        { label: 'cancel', value: 'cancel' },
        { label: 'clear_progress', value: 'clear_progress' }
    ]}
>
<TabItem value="cancel">

Cancels an in-progress PITR enable/disable rollout on an HA database cluster and resets its progress so the UI re-reads from the live cluster. No-ops when nothing is running. Backed by the Railway GraphQL mutation cancelPitrHaWorkflow.

```sql
EXEC railway.storage.pitr_ha_workflows.cancel 
@environment_id='{{ environment_id }}', --required
@root_service_id='{{ root_service_id }}' --required
;
```
</TabItem>
<TabItem value="clear_progress">

Clears the recorded progress of a finished PITR enable/disable rollout so the Backups page starts fresh. A rollout still in progress cannot be cleared. Backed by the Railway GraphQL mutation clearPitrHaWorkflowProgress.

```sql
EXEC railway.storage.pitr_ha_workflows.clear_progress 
@environment_id='{{ environment_id }}', --required
@root_service_id='{{ root_service_id }}' --required
;
```
</TabItem>
</Tabs>
