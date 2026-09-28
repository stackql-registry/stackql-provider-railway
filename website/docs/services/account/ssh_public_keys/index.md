--- 
title: ssh_public_keys
hide_title: false
hide_table_of_contents: false
keywords:
  - ssh_public_keys
  - account
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

Creates, updates, deletes, gets or lists a <code>ssh_public_keys</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="ssh_public_keys" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.account.ssh_public_keys" /></td></tr>
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

One row per SshPublicKey.

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
    <td><CopyableCode code="user_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fingerprint" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="public_key" /></td>
    <td><code>string</code></td>
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
    <td></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Gets SSH public keys. If workspaceId is provided, returns the keys owned by that workspace (requires workspace MEMBER access). Under a workspace-scoped API token, workspaceId defaults to the token's workspace when omitted; otherwise returns the authenticated user's personal keys. Backed by the Railway GraphQL query sshPublicKeys.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-public_key"><code>public_key</code></a></td>
    <td></td>
    <td>Creates a new SSH public key. When workspaceId is provided (or omitted under a workspace-scoped API token, in which case it defaults to the token's workspace), the key is owned by the workspace and can be used by anyone authenticating as that workspace via native SSH; requires workspace ADMIN access. Otherwise the key is owned by the authenticated user. Backed by the Railway GraphQL mutation sshPublicKeyCreate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Deletes an SSH public key. Backed by the Railway GraphQL mutation sshPublicKeyDelete.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-public_key">
    <td><CopyableCode code="public_key" /></td>
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

Gets SSH public keys. If workspaceId is provided, returns the keys owned by that workspace (requires workspace MEMBER access). Under a workspace-scoped API token, workspaceId defaults to the token's workspace when omitted; otherwise returns the authenticated user's personal keys. Backed by the Railway GraphQL query sshPublicKeys.

```sql
SELECT
id,
name,
user_id,
workspace_id,
created_at,
fingerprint,
public_key,
updated_at
FROM railway.account.ssh_public_keys
WHERE workspace_id = '{{ workspace_id }}'
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

Creates a new SSH public key. When workspaceId is provided (or omitted under a workspace-scoped API token, in which case it defaults to the token's workspace), the key is owned by the workspace and can be used by anyone authenticating as that workspace via native SSH; requires workspace ADMIN access. Otherwise the key is owned by the authenticated user. Backed by the Railway GraphQL mutation sshPublicKeyCreate.

```sql
INSERT INTO railway.account.ssh_public_keys (
name,
public_key,
workspace_id
)
SELECT 
'{{ name }}' /* required */,
'{{ public_key }}' /* required */,
'{{ workspace_id }}'
RETURNING
id,
name,
user_id,
workspace_id,
created_at,
fingerprint,
public_key,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: ssh_public_keys
  props:
    - name: name
      value: "{{ name }}"
    - name: public_key
      value: "{{ public_key }}"
    - name: workspace_id
      value: "{{ workspace_id }}"
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

Deletes an SSH public key. Backed by the Railway GraphQL mutation sshPublicKeyDelete.

```sql
DELETE FROM railway.account.ssh_public_keys
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>
