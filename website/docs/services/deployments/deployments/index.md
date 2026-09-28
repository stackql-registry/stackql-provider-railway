--- 
title: deployments
hide_title: false
hide_table_of_contents: false
keywords:
  - deployments
  - deployments
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

Creates, updates, deletes, gets or lists a <code>deployments</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deployments" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.deployments.deployments" /></td></tr>
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

One Deployment row.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="snapshot_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="can_redeploy" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="can_rollback" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="creator" /></td>
    <td><code>object</code></td>
    <td>DeploymentCreator object</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_stopped" /></td>
    <td><code>boolean</code></td>
    <td>Check if a deployment's instances have all stopped</td>
</tr>
<tr>
    <td><CopyableCode code="diagnosis" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="instances" /></td>
    <td><code>array</code></td>
    <td>List of DeploymentDeploymentInstance objects</td>
</tr>
<tr>
    <td><CopyableCode code="meta" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="sockets" /></td>
    <td><code>array</code></td>
    <td>List of DeploymentSocket objects</td>
</tr>
<tr>
    <td><CopyableCode code="static_url" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (BUILDING, CRASHED, DEPLOYING, FAILED, INITIALIZING, NEEDS_APPROVAL, QUEUED, REMOVED, REMOVING, SKIPPED, SLEEPING, SUCCESS, WAITING)</td>
</tr>
<tr>
    <td><CopyableCode code="status_updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="suggest_add_service_domain" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Deployment.

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
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="snapshot_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="can_redeploy" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="can_rollback" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="creator" /></td>
    <td><code>object</code></td>
    <td>DeploymentCreator object</td>
</tr>
<tr>
    <td><CopyableCode code="deployment_stopped" /></td>
    <td><code>boolean</code></td>
    <td>Check if a deployment's instances have all stopped</td>
</tr>
<tr>
    <td><CopyableCode code="diagnosis" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="environment" /></td>
    <td><code>object</code></td>
    <td>Environment object</td>
</tr>
<tr>
    <td><CopyableCode code="instances" /></td>
    <td><code>array</code></td>
    <td>List of DeploymentDeploymentInstance objects</td>
</tr>
<tr>
    <td><CopyableCode code="meta" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="sockets" /></td>
    <td><code>array</code></td>
    <td>List of DeploymentSocket objects</td>
</tr>
<tr>
    <td><CopyableCode code="static_url" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (BUILDING, CRASHED, DEPLOYING, FAILED, INITIALIZING, NEEDS_APPROVAL, QUEUED, REMOVED, REMOVING, SKIPPED, SLEEPING, SUCCESS, WAITING)</td>
</tr>
<tr>
    <td><CopyableCode code="status_updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="suggest_add_service_domain" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="url" /></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Find a single deployment. Backed by the Railway GraphQL query deployment.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-include_deleted"><code>include_deleted</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-status"><code>status</code></a></td>
    <td>Get all deployments. Backed by the Railway GraphQL query deployments.</td>
</tr>
<tr>
    <td><a href="#remove"><CopyableCode code="remove" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Removes a deployment. Backed by the Railway GraphQL mutation deploymentRemove.</td>
</tr>
<tr>
    <td><a href="#approve"><CopyableCode code="approve" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Approves a deployment. Backed by the Railway GraphQL mutation deploymentApprove.</td>
</tr>
<tr>
    <td><a href="#cancel"><CopyableCode code="cancel" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Cancels a deployment. Backed by the Railway GraphQL mutation deploymentCancel.</td>
</tr>
<tr>
    <td><a href="#redeploy"><CopyableCode code="redeploy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-use_previous_image_tag"><code>use_previous_image_tag</code></a></td>
    <td>Redeploys a deployment. Backed by the Railway GraphQL mutation deploymentRedeploy.</td>
</tr>
<tr>
    <td><a href="#restart"><CopyableCode code="restart" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Restarts a deployment. Backed by the Railway GraphQL mutation deploymentRestart.</td>
</tr>
<tr>
    <td><a href="#rollback"><CopyableCode code="rollback" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Rolls back to a deployment. Backed by the Railway GraphQL mutation deploymentRollback.</td>
</tr>
<tr>
    <td><a href="#stop"><CopyableCode code="stop" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Stops a deployment. Backed by the Railway GraphQL mutation deploymentStop.</td>
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
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-include_deleted">
    <td><CopyableCode code="include_deleted" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-status">
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td>GraphQL input object literal of type DeploymentStatusInput, for example &#123;field: "value"&#125;.</td>
</tr>
<tr id="parameter-use_previous_image_tag">
    <td><CopyableCode code="use_previous_image_tag" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
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

Find a single deployment. Backed by the Railway GraphQL query deployment.

```sql
SELECT
id,
environment_id,
project_id,
service_id,
snapshot_id,
can_redeploy,
can_rollback,
created_at,
creator,
deployment_stopped,
diagnosis,
environment,
instances,
meta,
sockets,
static_url,
status,
status_updated_at,
suggest_add_service_domain,
updated_at,
url
FROM railway.deployments.deployments
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Get all deployments. Backed by the Railway GraphQL query deployments.

```sql
SELECT
id,
environment_id,
project_id,
service_id,
snapshot_id,
can_redeploy,
can_rollback,
created_at,
creator,
deployment_stopped,
diagnosis,
environment,
instances,
meta,
sockets,
static_url,
status,
status_updated_at,
suggest_add_service_domain,
updated_at,
url
FROM railway.deployments.deployments
WHERE environment_id = '{{ environment_id }}'
AND include_deleted = '{{ include_deleted }}'
AND project_id = '{{ project_id }}'
AND service_id = '{{ service_id }}'
AND status = '{{ status }}'
;
```
</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="remove"
    values={[
        { label: 'remove', value: 'remove' }
    ]}
>
<TabItem value="remove">

Removes a deployment. Backed by the Railway GraphQL mutation deploymentRemove.

```sql
DELETE FROM railway.deployments.deployments
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="approve"
    values={[
        { label: 'approve', value: 'approve' },
        { label: 'cancel', value: 'cancel' },
        { label: 'redeploy', value: 'redeploy' },
        { label: 'restart', value: 'restart' },
        { label: 'rollback', value: 'rollback' },
        { label: 'stop', value: 'stop' }
    ]}
>
<TabItem value="approve">

Approves a deployment. Backed by the Railway GraphQL mutation deploymentApprove.

```sql
EXEC railway.deployments.deployments.approve 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="cancel">

Cancels a deployment. Backed by the Railway GraphQL mutation deploymentCancel.

```sql
EXEC railway.deployments.deployments.cancel 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="redeploy">

Redeploys a deployment. Backed by the Railway GraphQL mutation deploymentRedeploy.

```sql
EXEC railway.deployments.deployments.redeploy 
@id='{{ id }}', --required
@use_previous_image_tag='{{ use_previous_image_tag }}'
;
```
</TabItem>
<TabItem value="restart">

Restarts a deployment. Backed by the Railway GraphQL mutation deploymentRestart.

```sql
EXEC railway.deployments.deployments.restart 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="rollback">

Rolls back to a deployment. Backed by the Railway GraphQL mutation deploymentRollback.

```sql
EXEC railway.deployments.deployments.rollback 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="stop">

Stops a deployment. Backed by the Railway GraphQL mutation deploymentStop.

```sql
EXEC railway.deployments.deployments.stop 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
