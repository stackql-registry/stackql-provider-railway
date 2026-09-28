--- 
title: environment_change_sets
hide_title: false
hide_table_of_contents: false
keywords:
  - environment_change_sets
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

Creates, updates, deletes, gets or lists an <code>environment_change_sets</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="environment_change_sets" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.environments.environment_change_sets" /></td></tr>
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

One ChangeSetApplyResult row.

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
    <td><CopyableCode code="deployment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="operation_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="staged_patch_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="changes" /></td>
    <td><code>array</code></td>
    <td>List of ChangeOperationResult objects</td>
</tr>
<tr>
    <td><CopyableCode code="diagnostics" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Returns the status or completed result of an asynchronous RailwayChangeSet apply. Backed by the Railway GraphQL query environmentChangeSetApply.</td>
</tr>
<tr>
    <td><a href="#apply"><CopyableCode code="apply" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-input"><code>input</code></a></td>
    <td><a href="#parameter-base_config_etag"><code>base_config_etag</code></a>, <a href="#parameter-commit_message"><code>commit_message</code></a>, <a href="#parameter-wait_for_completion"><code>wait_for_completion</code></a></td>
    <td>Experimental: applies an intent-level RailwayChangeSet and returns operation results. Backed by the Railway GraphQL mutation environmentApplyChangeSet.</td>
</tr>
<tr>
    <td><a href="#preview"><CopyableCode code="preview" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-input"><code>input</code></a></td>
    <td></td>
    <td>Experimental: previews an intent-level RailwayChangeSet without side effects. Backed by the Railway GraphQL mutation environmentPreviewChangeSet.</td>
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
<tr id="parameter-base_config_etag">
    <td><CopyableCode code="base_config_etag" /></td>
    <td><code>string</code></td>
    <td>Snapshot token from Environment.configEtag the plan was computed against. When set, the apply is rejected if the environment has changed since.</td>
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
<tr id="parameter-wait_for_completion">
    <td><CopyableCode code="wait_for_completion" /></td>
    <td><code>string</code></td>
    <td>Defaults to true for compatibility. Async-capable clients set false and poll environmentChangeSetApply. Boolean passed as a string, for example 'true'.</td>
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

Returns the status or completed result of an asynchronous RailwayChangeSet apply. Backed by the Railway GraphQL query environmentChangeSetApply.

```sql
SELECT
id,
deployment_id,
operation_id,
staged_patch_id,
changes,
diagnostics,
status
FROM railway.environments.environment_change_sets
WHERE environment_id = '{{ environment_id }}' -- required
AND id = '{{ id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="apply"
    values={[
        { label: 'apply', value: 'apply' },
        { label: 'preview', value: 'preview' }
    ]}
>
<TabItem value="apply">

Experimental: applies an intent-level RailwayChangeSet and returns operation results. Backed by the Railway GraphQL mutation environmentApplyChangeSet.

```sql
EXEC railway.environments.environment_change_sets.apply 
@environment_id='{{ environment_id }}', --required
@input='{{ input }}', --required
@base_config_etag='{{ base_config_etag }}',
@commit_message='{{ commit_message }}',
@wait_for_completion='{{ wait_for_completion }}'
;
```
</TabItem>
<TabItem value="preview">

Experimental: previews an intent-level RailwayChangeSet without side effects. Backed by the Railway GraphQL mutation environmentPreviewChangeSet.

```sql
EXEC railway.environments.environment_change_sets.preview 
@environment_id='{{ environment_id }}', --required
@input='{{ input }}' --required
;
```
</TabItem>
</Tabs>
