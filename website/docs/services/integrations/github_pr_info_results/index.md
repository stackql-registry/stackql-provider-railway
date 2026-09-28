--- 
title: github_pr_info_results
hide_title: false
hide_table_of_contents: false
keywords:
  - github_pr_info_results
  - integrations
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

Creates, updates, deletes, gets or lists a <code>github_pr_info_results</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="github_pr_info_results" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.integrations.github_pr_info_results" /></td></tr>
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

One GitHubPRInfoResult row.

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
    <td><CopyableCode code="error" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pr_info" /></td>
    <td><code>object</code></td>
    <td>GitHubPRInfo object</td>
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
    <td><a href="#parameter-pr_number"><code>pr_number</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Get info for a GitHub pull request, including fetch errors. Backed by the Railway GraphQL query githubPRInfoResult.</td>
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
<tr id="parameter-pr_number">
    <td><CopyableCode code="pr_number" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
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

Get info for a GitHub pull request, including fetch errors. Backed by the Railway GraphQL query githubPRInfoResult.

```sql
SELECT
error,
pr_info
FROM railway.integrations.github_pr_info_results
WHERE pr_number = '{{ pr_number }}' -- required
AND service_id = '{{ service_id }}' -- required
;
```
</TabItem>
</Tabs>
