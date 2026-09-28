--- 
title: preferences
hide_title: false
hide_table_of_contents: false
keywords:
  - preferences
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

Creates, updates, deletes, gets or lists a <code>preferences</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="preferences" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.account.preferences" /></td></tr>
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

One Preferences row.

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
    <td><CopyableCode code="build_failed_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="changelog_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="community_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deploy_crashed_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ephemeral_environment_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="marketing_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subprocessor_updates_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="template_queue_email" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="usage_email" /></td>
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
    <td></td>
    <td><a href="#parameter-token"><code>token</code></a></td>
    <td>Get the email preferences for a user. Backed by the Railway GraphQL query preferences.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td></td>
    <td><a href="#parameter-build_failed_email"><code>build_failed_email</code></a>, <a href="#parameter-changelog_email"><code>changelog_email</code></a>, <a href="#parameter-community_email"><code>community_email</code></a>, <a href="#parameter-deploy_crashed_email"><code>deploy_crashed_email</code></a>, <a href="#parameter-ephemeral_environment_email"><code>ephemeral_environment_email</code></a>, <a href="#parameter-marketing_email"><code>marketing_email</code></a>, <a href="#parameter-subprocessor_updates_email"><code>subprocessor_updates_email</code></a>, <a href="#parameter-template_queue_email"><code>template_queue_email</code></a>, <a href="#parameter-token"><code>token</code></a>, <a href="#parameter-usage_email"><code>usage_email</code></a></td>
    <td>Update the email preferences for a user. Backed by the Railway GraphQL mutation preferencesUpdate.</td>
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
<tr id="parameter-token">
    <td><CopyableCode code="token" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-build_failed_email">
    <td><CopyableCode code="build_failed_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-changelog_email">
    <td><CopyableCode code="changelog_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-community_email">
    <td><CopyableCode code="community_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-deploy_crashed_email">
    <td><CopyableCode code="deploy_crashed_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-ephemeral_environment_email">
    <td><CopyableCode code="ephemeral_environment_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-marketing_email">
    <td><CopyableCode code="marketing_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-subprocessor_updates_email">
    <td><CopyableCode code="subprocessor_updates_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-template_queue_email">
    <td><CopyableCode code="template_queue_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-usage_email">
    <td><CopyableCode code="usage_email" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
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

Get the email preferences for a user. Backed by the Railway GraphQL query preferences.

```sql
SELECT
id,
build_failed_email,
changelog_email,
community_email,
deploy_crashed_email,
ephemeral_environment_email,
marketing_email,
subprocessor_updates_email,
template_queue_email,
usage_email
FROM railway.account.preferences
WHERE token = '{{ token }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="update"
    values={[
        { label: 'update', value: 'update' }
    ]}
>
<TabItem value="update">

Update the email preferences for a user. Backed by the Railway GraphQL mutation preferencesUpdate.

```sql
EXEC railway.account.preferences.update 
@build_failed_email='{{ build_failed_email }}',
@changelog_email='{{ changelog_email }}',
@community_email='{{ community_email }}',
@deploy_crashed_email='{{ deploy_crashed_email }}',
@ephemeral_environment_email='{{ ephemeral_environment_email }}',
@marketing_email='{{ marketing_email }}',
@subprocessor_updates_email='{{ subprocessor_updates_email }}',
@template_queue_email='{{ template_queue_email }}',
@token='{{ token }}',
@usage_email='{{ usage_email }}'
;
```
</TabItem>
</Tabs>
