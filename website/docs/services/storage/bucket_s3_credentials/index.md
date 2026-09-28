--- 
title: bucket_s3_credentials
hide_title: false
hide_table_of_contents: false
keywords:
  - bucket_s3_credentials
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

Creates, updates, deletes, gets or lists a <code>bucket_s3_credentials</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="bucket_s3_credentials" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.storage.bucket_s3_credentials" /></td></tr>
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

One row per BucketS3CompatibleCredentials.

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
    <td><CopyableCode code="access_key_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="bucket_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="endpoint" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="secret_access_key" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="url_style" /></td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-bucket_id"><code>bucket_id</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Get the S3-compatible credentials for a bucket. Backed by the Railway GraphQL query bucketS3Credentials.</td>
</tr>
<tr>
    <td><a href="#reset"><CopyableCode code="reset" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-bucket_id"><code>bucket_id</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-redeploy_dependents"><code>redeploy_dependents</code></a></td>
    <td>Reset the credentials for a bucket in an environment. Backed by the Railway GraphQL mutation bucketCredentialsReset.</td>
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
<tr id="parameter-bucket_id">
    <td><CopyableCode code="bucket_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-redeploy_dependents">
    <td><CopyableCode code="redeploy_dependents" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
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

Get the S3-compatible credentials for a bucket. Backed by the Railway GraphQL query bucketS3Credentials.

```sql
SELECT
access_key_id,
bucket_name,
created_at,
endpoint,
region,
secret_access_key,
url_style
FROM railway.storage.bucket_s3_credentials
WHERE bucket_id = '{{ bucket_id }}' -- required
AND environment_id = '{{ environment_id }}' -- required
AND project_id = '{{ project_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="reset"
    values={[
        { label: 'reset', value: 'reset' }
    ]}
>
<TabItem value="reset">

Reset the credentials for a bucket in an environment. Backed by the Railway GraphQL mutation bucketCredentialsReset.

```sql
EXEC railway.storage.bucket_s3_credentials.reset 
@bucket_id='{{ bucket_id }}', --required
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@redeploy_dependents='{{ redeploy_dependents }}'
;
```
</TabItem>
</Tabs>
