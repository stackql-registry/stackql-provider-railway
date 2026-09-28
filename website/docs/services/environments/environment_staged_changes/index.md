--- 
title: environment_staged_changes
hide_title: false
hide_table_of_contents: false
keywords:
  - environment_staged_changes
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

Creates, updates, deletes, gets or lists an <code>environment_staged_changes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environment_staged_changes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.environments.environment_staged_changes" /></td></tr>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Get the latest staged commit for a single environment. Backed by the Railway GraphQL query environmentStagedChanges.</td>
</tr>
<tr>
    <td><a href="#commit"><CopyableCode code="commit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-commit_message"><code>commit_message</code></a>, <a href="#parameter-skip_deploys"><code>skip_deploys</code></a></td>
    <td>Commits the staged changes for a single environment. Backed by the Railway GraphQL mutation environmentPatchCommitStaged.</td>
</tr>
<tr>
    <td><a href="#stage"><CopyableCode code="stage" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-input"><code>input</code></a></td>
    <td><a href="#parameter-merge"><code>merge</code></a></td>
    <td>Sets the staged patch for a single environment. Backed by the Railway GraphQL mutation environmentStageChanges.</td>
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
<tr id="parameter-commit_message">
    <td><CopyableCode code="commit_message" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-input">
    <td><CopyableCode code="input" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-merge">
    <td><CopyableCode code="merge" /></td>
    <td><code>string</code></td>
    <td>Merge the input patch into the existing staged patch. Boolean passed as a string, for example 'true'.</td>
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
        { label: 'get', value: 'get' }
    ]}
>
<TabItem value="get">

Get the latest staged commit for a single environment. Backed by the Railway GraphQL query environmentStagedChanges.

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
FROM railway.environments.environment_staged_changes
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
        { label: 'stage', value: 'stage' }
    ]}
>
<TabItem value="commit">

Commits the staged changes for a single environment. Backed by the Railway GraphQL mutation environmentPatchCommitStaged.

```sql
EXEC railway.environments.environment_staged_changes.commit 
@environment_id='{{ environment_id }}', --required
@commit_message='{{ commit_message }}',
@skip_deploys='{{ skip_deploys }}'
;
```
</TabItem>
<TabItem value="stage">

Sets the staged patch for a single environment. Backed by the Railway GraphQL mutation environmentStageChanges.

```sql
EXEC railway.environments.environment_staged_changes.stage 
@environment_id='{{ environment_id }}', --required
@input='{{ input }}', --required
@merge='{{ merge }}'
;
```
</TabItem>
</Tabs>
