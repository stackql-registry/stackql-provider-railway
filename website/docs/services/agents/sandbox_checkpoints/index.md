--- 
title: sandbox_checkpoints
hide_title: false
hide_table_of_contents: false
keywords:
  - sandbox_checkpoints
  - agents
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

Creates, updates, deletes, gets or lists a <code>sandbox_checkpoints</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sandbox_checkpoints" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.sandbox_checkpoints" /></td></tr>
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

One row per SandboxCheckpoint. A bootable snapshot of a sandbox's disk, scoped to an environment. Built from a template recipe or captured from a running sandbox.

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
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="key" /></td>
    <td><code>string</code></td>
    <td>The checkpoint's identity within the environment (same as id): a recipe content hash for a built template, or the user-given name for one captured from a sandbox.</td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>List named sandbox checkpoints in an environment. Backed by the Railway GraphQL query sandboxCheckpoints.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-sandbox_id"><code>sandbox_id</code></a></td>
    <td></td>
    <td>Capture a running sandbox's current disk into a reusable, named checkpoint. Synchronous: the checkpoint is ready when this returns. Backed by the Railway GraphQL mutation sandboxCheckpointCreate.</td>
</tr>
<tr>
    <td><a href="#rename"><CopyableCode code="rename" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a>, <a href="#parameter-name"><code>name</code></a></td>
    <td></td>
    <td>Rename a sandbox checkpoint. Backed by the Railway GraphQL mutation sandboxCheckpointRename.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete a sandbox checkpoint. Backed by the Railway GraphQL mutation sandboxCheckpointDelete.</td>
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
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-sandbox_id">
    <td><CopyableCode code="sandbox_id" /></td>
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

List named sandbox checkpoints in an environment. Backed by the Railway GraphQL query sandboxCheckpoints.

```sql
SELECT
id,
environment_id,
created_at,
key
FROM railway.agents.sandbox_checkpoints
WHERE environment_id = '{{ environment_id }}' -- required
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

Capture a running sandbox's current disk into a reusable, named checkpoint. Synchronous: the checkpoint is ready when this returns. Backed by the Railway GraphQL mutation sandboxCheckpointCreate.

```sql
INSERT INTO railway.agents.sandbox_checkpoints (
environment_id,
name,
sandbox_id
)
SELECT 
'{{ environment_id }}' /* required */,
'{{ name }}' /* required */,
'{{ sandbox_id }}' /* required */
RETURNING
id,
environment_id,
created_at,
key
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: sandbox_checkpoints
  props:
    - name: environment_id
      value: "{{ environment_id }}"
    - name: name
      value: "{{ name }}"
    - name: sandbox_id
      value: "{{ sandbox_id }}"
`}</CodeBlock>

</TabItem>
</Tabs>


## `UPDATE` examples

<Tabs
    defaultValue="rename"
    values={[
        { label: 'rename', value: 'rename' }
    ]}
>
<TabItem value="rename">

Rename a sandbox checkpoint. Backed by the Railway GraphQL mutation sandboxCheckpointRename.

```sql
UPDATE railway.agents.sandbox_checkpoints
SET 

WHERE 
environment_id = '{{ environment_id }}' --required
AND id = '{{ id }}' --required
AND name = '{{ name }}' --required
RETURNING
id,
environment_id,
created_at,
key;
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

Delete a sandbox checkpoint. Backed by the Railway GraphQL mutation sandboxCheckpointDelete.

```sql
DELETE FROM railway.agents.sandbox_checkpoints
WHERE 
environment_id = '{{ environment_id }}' --required
AND id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>
