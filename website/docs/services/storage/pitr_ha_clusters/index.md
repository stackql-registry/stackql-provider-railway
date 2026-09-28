--- 
title: pitr_ha_clusters
hide_title: false
hide_table_of_contents: false
keywords:
  - pitr_ha_clusters
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

Creates, updates, deletes, gets or lists a <code>pitr_ha_clusters</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="pitr_ha_clusters" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.pitr_ha_clusters" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_replication_health"
    values={[
        { label: 'get_replication_health', value: 'get_replication_health' }
    ]}
>
<TabItem value="get_replication_health">

One PitrHaClusterReplicationHealth row. Live replication health of an HA database cluster's members. Used to gate the Enable/Disable PITR buttons on the same 'caught up' definition the rollout enforces.

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
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="root_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="all_healthy" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="checked_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="members" /></td>
    <td><code>array</code></td>
    <td>List of PitrHaMemberReplicationHealth objects</td>
</tr>
<tr>
    <td><CopyableCode code="reachable" /></td>
    <td><code>boolean</code></td>
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
    <td><a href="#get_replication_health"><CopyableCode code="get_replication_health" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a></td>
    <td></td>
    <td>Live replication health for an HA database cluster (Postgres HA, MySQL HA). Use it to gate the Enable/Disable PITR buttons so a rollout can't start while a member is too far behind to rejoin. Returns null when the service isn't an HA root. Backed by the Railway GraphQL query pitrHaClusterReplicationHealth.</td>
</tr>
<tr>
    <td><a href="#disable_pitr"><CopyableCode code="disable_pitr" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a></td>
    <td></td>
    <td>Disables point-in-time recovery on an HA database cluster with the same rolling rollout as enable. The backup bucket is left intact, so existing backup history is preserved. Backed by the Railway GraphQL mutation disablePitrForHaCluster.</td>
</tr>
<tr>
    <td><a href="#enable_pitr"><CopyableCode code="enable_pitr" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a></td>
    <td></td>
    <td>Enables point-in-time recovery on an HA database cluster (Postgres HA, MySQL HA) with a rolling, near-zero-downtime rollout across its members. Safe to retry. Backed by the Railway GraphQL mutation enablePitrForHaCluster.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td>Project containing the cluster (returned in payload).</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_replication_health"
    values={[
        { label: 'get_replication_health', value: 'get_replication_health' }
    ]}
>
<TabItem value="get_replication_health">

Live replication health for an HA database cluster (Postgres HA, MySQL HA). Use it to gate the Enable/Disable PITR buttons so a rollout can't start while a member is too far behind to rejoin. Returns null when the service isn't an HA root. Backed by the Railway GraphQL query pitrHaClusterReplicationHealth.

```sql
SELECT
environment_id,
root_service_id,
all_healthy,
checked_at,
members,
reachable
FROM railway.storage.pitr_ha_clusters
WHERE environment_id = '{{ environment_id }}' -- required
AND root_service_id = '{{ root_service_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="disable_pitr"
    values={[
        { label: 'disable_pitr', value: 'disable_pitr' },
        { label: 'enable_pitr', value: 'enable_pitr' }
    ]}
>
<TabItem value="disable_pitr">

Disables point-in-time recovery on an HA database cluster with the same rolling rollout as enable. The backup bucket is left intact, so existing backup history is preserved. Backed by the Railway GraphQL mutation disablePitrForHaCluster.

```sql
EXEC railway.storage.pitr_ha_clusters.disable_pitr 
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@root_service_id='{{ root_service_id }}' --required
;
```
</TabItem>
<TabItem value="enable_pitr">

Enables point-in-time recovery on an HA database cluster (Postgres HA, MySQL HA) with a rolling, near-zero-downtime rollout across its members. Safe to retry. Backed by the Railway GraphQL mutation enablePitrForHaCluster.

```sql
EXEC railway.storage.pitr_ha_clusters.enable_pitr 
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@root_service_id='{{ root_service_id }}' --required
;
```
</TabItem>
</Tabs>
