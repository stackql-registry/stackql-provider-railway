--- 
title: project_compliance
hide_title: false
hide_table_of_contents: false
keywords:
  - project_compliance
  - projects
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

Creates, updates, deletes, gets or lists a <code>project_compliance</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_compliance" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.projects.project_compliance" /></td></tr>
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

One ProjectComplianceInfo row.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="member_permissions" /></td>
    <td><code>array</code></td>
    <td>Permissions for each project member</td>
</tr>
<tr>
    <td><CopyableCode code="service_backups" /></td>
    <td><code>array</code></td>
    <td>Backup schedules for database services</td>
</tr>
<tr>
    <td><CopyableCode code="two_factor_members" /></td>
    <td><code>array</code></td>
    <td>2FA status for each project member</td>
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
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Get comprehensive compliance information for a project including 2FA status, member permissions, backup schedules, and compliance agreements. Requires workspace API token with admin access. Backed by the Railway GraphQL query projectCompliance.</td>
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

Get comprehensive compliance information for a project including 2FA status, member permissions, backup schedules, and compliance agreements. Requires workspace API token with admin access. Backed by the Railway GraphQL query projectCompliance.

```sql
SELECT
project_id,
workspace_id,
project_name,
member_permissions,
service_backups,
two_factor_members
FROM railway.projects.project_compliance
WHERE project_id = '{{ project_id }}' -- required
;
```
</TabItem>
</Tabs>
