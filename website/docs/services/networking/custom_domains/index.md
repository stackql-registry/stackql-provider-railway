--- 
title: custom_domains
hide_title: false
hide_table_of_contents: false
keywords:
  - custom_domains
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

Creates, updates, deletes, gets or lists a <code>custom_domains</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="custom_domains" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.networking.custom_domains" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="list">

One row per CustomDomain.

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
    <td><CopyableCode code="edge_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_railway_domain" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>object</code></td>
    <td>CustomDomainStatus object</td>
</tr>
<tr>
    <td><CopyableCode code="sync_status" /></td>
    <td><code>string</code></td>
    <td> (ACTIVE, CREATING, DELETED, DELETING, UNSPECIFIED, UPDATING)</td>
</tr>
<tr>
    <td><CopyableCode code="target_port" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get">

One CustomDomain row.

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
    <td><CopyableCode code="edge_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_railway_domain" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>object</code></td>
    <td>CustomDomainStatus object</td>
</tr>
<tr>
    <td><CopyableCode code="sync_status" /></td>
    <td><code>string</code></td>
    <td> (ACTIVE, CREATING, DELETED, DELETING, UNSPECIFIED, UPDATING)</td>
</tr>
<tr>
    <td><CopyableCode code="target_port" /></td>
    <td><code>integer</code></td>
    <td></td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Lists CustomDomain objects of a AllDomains. Backed by the Railway GraphQL query domains.customDomains.</td>
</tr>
<tr>
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Fetch details for a custom domain. Backed by the Railway GraphQL query customDomain.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Creates a new custom domain. Backed by the Railway GraphQL mutation customDomainCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Updates a custom domain. Backed by the Railway GraphQL mutation customDomainUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Deletes a custom domain. Backed by the Railway GraphQL mutation customDomainDelete.</td>
</tr>
<tr>
    <td><a href="#issue_certificate"><CopyableCode code="issue_certificate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Issues a new certificate. Backed by the Railway GraphQL mutation customDomainIssueCertificate.</td>
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
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-domain">
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="list"
    values={[
        { label: 'list', value: 'list' },
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="list">

Lists CustomDomain objects of a AllDomains. Backed by the Railway GraphQL query domains.customDomains.

```sql
SELECT
id,
edge_id,
environment_id,
project_id,
service_id,
created_at,
deleted_at,
domain,
is_railway_domain,
status,
sync_status,
target_port,
updated_at
FROM railway.networking.custom_domains
WHERE environment_id = '{{ environment_id }}' -- required
AND project_id = '{{ project_id }}' -- required
AND service_id = '{{ service_id }}' -- required
;
```
</TabItem>
<TabItem value="get">

Fetch details for a custom domain. Backed by the Railway GraphQL query customDomain.

```sql
SELECT
id,
edge_id,
environment_id,
project_id,
service_id,
created_at,
deleted_at,
domain,
is_railway_domain,
status,
sync_status,
target_port,
updated_at
FROM railway.networking.custom_domains
WHERE id = '{{ id }}' -- required
AND project_id = '{{ project_id }}' -- required
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

Creates a new custom domain. Backed by the Railway GraphQL mutation customDomainCreate.

```sql
INSERT INTO railway.networking.custom_domains (
domain,
environment_id,
project_id,
service_id,
target_port
)
SELECT 
'{{ domain }}' /* required */,
'{{ environment_id }}' /* required */,
'{{ project_id }}' /* required */,
'{{ service_id }}' /* required */,
{{ target_port }}
RETURNING
id,
edge_id,
environment_id,
project_id,
service_id,
created_at,
deleted_at,
domain,
is_railway_domain,
status,
sync_status,
target_port,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: custom_domains
  props:
    - name: domain
      value: "{{ domain }}"
    - name: environment_id
      value: "{{ environment_id }}"
    - name: project_id
      value: "{{ project_id }}"
    - name: service_id
      value: "{{ service_id }}"
    - name: target_port
      value: {{ target_port }}
`}</CodeBlock>

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

Updates a custom domain. Backed by the Railway GraphQL mutation customDomainUpdate.

```sql
UPDATE railway.networking.custom_domains
SET 
target_port = '{{ target_port }}'
WHERE 
environment_id = '{{ environment_id }}' --required
AND id = '{{ id }}' --required
RETURNING
result;
```
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

Deletes a custom domain. Backed by the Railway GraphQL mutation customDomainDelete.

```sql
DELETE FROM railway.networking.custom_domains
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="issue_certificate"
    values={[
        { label: 'issue_certificate', value: 'issue_certificate' }
    ]}
>
<TabItem value="issue_certificate">

Issues a new certificate. Backed by the Railway GraphQL mutation customDomainIssueCertificate.

```sql
EXEC railway.networking.custom_domains.issue_certificate 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
