--- 
title: current_user
hide_title: false
hide_table_of_contents: false
keywords:
  - current_user
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

Creates, updates, deletes, gets or lists a <code>current_user</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="current_user" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.account.current_user" /></td></tr>
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

One User row.

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
    <td><CopyableCode code="github_provider_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="agreed_fair_use" /></td>
    <td><code>boolean</code></td>
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
    <td><CopyableCode code="email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="github_username" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has2fa" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has_passkeys" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_admin" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_conductor" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_verified" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="last_login" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="profile" /></td>
    <td><code>object</code></td>
    <td>UserProfile object</td>
</tr>
<tr>
    <td><CopyableCode code="registration_status" /></td>
    <td><code>string</code></td>
    <td> (ONBOARDED, REGISTERED, WAITLISTED)</td>
</tr>
<tr>
    <td><CopyableCode code="risk_level" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="terms_agreed_on" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="username" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="workspaces" /></td>
    <td><code>array</code></td>
    <td>Workspaces user is member of</td>
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
    <td></td>
    <td>Gets the authenticated user. Backed by the Railway GraphQL query me.</td>
</tr>
<tr>
    <td><a href="#add_feature_flag"><CopyableCode code="add_feature_flag" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flag"><code>flag</code></a></td>
    <td></td>
    <td>Add a feature flag for a user. Backed by the Railway GraphQL mutation featureFlagAdd.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td></td>
    <td></td>
    <td>Delete the currently authenticated user. Backed by the Railway GraphQL mutation userDelete.</td>
</tr>
<tr>
    <td><a href="#disconnect_discord"><CopyableCode code="disconnect_discord" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td></td>
    <td></td>
    <td>Disconnect your Railway account from Discord. Backed by the Railway GraphQL mutation userDiscordDisconnect.</td>
</tr>
<tr>
    <td><a href="#leave_beta"><CopyableCode code="leave_beta" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td></td>
    <td></td>
    <td>Unsubscribe from the Beta program. Backed by the Railway GraphQL mutation userBetaLeave.</td>
</tr>
<tr>
    <td><a href="#remove_feature_flag"><CopyableCode code="remove_feature_flag" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flag"><code>flag</code></a></td>
    <td></td>
    <td>Remove a feature flag for a user. Backed by the Railway GraphQL mutation featureFlagRemove.</td>
</tr>
<tr>
    <td><a href="#remove_flags"><CopyableCode code="remove_flags" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flags"><code>flags</code></a></td>
    <td><a href="#parameter-user_id"><code>user_id</code></a></td>
    <td>Remove a flag on the user. Backed by the Railway GraphQL mutation userFlagsRemove.</td>
</tr>
<tr>
    <td><a href="#set_flags"><CopyableCode code="set_flags" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flags"><code>flags</code></a></td>
    <td><a href="#parameter-user_id"><code>user_id</code></a></td>
    <td>Set flags on the authenticated user. Backed by the Railway GraphQL mutation userFlagsSet.</td>
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
<tr id="parameter-flag">
    <td><CopyableCode code="flag" /></td>
    <td><code>string</code></td>
    <td>(ACTIVITY_FEED_HISTORY, AGENT_BOOTSTRAPS, AGENT_BYOK, AGENT_BYOK_ANTHROPIC, AGENT_BYOK_CHATGPT, AGENT_BYOK_FIREWORKS, AGENT_BYOK_OPENAI, AGENT_BYOK_OPENROUTER, AGENT_CONNECTORS, AGENT_TASKS, BOT_CLOUD_AGENTS, CHAT_SANDBOX, CLOUD_AGENTS, CLOUD_AGENT_BUILDER, CLOUD_AGENT_CHAT, CS_MCP_EXPRESS, EMAIL_FORWARDING, HA_FOR_MONGO, IN_DASHBOARD_SUPPORT, MAGIC_CONFIG, MYSQL_PITR, PRIORITY_BOARDING, RAILWAY_AGENT_DASHBOARD, RAILWAY_AGENT_FEED, TRACING, USAGE_INSIGHTS, VM_STORAGE_TRACES)</td>
</tr>
<tr id="parameter-flags">
    <td><CopyableCode code="flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-user_id">
    <td><CopyableCode code="user_id" /></td>
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

Gets the authenticated user. Backed by the Railway GraphQL query me.

```sql
SELECT
id,
name,
github_provider_id,
agreed_fair_use,
api_token_rate_limit,
avatar,
created_at,
email,
feature_flags,
flags,
github_username,
has2fa,
has_passkeys,
is_admin,
is_conductor,
is_verified,
last_login,
profile,
registration_status,
risk_level,
terms_agreed_on,
username,
workspaces
FROM railway.account.current_user
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="add_feature_flag"
    values={[
        { label: 'add_feature_flag', value: 'add_feature_flag' },
        { label: 'delete', value: 'delete' },
        { label: 'disconnect_discord', value: 'disconnect_discord' },
        { label: 'leave_beta', value: 'leave_beta' },
        { label: 'remove_feature_flag', value: 'remove_feature_flag' },
        { label: 'remove_flags', value: 'remove_flags' },
        { label: 'set_flags', value: 'set_flags' }
    ]}
>
<TabItem value="add_feature_flag">

Add a feature flag for a user. Backed by the Railway GraphQL mutation featureFlagAdd.

```sql
EXEC railway.account.current_user.add_feature_flag 
@flag='{{ flag }}' --required
;
```
</TabItem>
<TabItem value="delete">

Delete the currently authenticated user. Backed by the Railway GraphQL mutation userDelete.

```sql
EXEC railway.account.current_user.delete
;
```
</TabItem>
<TabItem value="disconnect_discord">

Disconnect your Railway account from Discord. Backed by the Railway GraphQL mutation userDiscordDisconnect.

```sql
EXEC railway.account.current_user.disconnect_discord
;
```
</TabItem>
<TabItem value="leave_beta">

Unsubscribe from the Beta program. Backed by the Railway GraphQL mutation userBetaLeave.

```sql
EXEC railway.account.current_user.leave_beta
;
```
</TabItem>
<TabItem value="remove_feature_flag">

Remove a feature flag for a user. Backed by the Railway GraphQL mutation featureFlagRemove.

```sql
EXEC railway.account.current_user.remove_feature_flag 
@flag='{{ flag }}' --required
;
```
</TabItem>
<TabItem value="remove_flags">

Remove a flag on the user. Backed by the Railway GraphQL mutation userFlagsRemove.

```sql
EXEC railway.account.current_user.remove_flags 
@flags='{{ flags }}', --required
@user_id='{{ user_id }}'
;
```
</TabItem>
<TabItem value="set_flags">

Set flags on the authenticated user. Backed by the Railway GraphQL mutation userFlagsSet.

```sql
EXEC railway.account.current_user.set_flags 
@flags='{{ flags }}', --required
@user_id='{{ user_id }}'
;
```
</TabItem>
</Tabs>
