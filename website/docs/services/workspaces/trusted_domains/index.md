--- 
title: trusted_domains
hide_title: false
hide_table_of_contents: false
keywords:
  - trusted_domains
  - workspaces
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

Creates, updates, deletes, gets or lists a <code>trusted_domains</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="trusted_domains" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.trusted_domains" /></td></tr>
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

One row per TrustedDomain.

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
    <td><CopyableCode code="domain_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (FAILED, PENDING, VERIFIED)</td>
</tr>
<tr>
    <td><CopyableCode code="verification_data" /></td>
    <td><code>object</code></td>
    <td>TrustedDomainVerificationData object</td>
</tr>
<tr>
    <td><CopyableCode code="verification_type" /></td>
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
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Get all trusted domains for a workspace. Backed by the Railway GraphQL query trustedDomains.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-domain_name"><code>domain_name</code></a>, <a href="#parameter-role"><code>role</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Create a new trusted domain for this workspace. Backed by the Railway GraphQL mutation trustedDomainCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-role"><code>role</code></a></td>
    <td></td>
    <td>Update the role of a trusted domain. Backed by the Railway GraphQL mutation trustedDomainUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete a trusted domain. Backed by the Railway GraphQL mutation trustedDomainDelete.</td>
</tr>
<tr>
    <td><a href="#retrigger_verification"><CopyableCode code="retrigger_verification" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Retrigger verification for a failed trusted domain. Backed by the Railway GraphQL mutation trustedDomainRetriggerVerification.</td>
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
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-domain_name">
    <td><CopyableCode code="domain_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-role">
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
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

Get all trusted domains for a workspace. Backed by the Railway GraphQL query trustedDomains.

```sql
SELECT
id,
workspace_id,
domain_name,
role,
status,
verification_data,
verification_type
FROM railway.workspaces.trusted_domains
WHERE workspace_id = '{{ workspace_id }}' -- required
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

Create a new trusted domain for this workspace. Backed by the Railway GraphQL mutation trustedDomainCreate.

```sql
INSERT INTO railway.workspaces.trusted_domains (
domain_name,
role,
workspace_id
)
SELECT 
'{{ domain_name }}' /* required */,
'{{ role }}' /* required */,
'{{ workspace_id }}' /* required */
RETURNING
id,
workspace_id,
domain_name,
role,
status,
verification_data,
verification_type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: trusted_domains
  props:
    - name: domain_name
      value: "{{ domain_name }}"
    - name: role
      value: "{{ role }}"
    - name: workspace_id
      value: "{{ workspace_id }}"
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

Update the role of a trusted domain. Backed by the Railway GraphQL mutation trustedDomainUpdate.

```sql
UPDATE railway.workspaces.trusted_domains
SET 

WHERE 
id = '{{ id }}' --required
AND role = '{{ role }}' --required
RETURNING
id,
workspace_id,
domain_name,
role,
status,
verification_data,
verification_type;
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

Delete a trusted domain. Backed by the Railway GraphQL mutation trustedDomainDelete.

```sql
DELETE FROM railway.workspaces.trusted_domains
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="retrigger_verification"
    values={[
        { label: 'retrigger_verification', value: 'retrigger_verification' }
    ]}
>
<TabItem value="retrigger_verification">

Retrigger verification for a failed trusted domain. Backed by the Railway GraphQL mutation trustedDomainRetriggerVerification.

```sql
EXEC railway.workspaces.trusted_domains.retrigger_verification 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
