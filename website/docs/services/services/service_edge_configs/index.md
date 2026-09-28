--- 
title: service_edge_configs
hide_title: false
hide_table_of_contents: false
keywords:
  - service_edge_configs
  - services
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

Creates, updates, deletes, gets or lists a <code>service_edge_configs</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="service_edge_configs" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.services.service_edge_configs" /></td></tr>
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

One EdgeConfig row.

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
    <td><CopyableCode code="caching" /></td>
    <td><code>object</code></td>
    <td>EdgeCachingConfig object</td>
</tr>
<tr>
    <td><CopyableCode code="edge_rules" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="overrides" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="purge_epoch" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="purge_epoch_by_kind" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tracing" /></td>
    <td><code>object</code></td>
    <td>EdgeTracingConfig object</td>
</tr>
<tr>
    <td><CopyableCode code="under_attack_mode_until" /></td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Gets a EdgeConfig of a ServiceInstance. Backed by the Railway GraphQL query serviceInstance.edgeConfig.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-config"><code>config</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Updates the edge config (caching settings) for a service. Backed by the Railway GraphQL mutation updateServiceEdgeConfig.</td>
</tr>
<tr>
    <td><a href="#disable_cdn"><CopyableCode code="disable_cdn" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Disables CDN for a service, soft-deleting the edge config. Backed by the Railway GraphQL mutation disableServiceCdn.</td>
</tr>
<tr>
    <td><a href="#enable_cdn"><CopyableCode code="enable_cdn" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-config"><code>config</code></a></td>
    <td>Enables CDN for a service, creating an edge config and attaching all live domains. Backed by the Railway GraphQL mutation enableServiceCdn.</td>
</tr>
<tr>
    <td><a href="#purge_cache"><CopyableCode code="purge_cache" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-scope"><code>scope</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Purges the CDN cache for a service. Bumps the edge config's purge epoch so every edge node treats prior cached entries as stale on next request. Idempotent; returns true even if CDN is disabled for the service. Backed by the Railway GraphQL mutation purgeServiceCache.</td>
</tr>
<tr>
    <td><a href="#set_under_attack_mode"><CopyableCode code="set_under_attack_mode" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-enabled"><code>enabled</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-duration_seconds"><code>duration_seconds</code></a></td>
    <td>Enables or disables Under Attack Mode for a service. While enabled, the edge serves a browser challenge to unverified visitors of the service's edge-routed domains; non-browser clients (APIs, webhooks) without a clearance cookie are rejected with a 429. Optionally time-boxed via durationSeconds, after which the mode disarms automatically. Backed by the Railway GraphQL mutation setServiceUnderAttackMode.</td>
</tr>
<tr>
    <td><a href="#update_rules"><CopyableCode code="update_rules" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-edge_rules"><code>edge_rules</code></a></td>
    <td>Replaces the service's edge rules (whole-section replace; null clears). Rules are boolean expressions over request attributes plus one action (block/allow/challenge/redirect/cache_override), evaluated at the edge before requests reach the service. The ruleset is validated server-side; invalid rulesets are rejected with per-rule diagnostics and nothing is written. Rules without an id get a server-assigned stable `rul_` id. Backed by the Railway GraphQL mutation updateServiceEdgeRules.</td>
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
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-config">
    <td><CopyableCode code="config" /></td>
    <td><code>object</code></td>
    <td>JSON object of GraphQL type EdgeConfigInput; keys keep the API's camelCase names.</td>
</tr>
<tr id="parameter-duration_seconds">
    <td><CopyableCode code="duration_seconds" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
<tr id="parameter-edge_rules">
    <td><CopyableCode code="edge_rules" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-enabled">
    <td><CopyableCode code="enabled" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-scope">
    <td><CopyableCode code="scope" /></td>
    <td><code>string</code></td>
    <td>(ALL, HTML)</td>
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

Gets a EdgeConfig of a ServiceInstance. Backed by the Railway GraphQL query serviceInstance.edgeConfig.

```sql
SELECT
id,
caching,
edge_rules,
enabled,
overrides,
purge_epoch,
purge_epoch_by_kind,
tracing,
under_attack_mode_until
FROM railway.services.service_edge_configs
WHERE environment_id = '{{ environment_id }}' -- required
AND service_id = '{{ service_id }}' -- required
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

Updates the edge config (caching settings) for a service. Backed by the Railway GraphQL mutation updateServiceEdgeConfig.

```sql
UPDATE railway.services.service_edge_configs
SET 

WHERE 
config = '{{ config }}' --required
AND environment_id = '{{ environment_id }}' --required
AND service_id = '{{ service_id }}' --required
RETURNING
id,
caching,
edge_rules,
enabled,
overrides,
purge_epoch,
purge_epoch_by_kind,
tracing,
under_attack_mode_until;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="disable_cdn"
    values={[
        { label: 'disable_cdn', value: 'disable_cdn' },
        { label: 'enable_cdn', value: 'enable_cdn' },
        { label: 'purge_cache', value: 'purge_cache' },
        { label: 'set_under_attack_mode', value: 'set_under_attack_mode' },
        { label: 'update_rules', value: 'update_rules' }
    ]}
>
<TabItem value="disable_cdn">

Disables CDN for a service, soft-deleting the edge config. Backed by the Railway GraphQL mutation disableServiceCdn.

```sql
EXEC railway.services.service_edge_configs.disable_cdn 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="enable_cdn">

Enables CDN for a service, creating an edge config and attaching all live domains. Backed by the Railway GraphQL mutation enableServiceCdn.

```sql
EXEC railway.services.service_edge_configs.enable_cdn 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@config='{{ config }}'
;
```
</TabItem>
<TabItem value="purge_cache">

Purges the CDN cache for a service. Bumps the edge config's purge epoch so every edge node treats prior cached entries as stale on next request. Idempotent; returns true even if CDN is disabled for the service. Backed by the Railway GraphQL mutation purgeServiceCache.

```sql
EXEC railway.services.service_edge_configs.purge_cache 
@environment_id='{{ environment_id }}', --required
@scope='{{ scope }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="set_under_attack_mode">

Enables or disables Under Attack Mode for a service. While enabled, the edge serves a browser challenge to unverified visitors of the service's edge-routed domains; non-browser clients (APIs, webhooks) without a clearance cookie are rejected with a 429. Optionally time-boxed via durationSeconds, after which the mode disarms automatically. Backed by the Railway GraphQL mutation setServiceUnderAttackMode.

```sql
EXEC railway.services.service_edge_configs.set_under_attack_mode 
@enabled='{{ enabled }}', --required
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@duration_seconds='{{ duration_seconds }}'
;
```
</TabItem>
<TabItem value="update_rules">

Replaces the service's edge rules (whole-section replace; null clears). Rules are boolean expressions over request attributes plus one action (block/allow/challenge/redirect/cache_override), evaluated at the edge before requests reach the service. The ruleset is validated server-side; invalid rulesets are rejected with per-rule diagnostics and nothing is written. Rules without an id get a server-assigned stable `rul_` id. Backed by the Railway GraphQL mutation updateServiceEdgeRules.

```sql
EXEC railway.services.service_edge_configs.update_rules 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@edge_rules='{{ edge_rules }}'
;
```
</TabItem>
</Tabs>
