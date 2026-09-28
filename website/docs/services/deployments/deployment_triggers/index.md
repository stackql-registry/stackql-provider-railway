--- 
title: deployment_triggers
hide_title: false
hide_table_of_contents: false
keywords:
  - deployment_triggers
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

Creates, updates, deletes, gets or lists a <code>deployment_triggers</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="deployment_triggers" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.deployments.deployment_triggers" /></td></tr>
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

One row per DeploymentTrigger.

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
    <td><CopyableCode code="base_environment_override_id" /></td>
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
    <td><CopyableCode code="branch" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="check_suites" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="provider" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="repository" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="valid_check_suites" /></td>
    <td><code>integer</code></td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>All deployment triggers. Backed by the Railway GraphQL query deploymentTriggers.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-branch"><code>branch</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-provider"><code>provider</code></a>, <a href="#parameter-repository"><code>repository</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Creates a deployment trigger. Backed by the Railway GraphQL mutation deploymentTriggerCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Updates a deployment trigger. Backed by the Railway GraphQL mutation deploymentTriggerUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Deletes a deployment trigger. Backed by the Railway GraphQL mutation deploymentTriggerDelete.</td>
</tr>
<tr>
    <td><a href="#deploy"><CopyableCode code="deploy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Deploys all connected triggers for an environment. Backed by the Railway GraphQL mutation environmentTriggersDeploy.</td>
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
<tr id="parameter-branch">
    <td><CopyableCode code="branch" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-provider">
    <td><CopyableCode code="provider" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-repository">
    <td><CopyableCode code="repository" /></td>
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

All deployment triggers. Backed by the Railway GraphQL query deploymentTriggers.

```sql
SELECT
id,
base_environment_override_id,
environment_id,
project_id,
service_id,
branch,
check_suites,
provider,
repository,
valid_check_suites
FROM railway.deployments.deployment_triggers
WHERE environment_id = '{{ environment_id }}' -- required
AND project_id = '{{ project_id }}' -- required
AND service_id = '{{ service_id }}' -- required
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

Creates a deployment trigger. Backed by the Railway GraphQL mutation deploymentTriggerCreate.

```sql
INSERT INTO railway.deployments.deployment_triggers (
branch,
check_suites,
environment_id,
project_id,
provider,
repository,
root_directory,
service_id
)
SELECT 
'{{ branch }}' /* required */,
{{ check_suites }},
'{{ environment_id }}' /* required */,
'{{ project_id }}' /* required */,
'{{ provider }}' /* required */,
'{{ repository }}' /* required */,
'{{ root_directory }}',
'{{ service_id }}' /* required */
RETURNING
id,
base_environment_override_id,
environment_id,
project_id,
service_id,
branch,
check_suites,
provider,
repository,
valid_check_suites
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: deployment_triggers
  props:
    - name: branch
      value: "{{ branch }}"
    - name: check_suites
      value: {{ check_suites }}
    - name: environment_id
      value: "{{ environment_id }}"
    - name: project_id
      value: "{{ project_id }}"
    - name: provider
      value: "{{ provider }}"
    - name: repository
      value: "{{ repository }}"
    - name: root_directory
      value: "{{ root_directory }}"
    - name: service_id
      value: "{{ service_id }}"
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

Updates a deployment trigger. Backed by the Railway GraphQL mutation deploymentTriggerUpdate.

```sql
UPDATE railway.deployments.deployment_triggers
SET 
branch = '{{ branch }}',
check_suites = '{{ check_suites }}',
repository = '{{ repository }}',
root_directory = '{{ root_directory }}'
WHERE 
id = '{{ id }}' --required
RETURNING
id,
base_environment_override_id,
environment_id,
project_id,
service_id,
branch,
check_suites,
provider,
repository,
valid_check_suites;
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

Deletes a deployment trigger. Backed by the Railway GraphQL mutation deploymentTriggerDelete.

```sql
DELETE FROM railway.deployments.deployment_triggers
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="deploy"
    values={[
        { label: 'deploy', value: 'deploy' }
    ]}
>
<TabItem value="deploy">

Deploys all connected triggers for an environment. Backed by the Railway GraphQL mutation environmentTriggersDeploy.

```sql
EXEC railway.deployments.deployment_triggers.deploy 
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
</Tabs>
