--- 
title: services
hide_title: false
hide_table_of_contents: false
keywords:
  - services
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

Creates, updates, deletes, gets or lists a <code>services</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="services" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.services.services" /></td></tr>
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

One Service row.

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
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="template_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="template_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="auto_instrumentation_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Best-effort automatic tracing: Railway instruments the service's processes with eBPF (OBI) for supported runtimes, without code changes. Only active while the service's tracing is on.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has_hidden_registry_credentials_from_template" /></td>
    <td><code>boolean</code></td>
    <td>Whether this service has hidden registry credentials from a template. When true, the credentials are stored in the template and used during deployment.</td>
</tr>
<tr>
    <td><CopyableCode code="icon" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_restricted" /></td>
    <td><code>boolean</code></td>
    <td>Whether this service has an active restriction that limits its capabilities.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>Project object</td>
</tr>
<tr>
    <td><CopyableCode code="template_thread_slug" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tracing_enabled" /></td>
    <td><code>boolean</code></td>
    <td>The service's tracing override: true or false pins it, null follows the project's tracingEnabled.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Service.

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
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="template_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="template_service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="auto_instrumentation_enabled" /></td>
    <td><code>boolean</code></td>
    <td>Best-effort automatic tracing: Railway instruments the service's processes with eBPF (OBI) for supported runtimes, without code changes. Only active while the service's tracing is on.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="deleted_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="feature_flags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="has_hidden_registry_credentials_from_template" /></td>
    <td><code>boolean</code></td>
    <td>Whether this service has hidden registry credentials from a template. When true, the credentials are stored in the template and used during deployment.</td>
</tr>
<tr>
    <td><CopyableCode code="icon" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_restricted" /></td>
    <td><code>boolean</code></td>
    <td>Whether this service has an active restriction that limits its capabilities.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>Project object</td>
</tr>
<tr>
    <td><CopyableCode code="template_thread_slug" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tracing_enabled" /></td>
    <td><code>boolean</code></td>
    <td>The service's tracing override: true or false pins it, null follows the project's tracingEnabled.</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
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
    <td>Get a service by ID. Backed by the Railway GraphQL query service.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Lists Service objects of a Project. Backed by the Railway GraphQL query project.services.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Creates a new service. Backed by the Railway GraphQL mutation serviceCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Updates a service. Backed by the Railway GraphQL mutation serviceUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td>Deletes a service. Backed by the Railway GraphQL mutation serviceDelete.</td>
</tr>
<tr>
    <td><a href="#add_feature_flag"><CopyableCode code="add_feature_flag" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flag"><code>flag</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Add a feature flag for a service. Backed by the Railway GraphQL mutation serviceFeatureFlagAdd.</td>
</tr>
<tr>
    <td><a href="#connect"><CopyableCode code="connect" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-branch"><code>branch</code></a>, <a href="#parameter-image"><code>image</code></a>, <a href="#parameter-repo"><code>repo</code></a></td>
    <td>Connect a service to a source. Backed by the Railway GraphQL mutation serviceConnect.</td>
</tr>
<tr>
    <td><a href="#disconnect"><CopyableCode code="disconnect" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Disconnect a service from a repo. Backed by the Railway GraphQL mutation serviceDisconnect.</td>
</tr>
<tr>
    <td><a href="#remove_feature_flag"><CopyableCode code="remove_feature_flag" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-flag"><code>flag</code></a>, <a href="#parameter-service_id"><code>service_id</code></a></td>
    <td></td>
    <td>Remove a feature flag for a service. Backed by the Railway GraphQL mutation serviceFeatureFlagRemove.</td>
</tr>
<tr>
    <td><a href="#remove_upstream_url"><CopyableCode code="remove_upstream_url" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Remove the upstream URL from all service instances for this service. Backed by the Railway GraphQL mutation serviceRemoveUpstreamUrl.</td>
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
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-branch">
    <td><CopyableCode code="branch" /></td>
    <td><code>string</code></td>
    <td>The branch to connect to. e.g. 'main'.</td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td>Environment ID. If the specified environment is a fork, the service will only be created in it. Otherwise it will created in all environments that are not forks of other environments.</td>
</tr>
<tr id="parameter-flag">
    <td><CopyableCode code="flag" /></td>
    <td><code>string</code></td>
    <td>(BUILDER_V4, COPY_VOLUME_TO_ENVIRONMENT, PLACEHOLDER, SKIPPED_BUILDS, USE_DEPLOYMENT_VMS)</td>
</tr>
<tr id="parameter-image">
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td>Name of the Dockerhub or GHCR image to connect this service to.</td>
</tr>
<tr id="parameter-repo">
    <td><CopyableCode code="repo" /></td>
    <td><code>string</code></td>
    <td>The full name of the repo to connect to. e.g. 'railwayapp/starters'.</td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
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
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get a service by ID. Backed by the Railway GraphQL query service.

```sql
SELECT
id,
name,
group_id,
project_id,
template_id,
template_service_id,
auto_instrumentation_enabled,
created_at,
deleted_at,
feature_flags,
has_hidden_registry_credentials_from_template,
icon,
is_restricted,
project,
template_thread_slug,
tracing_enabled,
updated_at
FROM railway.services.services
WHERE id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Lists Service objects of a Project. Backed by the Railway GraphQL query project.services.

```sql
SELECT
id,
name,
group_id,
project_id,
template_id,
template_service_id,
auto_instrumentation_enabled,
created_at,
deleted_at,
feature_flags,
has_hidden_registry_credentials_from_template,
icon,
is_restricted,
project,
template_thread_slug,
tracing_enabled,
updated_at
FROM railway.services.services
WHERE project_id = '{{ project_id }}' -- required
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

Creates a new service. Backed by the Railway GraphQL mutation serviceCreate.

```sql
INSERT INTO railway.services.services (
branch,
environment_id,
icon,
name,
project_id,
registry_credentials,
source,
template_id,
template_service_id,
variables
)
SELECT 
'{{ branch }}',
'{{ environment_id }}',
'{{ icon }}',
'{{ name }}',
'{{ project_id }}' /* required */,
'{{ registry_credentials }}',
'{{ source }}',
'{{ template_id }}',
'{{ template_service_id }}',
'{{ variables }}'
RETURNING
id,
name,
group_id,
project_id,
template_id,
template_service_id,
auto_instrumentation_enabled,
created_at,
deleted_at,
feature_flags,
has_hidden_registry_credentials_from_template,
icon,
is_restricted,
project,
template_thread_slug,
tracing_enabled,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: services
  props:
    - name: branch
      value: "{{ branch }}"
    - name: environment_id
      value: "{{ environment_id }}"
      description: |
        Environment ID. If the specified environment is a fork, the service will only be created in it. Otherwise it will created in all environments that are not forks of other environments.
    - name: icon
      value: "{{ icon }}"
    - name: name
      value: "{{ name }}"
    - name: project_id
      value: "{{ project_id }}"
    - name: registry_credentials
      value: "{{ registry_credentials }}"
      description: |
        JSON object of GraphQL type RegistryCredentialsInput; keys keep the API's camelCase names.
    - name: source
      value: "{{ source }}"
      description: |
        JSON object of GraphQL type ServiceSourceInput; keys keep the API's camelCase names.
    - name: template_id
      value: "{{ template_id }}"
      description: |
        Template ID. Required when templateServiceId is provided.
    - name: template_service_id
      value: "{{ template_service_id }}"
      description: |
        Template service ID within the template's serializedConfig. Required when templateId is provided.
    - name: variables
      value: "{{ variables }}"
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

Updates a service. Backed by the Railway GraphQL mutation serviceUpdate.

```sql
UPDATE railway.services.services
SET 
auto_instrumentation_enabled = '{{ auto_instrumentation_enabled }}',
icon = '{{ icon }}',
name = '{{ name }}',
tracing_enabled = '{{ tracing_enabled }}'
WHERE 
id = '{{ id }}' --required
RETURNING
id,
name,
group_id,
project_id,
template_id,
template_service_id,
auto_instrumentation_enabled,
created_at,
deleted_at,
feature_flags,
has_hidden_registry_credentials_from_template,
icon,
is_restricted,
project,
template_thread_slug,
tracing_enabled,
updated_at;
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

Deletes a service. Backed by the Railway GraphQL mutation serviceDelete.

```sql
DELETE FROM railway.services.services
WHERE 
id = '{{ id }}' --required
AND environment_id = '{{ environment_id }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="add_feature_flag"
    values={[
        { label: 'add_feature_flag', value: 'add_feature_flag' },
        { label: 'connect', value: 'connect' },
        { label: 'disconnect', value: 'disconnect' },
        { label: 'remove_feature_flag', value: 'remove_feature_flag' },
        { label: 'remove_upstream_url', value: 'remove_upstream_url' }
    ]}
>
<TabItem value="add_feature_flag">

Add a feature flag for a service. Backed by the Railway GraphQL mutation serviceFeatureFlagAdd.

```sql
EXEC railway.services.services.add_feature_flag 
@flag='{{ flag }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="connect">

Connect a service to a source. Backed by the Railway GraphQL mutation serviceConnect.

```sql
EXEC railway.services.services.connect 
@id='{{ id }}', --required
@branch='{{ branch }}',
@image='{{ image }}',
@repo='{{ repo }}'
;
```
</TabItem>
<TabItem value="disconnect">

Disconnect a service from a repo. Backed by the Railway GraphQL mutation serviceDisconnect.

```sql
EXEC railway.services.services.disconnect 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="remove_feature_flag">

Remove a feature flag for a service. Backed by the Railway GraphQL mutation serviceFeatureFlagRemove.

```sql
EXEC railway.services.services.remove_feature_flag 
@flag='{{ flag }}', --required
@service_id='{{ service_id }}' --required
;
```
</TabItem>
<TabItem value="remove_upstream_url">

Remove the upstream URL from all service instances for this service. Backed by the Railway GraphQL mutation serviceRemoveUpstreamUrl.

```sql
EXEC railway.services.services.remove_upstream_url 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
