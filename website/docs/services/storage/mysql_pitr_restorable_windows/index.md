--- 
title: mysql_pitr_restorable_windows
hide_title: false
hide_table_of_contents: false
keywords:
  - mysql_pitr_restorable_windows
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

Creates, updates, deletes, gets or lists a <code>mysql_pitr_restorable_windows</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="mysql_pitr_restorable_windows" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.mysql_pitr_restorable_windows" /></td></tr>
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

One MysqlPitrRestorableWindow row.

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
    <td><CopyableCode code="archive_configured" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ceiling_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fetched_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="floor_at" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="full_backup_count" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="full_backups_taken_at" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="lineage_count" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="listing_truncated" /></td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>The point-in-time window a MySQL service's binlog archive can restore to, resolved from the archive bucket: the oldest full backup (floor), the newest shipped binlog (ceiling) and every full backup's timestamp. archiveConfigured is false when the service carries no complete BINLOG_ARCHIVE_* contract. Backed by the Railway GraphQL query mysqlPitrRestorableWindow.</td>
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

The point-in-time window a MySQL service's binlog archive can restore to, resolved from the archive bucket: the oldest full backup (floor), the newest shipped binlog (ceiling) and every full backup's timestamp. archiveConfigured is false when the service carries no complete BINLOG_ARCHIVE_* contract. Backed by the Railway GraphQL query mysqlPitrRestorableWindow.

```sql
SELECT
archive_configured,
ceiling_at,
fetched_at,
floor_at,
full_backup_count,
full_backups_taken_at,
lineage_count,
listing_truncated
FROM railway.storage.mysql_pitr_restorable_windows
WHERE environment_id = '{{ environment_id }}' -- required
AND service_id = '{{ service_id }}' -- required
;
```
</TabItem>
</Tabs>
