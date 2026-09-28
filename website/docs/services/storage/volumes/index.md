--- 
title: volumes
hide_title: false
hide_table_of_contents: false
keywords:
  - volumes
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

Creates, updates, deletes, gets or lists a <code>volumes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="volumes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.volumes" /></td></tr>
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

One row per Volume.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>Project object</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Lists Volume objects of a Project. Backed by the Railway GraphQL query project.volumes.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-mount_path"><code>mount_path</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Create a persistent volume in a project. Backed by the Railway GraphQL mutation volumeCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-volume_id"><code>volume_id</code></a></td>
    <td></td>
    <td>Update a persistent volume in a project. Backed by the Railway GraphQL mutation volumeUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-volume_id"><code>volume_id</code></a></td>
    <td></td>
    <td>Delete a persistent volume in a project. Backed by the Railway GraphQL mutation volumeDelete.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-mount_path">
    <td><CopyableCode code="mount_path" /></td>
    <td><code>string</code></td>
    <td>The path in the container to mount the volume to.</td>
</tr>
<tr id="parameter-volume_id">
    <td><CopyableCode code="volume_id" /></td>
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

Lists Volume objects of a Project. Backed by the Railway GraphQL query project.volumes.

```sql
SELECT
id,
name,
project_id,
created_at,
project
FROM railway.storage.volumes
WHERE project_id = '{{ project_id }}' -- required
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

Create a persistent volume in a project. Backed by the Railway GraphQL mutation volumeCreate.

```sql
INSERT INTO railway.storage.volumes (
environment_id,
mount_path,
project_id,
region,
service_id
)
SELECT 
'{{ environment_id }}',
'{{ mount_path }}' /* required */,
'{{ project_id }}' /* required */,
'{{ region }}',
'{{ service_id }}'
RETURNING
id,
name,
project_id,
created_at,
project
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: volumes
  props:
    - name: environment_id
      value: "{{ environment_id }}"
      description: |
        The environment to deploy the volume instances into. If \`null\`, the volume will not be deployed to any environment. \`undefined\` will deploy to all environments.
    - name: mount_path
      value: "{{ mount_path }}"
      description: |
        The path in the container to mount the volume to.
    - name: project_id
      value: "{{ project_id }}"
      description: |
        The project to create the volume in.
    - name: region
      value: "{{ region }}"
      description: |
        The region to create the volume instances in. If not provided, the default region will be used.
    - name: service_id
      value: "{{ service_id }}"
      description: |
        The service to attach the volume to. If not provided, the volume will be disconnected.
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

Update a persistent volume in a project. Backed by the Railway GraphQL mutation volumeUpdate.

```sql
UPDATE railway.storage.volumes
SET 
name = '{{ name }}'
WHERE 
volume_id = '{{ volume_id }}' --required
RETURNING
id,
name,
project_id,
created_at,
project;
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

Delete a persistent volume in a project. Backed by the Railway GraphQL mutation volumeDelete.

```sql
DELETE FROM railway.storage.volumes
WHERE 
volume_id = '{{ volume_id }}' --required
;
```
</TabItem>
</Tabs>
