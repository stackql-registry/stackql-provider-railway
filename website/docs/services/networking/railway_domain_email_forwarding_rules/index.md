--- 
title: railway_domain_email_forwarding_rules
hide_title: false
hide_table_of_contents: false
keywords:
  - railway_domain_email_forwarding_rules
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

Creates, updates, deletes, gets or lists a <code>railway_domain_email_forwarding_rules</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="railway_domain_email_forwarding_rules" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.networking.railway_domain_email_forwarding_rules" /></td></tr>
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

One row per RailwayDomainEmailForwardingRule.

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
    <td><CopyableCode code="alias" /></td>
    <td><code>string</code></td>
    <td>Local part of the forwarded address, without the domain.</td>
</tr>
<tr>
    <td><CopyableCode code="destination" /></td>
    <td><code>string</code></td>
    <td>The external inbox mail for this alias is delivered to.</td>
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
    <td><a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>List email forwarding rules for a Railway domain. Backed by the Railway GraphQL query railwayDomainEmailForwardingRules.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-alias"><code>alias</code></a>, <a href="#parameter-destination"><code>destination</code></a>, <a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Forward an address on this domain to an external inbox. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-alias"><code>alias</code></a>, <a href="#parameter-destination"><code>destination</code></a>, <a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Change where a forwarded address delivers. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-alias"><code>alias</code></a>, <a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Stop forwarding an address on this domain. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleDelete.</td>
</tr>
<tr>
    <td><a href="#remove_all"><CopyableCode code="remove_all" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Stop forwarding every address on this domain, and remove the mail records that delivered them. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRemoveAll.</td>
</tr>
<tr>
    <td><a href="#send_test"><CopyableCode code="send_test" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-alias"><code>alias</code></a>, <a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Send a message to a forwarded address so the customer can confirm it delivers. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleSendTest.</td>
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
<tr id="parameter-alias">
    <td><CopyableCode code="alias" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-destination">
    <td><CopyableCode code="destination" /></td>
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

List email forwarding rules for a Railway domain. Backed by the Railway GraphQL query railwayDomainEmailForwardingRules.

```sql
SELECT
alias,
destination
FROM railway.networking.railway_domain_email_forwarding_rules
WHERE domain = '{{ domain }}' -- required
AND workspace_id = '{{ workspace_id }}' -- required
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

Forward an address on this domain to an external inbox. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleCreate.

```sql
INSERT INTO railway.networking.railway_domain_email_forwarding_rules (
alias,
destination,
domain,
workspace_id
)
SELECT 
'{{ alias }}' /* required */,
'{{ destination }}' /* required */,
'{{ domain }}' /* required */,
'{{ workspace_id }}' /* required */
RETURNING
alias,
destination
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: railway_domain_email_forwarding_rules
  props:
    - name: alias
      value: "{{ alias }}"
    - name: destination
      value: "{{ destination }}"
    - name: domain
      value: "{{ domain }}"
    - name: workspace_id
      value: "{{ workspace_id }}"
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

Change where a forwarded address delivers. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleUpdate.

```sql
UPDATE railway.networking.railway_domain_email_forwarding_rules
SET 

WHERE 
alias = '{{ alias }}' --required
AND destination = '{{ destination }}' --required
AND domain = '{{ domain }}' --required
AND workspace_id = '{{ workspace_id }}' --required
RETURNING
alias,
destination;
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

Stop forwarding an address on this domain. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleDelete.

```sql
DELETE FROM railway.networking.railway_domain_email_forwarding_rules
WHERE 
alias = '{{ alias }}' --required
AND domain = '{{ domain }}' --required
AND workspace_id = '{{ workspace_id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="remove_all"
    values={[
        { label: 'remove_all', value: 'remove_all' },
        { label: 'send_test', value: 'send_test' }
    ]}
>
<TabItem value="remove_all">

Stop forwarding every address on this domain, and remove the mail records that delivered them. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRemoveAll.

```sql
EXEC railway.networking.railway_domain_email_forwarding_rules.remove_all 
@domain='{{ domain }}', --required
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
<TabItem value="send_test">

Send a message to a forwarded address so the customer can confirm it delivers. Backed by the Railway GraphQL mutation railwayDomainEmailForwardingRuleSendTest.

```sql
EXEC railway.networking.railway_domain_email_forwarding_rules.send_test 
@alias='{{ alias }}', --required
@domain='{{ domain }}', --required
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
</Tabs>
