--- 
title: workspaces
hide_title: false
hide_table_of_contents: false
keywords:
  - workspaces
  - workspaces
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

Creates, updates, deletes, gets or lists a <code>workspaces</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="workspaces" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.workspaces.workspaces" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'get_by_code', value: 'get_by_code' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One Workspace row.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="slack_channel_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="adoption_history" /></td>
    <td><code>array</code></td>
    <td>List of AdoptionInfo objects</td>
</tr>
<tr>
    <td><CopyableCode code="adoption_level" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="api_token_rate_limit" /></td>
    <td><code>object</code></td>
    <td>ApiTokenRateLimit object</td>
</tr>
<tr>
    <td><CopyableCode code="avatar" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="customer" /></td>
    <td><code>object</code></td>
    <td>Customer object</td>
</tr>
<tr>
    <td><CopyableCode code="discord_role" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has2fa_enforcement" /></td>
    <td><code>boolean</code></td>
    <td>Whether 2FA enforcement is enabled for this workspace.</td>
</tr>
<tr>
    <td><CopyableCode code="has_automatic_diagnosis" /></td>
    <td><code>boolean</code></td>
    <td>Whether automatic deployment diagnosis is enabled for this workspace.</td>
</tr>
<tr>
    <td><CopyableCode code="has_guardrails_access" /></td>
    <td><code>boolean</code></td>
    <td>Whether this workspace has access to guardrails policies.</td>
</tr>
<tr>
    <td><CopyableCode code="has_hipaa_baa" /></td>
    <td><code>boolean</code></td>
    <td>Whether this workspace has a signed HIPAA Business Associate Agreement, from either the legacy hasBAA flag or the HIPAA_BAA spend commitment feature.</td>
</tr>
<tr>
    <td><CopyableCode code="has_saml" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="members" /></td>
    <td><code>array</code></td>
    <td>List of WorkspaceMember objects</td>
</tr>
<tr>
    <td><CopyableCode code="partner_profile" /></td>
    <td><code>object</code></td>
    <td>PartnerProfile object</td>
</tr>
<tr>
    <td><CopyableCode code="plan" /></td>
    <td><code>string</code></td>
    <td> (FREE, HOBBY, PRO)</td>
</tr>
<tr>
    <td><CopyableCode code="preferred_region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_count" /></td>
    <td><code>integer</code></td>
    <td>Total number of projects in this workspace. Used by the dashboard to show an exact count without paginating through every project.</td>
</tr>
<tr>
    <td><CopyableCode code="redacted_due_to2fa_pending" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current user's access is redacted due to pending 2FA requirement. Returns true if the user is a workspace member, workspace has 2FA enforcement enabled, and the current user needs to enable 2FA.</td>
</tr>
<tr>
    <td><CopyableCode code="referred_users" /></td>
    <td><code>array</code></td>
    <td>List of ReferralUser objects</td>
</tr>
<tr>
    <td><CopyableCode code="restrict_project_visibility_to_groups" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_plan_limit" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="users_without2fa" /></td>
    <td><code>array</code></td>
    <td>Get a list of user emails in the workspace who do not have verified 2FA enabled. Returns an empty array if all users have 2FA enabled.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="get_by_code">

One Workspace row.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="slack_channel_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="adoption_history" /></td>
    <td><code>array</code></td>
    <td>List of AdoptionInfo objects</td>
</tr>
<tr>
    <td><CopyableCode code="adoption_level" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="api_token_rate_limit" /></td>
    <td><code>object</code></td>
    <td>ApiTokenRateLimit object</td>
</tr>
<tr>
    <td><CopyableCode code="avatar" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="customer" /></td>
    <td><code>object</code></td>
    <td>Customer object</td>
</tr>
<tr>
    <td><CopyableCode code="discord_role" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has2fa_enforcement" /></td>
    <td><code>boolean</code></td>
    <td>Whether 2FA enforcement is enabled for this workspace.</td>
</tr>
<tr>
    <td><CopyableCode code="has_automatic_diagnosis" /></td>
    <td><code>boolean</code></td>
    <td>Whether automatic deployment diagnosis is enabled for this workspace.</td>
</tr>
<tr>
    <td><CopyableCode code="has_guardrails_access" /></td>
    <td><code>boolean</code></td>
    <td>Whether this workspace has access to guardrails policies.</td>
</tr>
<tr>
    <td><CopyableCode code="has_hipaa_baa" /></td>
    <td><code>boolean</code></td>
    <td>Whether this workspace has a signed HIPAA Business Associate Agreement, from either the legacy hasBAA flag or the HIPAA_BAA spend commitment feature.</td>
</tr>
<tr>
    <td><CopyableCode code="has_saml" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="members" /></td>
    <td><code>array</code></td>
    <td>List of WorkspaceMember objects</td>
</tr>
<tr>
    <td><CopyableCode code="partner_profile" /></td>
    <td><code>object</code></td>
    <td>PartnerProfile object</td>
</tr>
<tr>
    <td><CopyableCode code="plan" /></td>
    <td><code>string</code></td>
    <td> (FREE, HOBBY, PRO)</td>
</tr>
<tr>
    <td><CopyableCode code="preferred_region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_count" /></td>
    <td><code>integer</code></td>
    <td>Total number of projects in this workspace. Used by the dashboard to show an exact count without paginating through every project.</td>
</tr>
<tr>
    <td><CopyableCode code="redacted_due_to2fa_pending" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current user's access is redacted due to pending 2FA requirement. Returns true if the user is a workspace member, workspace has 2FA enforcement enabled, and the current user needs to enable 2FA.</td>
</tr>
<tr>
    <td><CopyableCode code="referred_users" /></td>
    <td><code>array</code></td>
    <td>List of ReferralUser objects</td>
</tr>
<tr>
    <td><CopyableCode code="restrict_project_visibility_to_groups" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_plan_limit" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="users_without2fa" /></td>
    <td><code>array</code></td>
    <td>Get a list of user emails in the workspace who do not have verified 2FA enabled. Returns an empty array if all users have 2FA enabled.</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Workspace.

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
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="slack_channel_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="adoption_history" /></td>
    <td><code>array</code></td>
    <td>List of AdoptionInfo objects</td>
</tr>
<tr>
    <td><CopyableCode code="adoption_level" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="api_token_rate_limit" /></td>
    <td><code>object</code></td>
    <td>ApiTokenRateLimit object</td>
</tr>
<tr>
    <td><CopyableCode code="avatar" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="customer" /></td>
    <td><code>object</code></td>
    <td>Customer object</td>
</tr>
<tr>
    <td><CopyableCode code="discord_role" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has2fa_enforcement" /></td>
    <td><code>boolean</code></td>
    <td>Whether 2FA enforcement is enabled for this workspace.</td>
</tr>
<tr>
    <td><CopyableCode code="has_automatic_diagnosis" /></td>
    <td><code>boolean</code></td>
    <td>Whether automatic deployment diagnosis is enabled for this workspace.</td>
</tr>
<tr>
    <td><CopyableCode code="has_guardrails_access" /></td>
    <td><code>boolean</code></td>
    <td>Whether this workspace has access to guardrails policies.</td>
</tr>
<tr>
    <td><CopyableCode code="has_hipaa_baa" /></td>
    <td><code>boolean</code></td>
    <td>Whether this workspace has a signed HIPAA Business Associate Agreement, from either the legacy hasBAA flag or the HIPAA_BAA spend commitment feature.</td>
</tr>
<tr>
    <td><CopyableCode code="has_saml" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="members" /></td>
    <td><code>array</code></td>
    <td>List of WorkspaceMember objects</td>
</tr>
<tr>
    <td><CopyableCode code="partner_profile" /></td>
    <td><code>object</code></td>
    <td>PartnerProfile object</td>
</tr>
<tr>
    <td><CopyableCode code="plan" /></td>
    <td><code>string</code></td>
    <td> (FREE, HOBBY, PRO)</td>
</tr>
<tr>
    <td><CopyableCode code="preferred_region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_count" /></td>
    <td><code>integer</code></td>
    <td>Total number of projects in this workspace. Used by the dashboard to show an exact count without paginating through every project.</td>
</tr>
<tr>
    <td><CopyableCode code="redacted_due_to2fa_pending" /></td>
    <td><code>boolean</code></td>
    <td>Whether the current user's access is redacted due to pending 2FA requirement. Returns true if the user is a workspace member, workspace has 2FA enforcement enabled, and the current user needs to enable 2FA.</td>
</tr>
<tr>
    <td><CopyableCode code="referred_users" /></td>
    <td><code>array</code></td>
    <td>List of ReferralUser objects</td>
</tr>
<tr>
    <td><CopyableCode code="restrict_project_visibility_to_groups" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="subscription_plan_limit" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="users_without2fa" /></td>
    <td><code>array</code></td>
    <td>Get a list of user emails in the workspace who do not have verified 2FA enabled. Returns an empty array if all users have 2FA enabled.</td>
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
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Get the workspace. Backed by the Railway GraphQL query workspace.</td>
</tr>
<tr>
    <td><a href="#get_by_code"><CopyableCode code="get_by_code" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-code"><code>code</code></a></td>
    <td></td>
    <td>Find a workspace by invite code. Backed by the Railway GraphQL query workspaceByCode.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>Workspaces user is member of. Backed by the Railway GraphQL query me.workspaces.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Update a workspace by id. Backed by the Railway GraphQL mutation workspaceUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete a workspace and all data associated with it. Backed by the Railway GraphQL mutation workspaceDelete.</td>
</tr>
<tr>
    <td><a href="#create_invite_code"><CopyableCode code="create_invite_code" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-role"><code>role</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Get an invite code for a workspace and role. Backed by the Railway GraphQL mutation workspaceInviteCodeCreate.</td>
</tr>
<tr>
    <td><a href="#leave"><CopyableCode code="leave" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Leave a workspace. Backed by the Railway GraphQL mutation workspaceLeave.</td>
</tr>
<tr>
    <td><a href="#set_restrict_project_visibility_to_groups"><CopyableCode code="set_restrict_project_visibility_to_groups" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-enabled"><code>enabled</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Control whether non-admin project visibility is restricted to access groups and direct project permissions. Backed by the Railway GraphQL mutation workspaceSetRestrictProjectVisibilityToGroups.</td>
</tr>
<tr>
    <td><a href="#update_two_factor_enforcement"><CopyableCode code="update_two_factor_enforcement" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-enabled"><code>enabled</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Enable or disable 2FA enforcement for a workspace. Backed by the Railway GraphQL mutation workspaceTwoFactorEnforcementUpdate.</td>
</tr>
<tr>
    <td><a href="#upsert_slack_channel"><CopyableCode code="upsert_slack_channel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Generate a Slack channel for a workspace. Backed by the Railway GraphQL mutation workspaceUpsertSlackChannel.</td>
</tr>
<tr>
    <td><a href="#upsert_slack_channel_for_workspace"><CopyableCode code="upsert_slack_channel_for_workspace" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Generate a Slack channel for a workspace. Backed by the Railway GraphQL mutation upsertSlackChannel.</td>
</tr>
<tr>
    <td><a href="#use_invite_code"><CopyableCode code="use_invite_code" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-code"><code>code</code></a></td>
    <td></td>
    <td>Use an invite code to join a workspace. Backed by the Railway GraphQL mutation workspaceInviteCodeUse.</td>
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
<tr id="parameter-code">
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-enabled">
    <td><CopyableCode code="enabled" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-role">
    <td><CopyableCode code="role" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'get_by_code', value: 'get_by_code' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get the workspace. Backed by the Railway GraphQL query workspace.

```sql
SELECT
id,
name,
slack_channel_id,
adoption_history,
adoption_level,
api_token_rate_limit,
avatar,
created_at,
customer,
discord_role,
has2fa_enforcement,
has_automatic_diagnosis,
has_guardrails_access,
has_hipaa_baa,
has_saml,
members,
partner_profile,
plan,
preferred_region,
project_count,
redacted_due_to2fa_pending,
referred_users,
restrict_project_visibility_to_groups,
subscription_plan_limit,
updated_at,
users_without2fa
FROM railway.workspaces.workspaces
WHERE workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
<TabItem value="get_by_code">

Find a workspace by invite code. Backed by the Railway GraphQL query workspaceByCode.

```sql
SELECT
id,
name,
slack_channel_id,
adoption_history,
adoption_level,
api_token_rate_limit,
avatar,
created_at,
customer,
discord_role,
has2fa_enforcement,
has_automatic_diagnosis,
has_guardrails_access,
has_hipaa_baa,
has_saml,
members,
partner_profile,
plan,
preferred_region,
project_count,
redacted_due_to2fa_pending,
referred_users,
restrict_project_visibility_to_groups,
subscription_plan_limit,
updated_at,
users_without2fa
FROM railway.workspaces.workspaces
WHERE code = '{{ code }}' -- required
;
```
</TabItem>
<TabItem value="list">

Workspaces user is member of. Backed by the Railway GraphQL query me.workspaces.

```sql
SELECT
id,
name,
slack_channel_id,
adoption_history,
adoption_level,
api_token_rate_limit,
avatar,
created_at,
customer,
discord_role,
has2fa_enforcement,
has_automatic_diagnosis,
has_guardrails_access,
has_hipaa_baa,
has_saml,
members,
partner_profile,
plan,
preferred_region,
project_count,
redacted_due_to2fa_pending,
referred_users,
restrict_project_visibility_to_groups,
subscription_plan_limit,
updated_at,
users_without2fa
FROM railway.workspaces.workspaces
;
```
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

Update a workspace by id. Backed by the Railway GraphQL mutation workspaceUpdate.

```sql
UPDATE railway.workspaces.workspaces
SET 
avatar = '{{ avatar }}',
name = '{{ name }}',
preferred_region = '{{ preferred_region }}'
WHERE 
id = '{{ id }}' --required
RETURNING
result;
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

Delete a workspace and all data associated with it. Backed by the Railway GraphQL mutation workspaceDelete.

```sql
DELETE FROM railway.workspaces.workspaces
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="create_invite_code"
    values={[
        { label: 'create_invite_code', value: 'create_invite_code' },
        { label: 'leave', value: 'leave' },
        { label: 'set_restrict_project_visibility_to_groups', value: 'set_restrict_project_visibility_to_groups' },
        { label: 'update_two_factor_enforcement', value: 'update_two_factor_enforcement' },
        { label: 'upsert_slack_channel', value: 'upsert_slack_channel' },
        { label: 'upsert_slack_channel_for_workspace', value: 'upsert_slack_channel_for_workspace' },
        { label: 'use_invite_code', value: 'use_invite_code' }
    ]}
>
<TabItem value="create_invite_code">

Get an invite code for a workspace and role. Backed by the Railway GraphQL mutation workspaceInviteCodeCreate.

```sql
EXEC railway.workspaces.workspaces.create_invite_code 
@role='{{ role }}', --required
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
<TabItem value="leave">

Leave a workspace. Backed by the Railway GraphQL mutation workspaceLeave.

```sql
EXEC railway.workspaces.workspaces.leave 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="set_restrict_project_visibility_to_groups">

Control whether non-admin project visibility is restricted to access groups and direct project permissions. Backed by the Railway GraphQL mutation workspaceSetRestrictProjectVisibilityToGroups.

```sql
EXEC railway.workspaces.workspaces.set_restrict_project_visibility_to_groups 
@enabled='{{ enabled }}', --required
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
<TabItem value="update_two_factor_enforcement">

Enable or disable 2FA enforcement for a workspace. Backed by the Railway GraphQL mutation workspaceTwoFactorEnforcementUpdate.

```sql
EXEC railway.workspaces.workspaces.update_two_factor_enforcement 
@enabled='{{ enabled }}', --required
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
<TabItem value="upsert_slack_channel">

Generate a Slack channel for a workspace. Backed by the Railway GraphQL mutation workspaceUpsertSlackChannel.

```sql
EXEC railway.workspaces.workspaces.upsert_slack_channel 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="upsert_slack_channel_for_workspace">

Generate a Slack channel for a workspace. Backed by the Railway GraphQL mutation upsertSlackChannel.

```sql
EXEC railway.workspaces.workspaces.upsert_slack_channel_for_workspace 
@workspace_id='{{ workspace_id }}' --required
;
```
</TabItem>
<TabItem value="use_invite_code">

Use an invite code to join a workspace. Backed by the Railway GraphQL mutation workspaceInviteCodeUse.

```sql
EXEC railway.workspaces.workspaces.use_invite_code 
@code='{{ code }}' --required
;
```
</TabItem>
</Tabs>
