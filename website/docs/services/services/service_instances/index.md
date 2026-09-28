--- 
title: service_instances
hide_title: false
hide_table_of_contents: false
keywords:
  - service_instances
  - services
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

Creates, updates, deletes, gets or lists a <code>service_instances</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="service_instances" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.services.service_instances" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One ServiceInstance row.

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
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="active_deployments" /></td>
    <td><code>array</code></td>
    <td>All currently active (deployed and running) deployments for this service instance</td>
</tr>
<tr>
    <td><CopyableCode code="build_command" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="builder" /></td>
    <td><code>string</code></td>
    <td> (HEROKU, NIXPACKS, PAKETO, RAILPACK)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="cron_schedule" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="dockerfile_path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>object</code></td>
    <td>AllDomains object</td>
</tr>
<tr>
    <td><CopyableCode code="draining_seconds" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="edge_config" /></td>
    <td><code>object</code></td>
    <td>EdgeConfig object</td>
</tr>
<tr>
    <td><CopyableCode code="has_ever_deployed" /></td>
    <td><code>boolean</code></td>
    <td>Whether any deployment was ever created for this service instance, including deployments that have since been removed. Distinguishes a service that was torn down (all deployments removed) from one that has never deployed — latestDeployment and activeDeployments are null/empty for both.</td>
</tr>
<tr>
    <td><CopyableCode code="healthcheck_path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="healthcheck_timeout" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ipv6_egress_enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_updatable" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="latest_deployment" /></td>
    <td><code>object</code></td>
    <td>The most recent deployment for this service instance</td>
</tr>
<tr>
    <td><CopyableCode code="next_cron_run_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="nixpacks_plan" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="num_replicas" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="overlap_seconds" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pre_deploy_command" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pre_deploy_timeout_seconds" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="railpack_info" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="railway_config_file" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="resolved_file_config" /></td>
    <td><code>object</code></td>
    <td>Config read from the repo's config file, taken from the most recent deployment that actually read it. Null when no deployment has resolved a config file yet. An empty `fileManifest` is a real answer and means the repo has no config file — do not read this off the latest deployment instead, since a deployment whose snapshot never completed carries no file config at all and is not the same as a repo without one.</td>
</tr>
<tr>
    <td><CopyableCode code="restart_policy_max_retries" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="restart_policy_type" /></td>
    <td><code>string</code></td>
    <td> (ALWAYS, NEVER, ON_FAILURE)</td>
</tr>
<tr>
    <td><CopyableCode code="root_directory" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service" /></td>
    <td><code>object</code></td>
    <td>Service object</td>
</tr>
<tr>
    <td><CopyableCode code="sleep_application" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td>ServiceSource object</td>
</tr>
<tr>
    <td><CopyableCode code="start_command" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="upstream_url" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="watch_patterns" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per ServiceInstance.

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
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="active_deployments" /></td>
    <td><code>array</code></td>
    <td>All currently active (deployed and running) deployments for this service instance</td>
</tr>
<tr>
    <td><CopyableCode code="build_command" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="builder" /></td>
    <td><code>string</code></td>
    <td> (HEROKU, NIXPACKS, PAKETO, RAILPACK)</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="cron_schedule" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="dockerfile_path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>object</code></td>
    <td>AllDomains object</td>
</tr>
<tr>
    <td><CopyableCode code="draining_seconds" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="edge_config" /></td>
    <td><code>object</code></td>
    <td>EdgeConfig object</td>
</tr>
<tr>
    <td><CopyableCode code="has_ever_deployed" /></td>
    <td><code>boolean</code></td>
    <td>Whether any deployment was ever created for this service instance, including deployments that have since been removed. Distinguishes a service that was torn down (all deployments removed) from one that has never deployed — latestDeployment and activeDeployments are null/empty for both.</td>
</tr>
<tr>
    <td><CopyableCode code="healthcheck_path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="healthcheck_timeout" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ipv6_egress_enabled" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_updatable" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="latest_deployment" /></td>
    <td><code>object</code></td>
    <td>The most recent deployment for this service instance</td>
</tr>
<tr>
    <td><CopyableCode code="next_cron_run_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="nixpacks_plan" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="num_replicas" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="overlap_seconds" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pre_deploy_command" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="pre_deploy_timeout_seconds" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="railpack_info" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="railway_config_file" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="resolved_file_config" /></td>
    <td><code>object</code></td>
    <td>Config read from the repo's config file, taken from the most recent deployment that actually read it. Null when no deployment has resolved a config file yet. An empty `fileManifest` is a real answer and means the repo has no config file — do not read this off the latest deployment instead, since a deployment whose snapshot never completed carries no file config at all and is not the same as a repo without one.</td>
</tr>
<tr>
    <td><CopyableCode code="restart_policy_max_retries" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="restart_policy_type" /></td>
    <td><code>string</code></td>
    <td> (ALWAYS, NEVER, ON_FAILURE)</td>
</tr>
<tr>
    <td><CopyableCode code="root_directory" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service" /></td>
    <td><code>object</code></td>
    <td>Service object</td>
</tr>
<tr>
    <td><CopyableCode code="sleep_application" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td>ServiceSource object</td>
</tr>
<tr>
    <td><CopyableCode code="start_command" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="upstream_url" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="watch_patterns" /></td>
    <td><code>array</code></td>
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
    <td>Get a service instance belonging to a service and environment. Backed by the Railway GraphQL query serviceInstance.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Lists ServiceInstance objects of a Environment. Backed by the Railway GraphQL query environment.serviceInstances.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Update a service instance. Backed by the Railway GraphQL mutation serviceInstanceUpdate.</td>
</tr>
<tr>
    <td><a href="#clear_auto_update_snooze"><CopyableCode code="clear_auto_update_snooze" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Undo an active auto-update skip for a service instance, applied immediately (no config staging, no redeploy). The recurring maintenance window and update policy are untouched — the next scheduled occurrence fires normally again. Backed by the Railway GraphQL mutation serviceInstanceAutoUpdateSnoozeClear.</td>
</tr>
<tr>
    <td><a href="#deploy"><CopyableCode code="deploy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-commit_sha"><code>commit_sha</code></a>, <a href="#parameter-latest_commit"><code>latest_commit</code></a></td>
    <td>Deploy a service instance. Backed by the Railway GraphQL mutation serviceInstanceDeploy.</td>
</tr>
<tr>
    <td><a href="#deploy_v2"><CopyableCode code="deploy_v2" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-commit_sha"><code>commit_sha</code></a></td>
    <td>Deploy a service instance. Returns a deployment ID. Backed by the Railway GraphQL mutation serviceInstanceDeployV2.</td>
</tr>
<tr>
    <td><a href="#dismiss_vuln_remediation"><CopyableCode code="dismiss_vuln_remediation" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Dismiss a platform-armed database security update notice and stand down the scheduled redeploy. Backed by the Railway GraphQL mutation serviceInstanceVulnRemediationDismiss.</td>
</tr>
<tr>
    <td><a href="#generate_shell_token"><CopyableCode code="generate_shell_token" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-instance_id"><code>instance_id</code></a>, <a href="#parameter-scope"><code>scope</code></a></td>
    <td><a href="#parameter-kind"><code>kind</code></a>, <a href="#parameter-port"><code>port</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td>Mints a 5-minute JWT for opening a browser WS session against tcp-proxy. Backed by the Railway GraphQL mutation generateShellToken.</td>
</tr>
<tr>
    <td><a href="#patch_vuln_now"><CopyableCode code="patch_vuln_now" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Immediately apply a platform-armed database security update (backup + redeploy). Returns the new deployment id. Backed by the Railway GraphQL mutation serviceInstanceVulnRemediationPatchNow.</td>
</tr>
<tr>
    <td><a href="#redeploy"><CopyableCode code="redeploy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Redeploy a service instance. Backed by the Railway GraphQL mutation serviceInstanceRedeploy.</td>
</tr>
<tr>
    <td><a href="#snooze_auto_update"><CopyableCode code="snooze_auto_update" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td><a href="#parameter-snooze_days"><code>snooze_days</code></a></td>
    <td>Skip the next scheduled auto-update occurrence for a service instance, applied immediately (no config staging, no redeploy). The recurring maintenance window and update policy are untouched — this only delays the next fire. Backed by the Railway GraphQL mutation serviceInstanceAutoUpdateSnooze.</td>
</tr>
<tr>
    <td><a href="#update_auto_update_schedule"><CopyableCode code="update_auto_update_schedule" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-schedule"><code>schedule</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Update the auto-update maintenance window for a service instance, applied immediately (no config staging, no redeploy). Only the schedule changes — the update policy is untouched. Backed by the Railway GraphQL mutation serviceInstanceAutoUpdateScheduleUpdate.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-commit_sha">
    <td><CopyableCode code="commit_sha" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-instance_id">
    <td><CopyableCode code="instance_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-kind">
    <td><CopyableCode code="kind" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-latest_commit">
    <td><CopyableCode code="latest_commit" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-port">
    <td><CopyableCode code="port" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
<tr id="parameter-schedule">
    <td><CopyableCode code="schedule" /></td>
    <td><code>array</code></td>
    <td>The full replacement set of weekly UTC maintenance windows (at least one). JSON array of objects of GraphQL type AutoUpdateScheduleWindowInput; keys keep the API's camelCase names.</td>
</tr>
<tr id="parameter-scope">
    <td><CopyableCode code="scope" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-snooze_days">
    <td><CopyableCode code="snooze_days" /></td>
    <td><code>string</code></td>
    <td>How many days to skip, from now (default 7 — covers any weekly schedule shape). Between 1 and 14. Integer passed as a string, for example '1'.</td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get a service instance belonging to a service and environment. Backed by the Railway GraphQL query serviceInstance.

```sql
SELECT
id,
environment_id,
service_id,
service_name,
active_deployments,
build_command,
builder,
created_at,
cron_schedule,
deleted_at,
dockerfile_path,
domains,
draining_seconds,
edge_config,
has_ever_deployed,
healthcheck_path,
healthcheck_timeout,
ipv6_egress_enabled,
is_updatable,
latest_deployment,
next_cron_run_at,
nixpacks_plan,
num_replicas,
overlap_seconds,
pre_deploy_command,
pre_deploy_timeout_seconds,
railpack_info,
railway_config_file,
region,
resolved_file_config,
restart_policy_max_retries,
restart_policy_type,
root_directory,
service,
sleep_application,
source,
start_command,
updated_at,
upstream_url,
watch_patterns
FROM railway.services.service_instances
WHERE environment_id = '{{ environment_id }}' -- required
AND service_id = '{{ service_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists ServiceInstance objects of a Environment. Backed by the Railway GraphQL query environment.serviceInstances.

```sql
SELECT
id,
environment_id,
service_id,
service_name,
active_deployments,
build_command,
builder,
created_at,
cron_schedule,
deleted_at,
dockerfile_path,
domains,
draining_seconds,
edge_config,
has_ever_deployed,
healthcheck_path,
healthcheck_timeout,
ipv6_egress_enabled,
is_updatable,
latest_deployment,
next_cron_run_at,
nixpacks_plan,
num_replicas,
overlap_seconds,
pre_deploy_command,
pre_deploy_timeout_seconds,
railpack_info,
railway_config_file,
region,
resolved_file_config,
restart_policy_max_retries,
restart_policy_type,
root_directory,
service,
sleep_application,
source,
start_command,
updated_at,
upstream_url,
watch_patterns
FROM railway.services.service_instances
WHERE environment_id = '{{ environment_id }}' -- required
AND project_id = '{{ project_id }}'
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

Update a service instance. Backed by the Railway GraphQL mutation serviceInstanceUpdate.

```sql
UPDATE railway.services.service_instances
SET 
environment_id = '{{ environment_id }}',
build_command = '{{ build_command }}',
builder = '{{ builder }}',
cron_schedule = '{{ cron_schedule }}',
dockerfile_path = '{{ dockerfile_path }}',
draining_seconds = '{{ draining_seconds }}',
healthcheck_path = '{{ healthcheck_path }}',
healthcheck_timeout = '{{ healthcheck_timeout }}',
ipv6_egress_enabled = '{{ ipv6_egress_enabled }}',
multi_region_config = '{{ multi_region_config }}',
nixpacks_plan = '{{ nixpacks_plan }}',
num_replicas = '{{ num_replicas }}',
overlap_seconds = '{{ overlap_seconds }}',
pre_deploy_command = '{{ pre_deploy_command }}',
pre_deploy_timeout_seconds = '{{ pre_deploy_timeout_seconds }}',
railway_config_file = '{{ railway_config_file }}',
region = '{{ region }}',
registry_credentials = '{{ registry_credentials }}',
restart_policy_max_retries = '{{ restart_policy_max_retries }}',
restart_policy_type = '{{ restart_policy_type }}',
root_directory = '{{ root_directory }}',
sleep_application = '{{ sleep_application }}',
source = '{{ source }}',
start_command = '{{ start_command }}',
watch_patterns = '{{ watch_patterns }}'
WHERE 
service_id = '{{ service_id }}' --required
RETURNING
result;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="clear_auto_update_snooze"
    values={[
        { label: 'clear_auto_update_snooze', value: 'clear_auto_update_snooze' },
        { label: 'deploy', value: 'deploy' },
        { label: 'deploy_v2', value: 'deploy_v2' },
        { label: 'dismiss_vuln_remediation', value: 'dismiss_vuln_remediation' },
        { label: 'generate_shell_token', value: 'generate_shell_token' },
        { label: 'patch_vuln_now', value: 'patch_vuln_now' },
        { label: 'redeploy', value: 'redeploy' },
        { label: 'snooze_auto_update', value: 'snooze_auto_update' },
        { label: 'update_auto_update_schedule', value: 'update_auto_update_schedule' }
    ]}
>
<TabItem value="clear_auto_update_snooze">

Undo an active auto-update skip for a service instance, applied immediately (no config staging, no redeploy). The recurring maintenance window and update policy are untouched — the next scheduled occurrence fires normally again. Backed by the Railway GraphQL mutation serviceInstanceAutoUpdateSnoozeClear.

```sql
EXEC railway.services.service_instances.clear_auto_update_snooze 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="deploy">

Deploy a service instance. Backed by the Railway GraphQL mutation serviceInstanceDeploy.

```sql
EXEC railway.services.service_instances.deploy 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@commit_sha='{{ commit_sha }}',
@latest_commit='{{ latest_commit }}'
;
```
</TabItem>
<TabItem value="deploy_v2">

Deploy a service instance. Returns a deployment ID. Backed by the Railway GraphQL mutation serviceInstanceDeployV2.

```sql
EXEC railway.services.service_instances.deploy_v2 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@commit_sha='{{ commit_sha }}'
;
```
</TabItem>
<TabItem value="dismiss_vuln_remediation">

Dismiss a platform-armed database security update notice and stand down the scheduled redeploy. Backed by the Railway GraphQL mutation serviceInstanceVulnRemediationDismiss.

```sql
EXEC railway.services.service_instances.dismiss_vuln_remediation 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="generate_shell_token">

Mints a 5-minute JWT for opening a browser WS session against tcp-proxy. Backed by the Railway GraphQL mutation generateShellToken.

```sql
EXEC railway.services.service_instances.generate_shell_token 
@environment_id='{{ environment_id }}', --required
@instance_id='{{ instance_id }}', --required
@scope='{{ scope }}', --required
@kind='{{ kind }}',
@port='{{ port }}',
@service_id='{{ service_id }}'
;
```
</TabItem>
<TabItem value="patch_vuln_now">

Immediately apply a platform-armed database security update (backup + redeploy). Returns the new deployment id. Backed by the Railway GraphQL mutation serviceInstanceVulnRemediationPatchNow.

```sql
EXEC railway.services.service_instances.patch_vuln_now 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="redeploy">

Redeploy a service instance. Backed by the Railway GraphQL mutation serviceInstanceRedeploy.

```sql
EXEC railway.services.service_instances.redeploy 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="snooze_auto_update">

Skip the next scheduled auto-update occurrence for a service instance, applied immediately (no config staging, no redeploy). The recurring maintenance window and update policy are untouched — this only delays the next fire. Backed by the Railway GraphQL mutation serviceInstanceAutoUpdateSnooze.

```sql
EXEC railway.services.service_instances.snooze_auto_update 
@environment_id='{{ environment_id }}', --required
@service_id='{{ service_id }}', --required
@snooze_days='{{ snooze_days }}'
;
```
</TabItem>
<TabItem value="update_auto_update_schedule">

Update the auto-update maintenance window for a service instance, applied immediately (no config staging, no redeploy). Only the schedule changes — the update policy is untouched. Backed by the Railway GraphQL mutation serviceInstanceAutoUpdateScheduleUpdate.

```sql
EXEC railway.services.service_instances.update_auto_update_schedule 
@environment_id='{{ environment_id }}', --required
@schedule='{{ schedule }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
</Tabs>
