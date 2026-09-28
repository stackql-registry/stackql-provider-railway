--- 
title: project_invitations
hide_title: false
hide_table_of_contents: false
keywords:
  - project_invitations
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

Creates, updates, deletes, gets or lists a <code>project_invitations</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="project_invitations" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.projects.project_invitations" /></td></tr>
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

One row per ProjectInvitation.

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
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="expires_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="inviter" /></td>
    <td><code>object</code></td>
    <td>ProjectInvitationInviter object</td>
</tr>
<tr>
    <td><CopyableCode code="is_expired" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>PublicProjectInformation object</td>
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
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Get invitations for a project. Backed by the Railway GraphQL query projectInvitations.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-email"><code>email</code></a>, <a href="#parameter-role"><code>role</code></a></td>
    <td></td>
    <td>Create an invitation for a project. Backed by the Railway GraphQL mutation projectInvitationCreate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete an invitation for a project. Backed by the Railway GraphQL mutation projectInvitationDelete.</td>
</tr>
<tr>
    <td><a href="#accept"><CopyableCode code="accept" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-code"><code>code</code></a></td>
    <td></td>
    <td>Accept a project invitation using the invite code. Backed by the Railway GraphQL mutation projectInvitationAccept.</td>
</tr>
<tr>
    <td><a href="#resend"><CopyableCode code="resend" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Resend an invitation for a project. Backed by the Railway GraphQL mutation projectInvitationResend.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-code">
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-email">
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-role">
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td>(ADMIN, MEMBER, VIEWER)</td>
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

Get invitations for a project. Backed by the Railway GraphQL query projectInvitations.

```sql
SELECT
id,
email,
expires_at,
inviter,
is_expired,
project
FROM railway.projects.project_invitations
WHERE id = '{{ id }}' -- required
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

Create an invitation for a project. Backed by the Railway GraphQL mutation projectInvitationCreate.

```sql
INSERT INTO railway.projects.project_invitations (
id,
email,
role
)
SELECT 
'{{ id }}' /* required */,
'{{ email }}' /* required */,
'{{ role }}' /* required */
RETURNING
id,
email,
expires_at,
inviter,
is_expired,
project
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: project_invitations
  props:
    - name: id
      value: "{{ id }}"
    - name: email
      value: "{{ email }}"
    - name: role
      value: "{{ role }}"
      valid_values: ['ADMIN', 'MEMBER', 'VIEWER']
`}</CodeBlock>

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

Delete an invitation for a project. Backed by the Railway GraphQL mutation projectInvitationDelete.

```sql
DELETE FROM railway.projects.project_invitations
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="accept"
    values={[
        { label: 'accept', value: 'accept' },
        { label: 'resend', value: 'resend' }
    ]}
>
<TabItem value="accept">

Accept a project invitation using the invite code. Backed by the Railway GraphQL mutation projectInvitationAccept.

```sql
EXEC railway.projects.project_invitations.accept 
@code='{{ code }}' --required
;
```
</TabItem>
<TabItem value="resend">

Resend an invitation for a project. Backed by the Railway GraphQL mutation projectInvitationResend.

```sql
EXEC railway.projects.project_invitations.resend 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
