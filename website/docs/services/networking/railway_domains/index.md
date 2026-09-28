--- 
title: railway_domains
hide_title: false
hide_table_of_contents: false
keywords:
  - railway_domains
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

Creates, updates, deletes, gets or lists a <code>railway_domains</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="railway_domains" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.networking.railway_domains" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get_by_name"
    values={[
        { label: 'get_by_name', value: 'get_by_name' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_name">

One RailwayDomain row.

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
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspace_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="auto_renew_enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="connected_service_instances" /></td>
    <td><code>array</code></td>
    <td>List of ConnectedServiceInstance objects</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="nameservers" /></td>
    <td><code>object</code></td>
    <td>Authoritative nameservers currently delegated for this domain at the registrar.</td>
</tr>
<tr>
    <td><CopyableCode code="next_billing_date" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="purchase_price" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="registration_years" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="renewal_price" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (ACTIVE, EXPIRED, PURCHASING, REFUNDED)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get">

One RailwayDomain row.

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
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspace_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="auto_renew_enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="connected_service_instances" /></td>
    <td><code>array</code></td>
    <td>List of ConnectedServiceInstance objects</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="nameservers" /></td>
    <td><code>object</code></td>
    <td>Authoritative nameservers currently delegated for this domain at the registrar.</td>
</tr>
<tr>
    <td><CopyableCode code="next_billing_date" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="purchase_price" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="registration_years" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="renewal_price" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (ACTIVE, EXPIRED, PURCHASING, REFUNDED)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per RailwayDomain.

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
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspace_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="auto_renew_enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="connected_service_instances" /></td>
    <td><code>array</code></td>
    <td>List of ConnectedServiceInstance objects</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="nameservers" /></td>
    <td><code>object</code></td>
    <td>Authoritative nameservers currently delegated for this domain at the registrar.</td>
</tr>
<tr>
    <td><CopyableCode code="next_billing_date" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="purchase_price" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="registration_years" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="renewal_price" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (ACTIVE, EXPIRED, PURCHASING, REFUNDED)</td>
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
    <td><a href="#get_by_name"><CopyableCode code="get_by_name" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Get a Railway domain by its domain name within a workspace. Backed by the Railway GraphQL query railwayDomainByName.</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Get a Railway domain by ID. Backed by the Railway GraphQL query railwayDomain.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-status"><code>status</code></a></td>
    <td>Get Railway domains for a workspace. Backed by the Railway GraphQL query railwayDomains.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Update a Railway domain's settings. Backed by the Railway GraphQL mutation railwayDomainUpdate.</td>
</tr>
<tr>
    <td><a href="#set_nameservers"><CopyableCode code="set_nameservers" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-nameservers"><code>nameservers</code></a></td>
    <td></td>
    <td>Delegate the domain's authoritative nameservers to an external DNS provider, or reset to Railway defaults by passing an empty list. Backed by the Railway GraphQL mutation railwayDomainNameserversSet.</td>
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
<tr id="parameter-domain">
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-nameservers">
    <td><CopyableCode code="nameservers" /></td>
    <td><code>array</code></td>
    <td>Hostnames of the nameservers to delegate to (2-13). Pass an empty list to reset to Name.com's account-level defaults for this domain.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get_by_name"
    values={[
        { label: 'get_by_name', value: 'get_by_name' },
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get_by_name">

Get a Railway domain by its domain name within a workspace. Backed by the Railway GraphQL query railwayDomainByName.

```sql
SELECT
id,
workspace_id,
workspace_name,
auto_renew_enabled,
connected_service_instances,
created_at,
domain,
nameservers,
next_billing_date,
purchase_price,
registration_years,
renewal_price,
status
FROM railway.networking.railway_domains
WHERE domain = '{{ domain }}' -- required
AND workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Get a Railway domain by ID. Backed by the Railway GraphQL query railwayDomain.

```sql
SELECT
id,
workspace_id,
workspace_name,
auto_renew_enabled,
connected_service_instances,
created_at,
domain,
nameservers,
next_billing_date,
purchase_price,
registration_years,
renewal_price,
status
FROM railway.networking.railway_domains
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Get Railway domains for a workspace. Backed by the Railway GraphQL query railwayDomains.

```sql
SELECT
id,
workspace_id,
workspace_name,
auto_renew_enabled,
connected_service_instances,
created_at,
domain,
nameservers,
next_billing_date,
purchase_price,
registration_years,
renewal_price,
status
FROM railway.networking.railway_domains
WHERE workspace_id = '{{ workspace_id }}' -- required
AND status = '{{ status }}'
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

Update a Railway domain's settings. Backed by the Railway GraphQL mutation railwayDomainUpdate.

```sql
UPDATE railway.networking.railway_domains
SET 
auto_renew_enabled = '{{ auto_renew_enabled }}'
WHERE 
id = '{{ id }}' --required
RETURNING
id,
workspace_id,
workspace_name,
auto_renew_enabled,
connected_service_instances,
created_at,
domain,
nameservers,
next_billing_date,
purchase_price,
registration_years,
renewal_price,
status;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="set_nameservers"
    values={[
        { label: 'set_nameservers', value: 'set_nameservers' }
    ]}
>
<TabItem value="set_nameservers">

Delegate the domain's authoritative nameservers to an external DNS provider, or reset to Railway defaults by passing an empty list. Backed by the Railway GraphQL mutation railwayDomainNameserversSet.

```sql
EXEC railway.networking.railway_domains.set_nameservers 
@id='{{ id }}', --required
@nameservers='{{ nameservers }}' --required
;
```
</TabItem>
</Tabs>
