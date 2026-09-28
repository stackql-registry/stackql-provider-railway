--- 
title: workspace_policies
hide_title: false
hide_table_of_contents: false
keywords:
  - workspace_policies
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

Creates, updates, deletes, gets or lists a <code>workspace_policies</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workspace_policies" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.workspace_policies" /></td></tr>
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

One WorkspacePolicy row.

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
    <td><CopyableCode code="restrict_deploys_to_allowed_sources" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="restrict_public_tcp_proxies" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="restrict_railway_domain_generation" /></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Get the policies for a workspace. Backed by the Railway GraphQL query workspacePolicy.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-input_enabled"><code>input_enabled</code></a>, <a href="#parameter-input_policy"><code>input_policy</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Enable or disable a workspace policy. Enterprise workspaces only. Backed by the Railway GraphQL mutation workspacePolicyItemUpdate.</td>
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
<tr id="parameter-input_enabled">
    <td><CopyableCode code="input_enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-input_policy">
    <td><CopyableCode code="input_policy" /></td>
    <td><code>string</code></td>
    <td>(RESTRICT_DEPLOYS_TO_ALLOWED_SOURCES, RESTRICT_PUBLIC_TCP_PROXIES, RESTRICT_RAILWAY_DOMAIN_GENERATION)</td>
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

Get the policies for a workspace. Backed by the Railway GraphQL query workspacePolicy.

```sql
SELECT
id,
restrict_deploys_to_allowed_sources,
restrict_public_tcp_proxies,
restrict_railway_domain_generation
FROM railway.workspaces.workspace_policies
WHERE workspace_id = '{{ workspace_id }}' -- required
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

Enable or disable a workspace policy. Enterprise workspaces only. Backed by the Railway GraphQL mutation workspacePolicyItemUpdate.

```sql
UPDATE railway.workspaces.workspace_policies
SET 
enabled = '{{ enabled }}',
policy = '{{ policy }}'
WHERE 
input_enabled = '{{ input_enabled }}' --required
AND input_policy = '{{ input_policy }}' --required
AND workspace_id = '{{ workspace_id }}' --required
RETURNING
result;
```
</TabItem>
</Tabs>
