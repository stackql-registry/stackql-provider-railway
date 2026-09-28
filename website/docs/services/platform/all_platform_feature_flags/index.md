--- 
title: all_platform_feature_flags
hide_title: false
hide_table_of_contents: false
keywords:
  - all_platform_feature_flags
  - platform
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

Creates, updates, deletes, gets or lists an <code>all_platform_feature_flags</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="all_platform_feature_flags" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.platform.all_platform_feature_flags" /></td></tr>
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

One row per PlatformFeatureFlagStatus.

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
    <td><CopyableCode code="flag" /></td>
    <td><code>string</code></td>
    <td> (AGENT_USAGE_CH_INGEST, ALERT_SUS_USERS_CRON_KILLSWITCH, BUILDER_V4_ROLLOUT, BUILD_DEPLOY_QUEUE_V2, CAC_T0_KILLSWITCH, CANVAS_CROSS_ENV_GUARD_ENFORCE, CHAT_SANDBOX, CLICKHOUSE_WORKSPACE_LIMIT_ENFORCE, CS_MCP, CS_MCP_EXPRESS, CTRD_IMAGE_STORE_ROLLOUT, DEFAULT_USAGE_ALERTS, DEMO_PERCENTAGE_ROLLOUT, DEPLOYMENT_DIAGNOSIS_KILLSWITCH, DEPLOY_SUPERSEDE_ON_PUSH, DEV_STUDIO, DEV_STUDIO_ANON_PROVISIONS, DOMAIN_RECONCILE_KILLSWITCH, EMAIL_FORWARDING_KILLSWITCH, IN_DASHBOARD_SUPPORT, KAFKA_EPHEMERAL_ENVIRONMENT_UPDATES, LOGS_LONG_WINDOW_CHUNKING, NEW_PROJECT_PAGE, NEW_STRIPE_WEBHOOK_VERSION_ROLLOUT, NUDGES, NUDGE_BACKUP_SCHEDULE_MISSING, NUDGE_FIRST_DEPLOY_FAILED, NUDGE_PUBLIC_DB_URL_WITHIN_PROJECT, NUDGE_RESUBSCRIBE_AFTER_DEAD_INVOICE, NUDGE_UPGRADE_TO_PRO, OAUTH_DCR_KILLSWITCH, PRE_DEPLOY_TIMEOUT_KILLSWITCH, PROJECT_HISTORY_DUAL_WRITE, REMOVE_DEPLOYMENT_COMPACT, SERVICEINSTANCE_DATALOADER_FOR_STATIC_URL, SPLIT_USAGE_QUERIES, SSH_ANON_PROVISIONING, SSH_TRIAL_GUEST_IDLE_SLEEP, STRIPE_INTERACTIVE_SUBSCRIPTION_ON_SESSION, STRIPE_METERS_NEW_ACCOUNTS, STRIPE_METERS_SHADOW_ENABLED, STRIPE_WEBHOOK_DISPUTE_CANCELLATION, UPDATED_VM_QUERIES, USAGE_CH_READS, VM_COUPON_MIGRATION, VM_USAGE_CH_INGEST, WORKSPACE_MCP_KILLSWITCH)</td>
</tr>
<tr>
    <td><CopyableCode code="rollout_percentage" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (BOOLEAN, PERCENTAGE)</td>
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
    <td></td>
    <td></td>
    <td>Returns the platform feature flags enabled for the current user. Backed by the Railway GraphQL query allPlatformFeatureFlags.</td>
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

Returns the platform feature flags enabled for the current user. Backed by the Railway GraphQL query allPlatformFeatureFlags.

```sql
SELECT
flag,
rollout_percentage,
status,
type
FROM railway.platform.all_platform_feature_flags
;
```
</TabItem>
</Tabs>
