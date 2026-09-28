--- 
title: railway_domain_email_forwarding_eligibility
hide_title: false
hide_table_of_contents: false
keywords:
  - railway_domain_email_forwarding_eligibility
  - networking
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

Creates, updates, deletes, gets or lists a <code>railway_domain_email_forwarding_eligibility</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="railway_domain_email_forwarding_eligibility" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.networking.railway_domain_email_forwarding_eligibility" /></td></tr>
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

One row carrying the value as the result column.

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
    <td><CopyableCode code="result" /></td>
    <td><code>string</code></td>
    <td>railwayDomainEmailForwardingEligibility value (DELEGATED, ELIGIBLE, EXTERNAL_MAIL, UNKNOWN)</td>
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
    <td><a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Whether email forwarding can be offered on this domain, or why it can't. Backed by the Railway GraphQL query railwayDomainEmailForwardingEligibility.</td>
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
<tr id="parameter-domain">
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
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

Whether email forwarding can be offered on this domain, or why it can't. Backed by the Railway GraphQL query railwayDomainEmailForwardingEligibility.

```sql
SELECT
result
FROM railway.networking.railway_domain_email_forwarding_eligibility
WHERE domain = '{{ domain }}' -- required
AND workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
</Tabs>
