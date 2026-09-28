--- 
title: environment_patches
hide_title: false
hide_table_of_contents: false
keywords:
  - environment_patches
  - environments
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

Creates, updates, deletes, gets or lists an <code>environment_patches</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environment_patches" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.environments.environment_patches" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One EnvironmentPatch row.

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
    <td><CopyableCode code="applied_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="applied_by" /></td>
    <td><code>object</code></td>
    <td>AppliedByMember object</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="last_applied_error" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="patch" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (APPLYING, COMMITTED, FAILED, STAGED)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per EnvironmentPatch.

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
    <td><CopyableCode code="applied_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="applied_by" /></td>
    <td><code>object</code></td>
    <td>AppliedByMember object</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="last_applied_error" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="message" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="patch" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (APPLYING, COMMITTED, FAILED, STAGED)</td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Get a single environment patch by ID. Backed by the Railway GraphQL query environmentPatch.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Get the patches for an environment. Backed by the Railway GraphQL query environmentPatches.</td>
</tr>
<tr>
    <td><a href="#commit"><CopyableCode code="commit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-commit_message"><code>commit_message</code></a>, <a href="#parameter-patch"><code>patch</code></a>, <a href="#parameter-skip_deploys"><code>skip_deploys</code></a></td>
    <td>Commit the provided patch to the environment. Backed by the Railway GraphQL mutation environmentPatchCommit.</td>
</tr>
<tr>
    <td><a href="#restage"><CopyableCode code="restage" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-patch_id"><code>patch_id</code></a></td>
    <td></td>
    <td>Copy a FAILED patch's changes into the environment's staged patch (creating one if needed). The FAILED patch is left untouched. Backed by the Railway GraphQL mutation environmentPatchRestage.</td>
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
<tr id="parameter-commit_message">
    <td><CopyableCode code="commit_message" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-patch">
    <td><CopyableCode code="patch" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-patch_id">
    <td><CopyableCode code="patch_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-skip_deploys">
    <td><CopyableCode code="skip_deploys" /></td>
    <td><code>string</code></td>
    <td>Skip deploys for services affected by this patch. Boolean passed as a string, for example 'true'.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get a single environment patch by ID. Backed by the Railway GraphQL query environmentPatch.

```sql
SELECT
id,
environment_id,
applied_at,
applied_by,
created_at,
last_applied_error,
message,
patch,
status,
updated_at
FROM railway.environments.environment_patches
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Get the patches for an environment. Backed by the Railway GraphQL query environmentPatches.

```sql
SELECT
id,
environment_id,
applied_at,
applied_by,
created_at,
last_applied_error,
message,
patch,
status,
updated_at
FROM railway.environments.environment_patches
WHERE environment_id = '{{ environment_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="commit"
    values={[
        { label: 'commit', value: 'commit' },
        { label: 'restage', value: 'restage' }
    ]}
>
<TabItem value="commit">

Commit the provided patch to the environment. Backed by the Railway GraphQL mutation environmentPatchCommit.

```sql
EXEC railway.environments.environment_patches.commit 
@environment_id='{{ environment_id }}', --required
@commit_message='{{ commit_message }}',
@patch='{{ patch }}',
@skip_deploys='{{ skip_deploys }}'
;
```
</TabItem>
<TabItem value="restage">

Copy a FAILED patch's changes into the environment's staged patch (creating one if needed). The FAILED patch is left untouched. Backed by the Railway GraphQL mutation environmentPatchRestage.

```sql
EXEC railway.environments.environment_patches.restage 
@patch_id='{{ patch_id }}' --required
;
```
</TabItem>
</Tabs>
