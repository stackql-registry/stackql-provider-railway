--- 
title: railway_domain_dns_records
hide_title: false
hide_table_of_contents: false
keywords:
  - railway_domain_dns_records
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

Creates, updates, deletes, gets or lists a <code>railway_domain_dns_records</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="railway_domain_dns_records" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.networking.railway_domain_dns_records" /></td></tr>
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

One row per RailwayDomainDnsRecord.

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
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="answer" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="fqdn" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="host" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="priority" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ttl" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (A, AAAA, ANAME, CNAME, MX, NS, SRV, TXT)</td>
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
    <td>List DNS records for a Railway domain. Backed by the Railway GraphQL query railwayDomainDnsRecords.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-answer"><code>answer</code></a>, <a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-host"><code>host</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Create a DNS record for a Railway domain. Backed by the Railway GraphQL mutation railwayDomainDnsRecordCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-answer"><code>answer</code></a>, <a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-host"><code>host</code></a>, <a href="#parameter-record_id"><code>record_id</code></a>, <a href="#parameter-type"><code>type</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Update a DNS record for a Railway domain. Backed by the Railway GraphQL mutation railwayDomainDnsRecordUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-domain"><code>domain</code></a>, <a href="#parameter-record_id"><code>record_id</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-remove_email_forwarding"><code>remove_email_forwarding</code></a></td>
    <td>Delete a DNS record for a Railway domain. Backed by the Railway GraphQL mutation railwayDomainDnsRecordDelete.</td>
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
<tr id="parameter-answer">
    <td><CopyableCode code="answer" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-host">
    <td><CopyableCode code="host" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-record_id">
    <td><CopyableCode code="record_id" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr id="parameter-remove_email_forwarding">
    <td><CopyableCode code="remove_email_forwarding" /></td>
    <td><code>boolean</code></td>
    <td>Confirms that deleting a mail exchange may also remove every forwarding address and its sibling exchanges.</td>
</tr>
<tr id="parameter-type">
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>(A, AAAA, ANAME, CNAME, MX, NS, SRV, TXT)</td>
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

List DNS records for a Railway domain. Backed by the Railway GraphQL query railwayDomainDnsRecords.

```sql
SELECT
id,
domain_name,
answer,
fqdn,
host,
priority,
ttl,
type
FROM railway.networking.railway_domain_dns_records
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

Create a DNS record for a Railway domain. Backed by the Railway GraphQL mutation railwayDomainDnsRecordCreate.

```sql
INSERT INTO railway.networking.railway_domain_dns_records (
answer,
domain,
host,
priority,
ttl,
type,
workspace_id
)
SELECT 
'{{ answer }}' /* required */,
'{{ domain }}' /* required */,
'{{ host }}' /* required */,
{{ priority }},
{{ ttl }},
'{{ type }}' /* required */,
'{{ workspace_id }}' /* required */
RETURNING
id,
domain_name,
answer,
fqdn,
host,
priority,
ttl,
type
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: railway_domain_dns_records
  props:
    - name: answer
      value: "{{ answer }}"
    - name: domain
      value: "{{ domain }}"
    - name: host
      value: "{{ host }}"
    - name: priority
      value: {{ priority }}
    - name: ttl
      value: {{ ttl }}
    - name: type
      value: "{{ type }}"
      valid_values: ['A', 'AAAA', 'ANAME', 'CNAME', 'MX', 'NS', 'SRV', 'TXT']
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

Update a DNS record for a Railway domain. Backed by the Railway GraphQL mutation railwayDomainDnsRecordUpdate.

```sql
UPDATE railway.networking.railway_domain_dns_records
SET 
priority = '{{ priority }}',
ttl = '{{ ttl }}'
WHERE 
answer = '{{ answer }}' --required
AND domain = '{{ domain }}' --required
AND host = '{{ host }}' --required
AND record_id = '{{ record_id }}' --required
AND type = '{{ type }}' --required
AND workspace_id = '{{ workspace_id }}' --required
RETURNING
id,
domain_name,
answer,
fqdn,
host,
priority,
ttl,
type;
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

Delete a DNS record for a Railway domain. Backed by the Railway GraphQL mutation railwayDomainDnsRecordDelete.

```sql
DELETE FROM railway.networking.railway_domain_dns_records
WHERE 
domain = '{{ domain }}' --required
AND record_id = '{{ record_id }}' --required
AND workspace_id = '{{ workspace_id }}' --required
AND remove_email_forwarding = '{{ remove_email_forwarding }}'
;
```
</TabItem>
</Tabs>
