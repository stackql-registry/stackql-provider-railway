--- 
title: egress_gateways
hide_title: false
hide_table_of_contents: false
keywords:
  - egress_gateways
  - networking
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

Creates, updates, deletes, gets or lists an <code>egress_gateways</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="egress_gateways" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.networking.egress_gateways" /></td></tr>
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

One row per EgressGateway.

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
    <td><CopyableCode code="ipv4" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="zone" /></td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>All egress gateways assigned to a service instance. Backed by the Railway GraphQL query egressGateways.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Create a new egress gateway association for a service instance. Backed by the Railway GraphQL mutation egressGatewayAssociationCreate.</td>
</tr>
<tr>
    <td><a href="#clear"><CopyableCode code="clear" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-all_environments"><code>all_environments</code></a></td>
    <td>Clear all egress gateway associations for a service instance. Backed by the Railway GraphQL mutation egressGatewayAssociationsClear.</td>
</tr>
<tr>
    <td><a href="#preview_ha_migration"><CopyableCode code="preview_ha_migration" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-all_environments"><code>all_environments</code></a></td>
    <td>Preview the HA static egress IPs that would be assigned, without applying them. Set allEnvironments to cover all of the service's environments. Backed by the Railway GraphQL mutation egressGatewayHAMigrationPreview.</td>
</tr>
<tr>
    <td><a href="#rollback_from_ha"><CopyableCode code="rollback_from_ha" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-all_environments"><code>all_environments</code></a></td>
    <td>Switch a service from HA static egress IPs back to a standard static IP. Set allEnvironments to apply to all of the service's environments. Backed by the Railway GraphQL mutation egressGatewayRollbackFromHA.</td>
</tr>
<tr>
    <td><a href="#upgrade_to_ha"><CopyableCode code="upgrade_to_ha" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-all_environments"><code>all_environments</code></a></td>
    <td>Enable HA static egress IPs for a service. Set allEnvironments to apply to all of the service's environments. Backed by the Railway GraphQL mutation egressGatewayUpgradeToHA.</td>
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
<tr id="parameter-all_environments">
    <td><CopyableCode code="all_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
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

All egress gateways assigned to a service instance. Backed by the Railway GraphQL query egressGateways.

```sql
SELECT
ipv4,
region,
zone
FROM railway.networking.egress_gateways
WHERE environment_id = '{{ environment_id }}' -- required
AND service_id = '{{ service_id }}' -- required
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

Create a new egress gateway association for a service instance. Backed by the Railway GraphQL mutation egressGatewayAssociationCreate.

```sql
INSERT INTO railway.networking.egress_gateways (
environment_id,
region,
service_id
)
SELECT 
'{{ environment_id }}' /* required */,
'{{ region }}',
'{{ service_id }}' /* required */
RETURNING
ipv4,
region,
zone
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: egress_gateways
  props:
    - name: environment_id
      value: "{{ environment_id }}"
    - name: region
      value: "{{ region }}"
    - name: service_id
      value: "{{ service_id }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="clear"
    values={[
        { label: 'clear', value: 'clear' }
    ]}
>
<TabItem value="clear">

Clear all egress gateway associations for a service instance. Backed by the Railway GraphQL mutation egressGatewayAssociationsClear.

```sql
DELETE FROM railway.networking.egress_gateways
WHERE 
environment_id = '{{ environment_id }}' --required
AND service_id = '{{ service_id }}' --required
AND all_environments = '{{ all_environments }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="preview_ha_migration"
    values={[
        { label: 'preview_ha_migration', value: 'preview_ha_migration' },
        { label: 'rollback_from_ha', value: 'rollback_from_ha' },
        { label: 'upgrade_to_ha', value: 'upgrade_to_ha' }
    ]}
>
<TabItem value="preview_ha_migration">

Preview the HA static egress IPs that would be assigned, without applying them. Set allEnvironments to cover all of the service's environments. Backed by the Railway GraphQL mutation egressGatewayHAMigrationPreview.

```sql
EXEC railway.networking.egress_gateways.preview_ha_migration 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@all_environments='{{ all_environments }}'
;
```
</TabItem>
<TabItem value="rollback_from_ha">

Switch a service from HA static egress IPs back to a standard static IP. Set allEnvironments to apply to all of the service's environments. Backed by the Railway GraphQL mutation egressGatewayRollbackFromHA.

```sql
EXEC railway.networking.egress_gateways.rollback_from_ha 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@all_environments='{{ all_environments }}'
;
```
</TabItem>
<TabItem value="upgrade_to_ha">

Enable HA static egress IPs for a service. Set allEnvironments to apply to all of the service's environments. Backed by the Railway GraphQL mutation egressGatewayUpgradeToHA.

```sql
EXEC railway.networking.egress_gateways.upgrade_to_ha 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@all_environments='{{ all_environments }}'
;
```
</TabItem>
</Tabs>
