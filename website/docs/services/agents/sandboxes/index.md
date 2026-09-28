--- 
title: sandboxes
hide_title: false
hide_table_of_contents: false
keywords:
  - sandboxes
  - agents
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

Creates, updates, deletes, gets or lists a <code>sandboxes</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sandboxes" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.sandboxes" /></td></tr>
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

One Sandbox row.

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
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>array</code></td>
    <td>Railway-provided public HTTP domains whose routes have been published.</td>
</tr>
<tr>
    <td><CopyableCode code="idle_timeout_minutes" /></td>
    <td><code>integer</code></td>
    <td>Minutes of inactivity before the sandbox is destroyed. 0 means it never idles out; null means unknown, including for a destroyed sandbox.</td>
</tr>
<tr>
    <td><CopyableCode code="network_isolation" /></td>
    <td><code>string</code></td>
    <td> (ISOLATED, PRIVATE)</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (CREATING, DESTROYED, DESTROYING, FAILED, RUNNING)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Sandbox.

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
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>array</code></td>
    <td>Railway-provided public HTTP domains whose routes have been published.</td>
</tr>
<tr>
    <td><CopyableCode code="idle_timeout_minutes" /></td>
    <td><code>integer</code></td>
    <td>Minutes of inactivity before the sandbox is destroyed. 0 means it never idles out; null means unknown, including for a destroyed sandbox.</td>
</tr>
<tr>
    <td><CopyableCode code="network_isolation" /></td>
    <td><code>string</code></td>
    <td> (ISOLATED, PRIVATE)</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (CREATING, DESTROYED, DESTROYING, FAILED, RUNNING)</td>
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
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Get a sandbox by id. Backed by the Railway GraphQL query sandbox.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-active"><code>active</code></a></td>
    <td>List sandboxes in an environment, newest first. Passing first/after paginates; omitting them returns the full list. Backed by the Railway GraphQL query sandboxes.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Create a sandbox in an environment. Backed by the Railway GraphQL mutation sandboxCreate.</td>
</tr>
<tr>
    <td><a href="#destroy"><CopyableCode code="destroy" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Destroy a sandbox. Backed by the Railway GraphQL mutation sandboxDestroy.</td>
</tr>
<tr>
    <td><a href="#exec"><CopyableCode code="exec" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-command"><code>command</code></a>, <a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-timeout_sec"><code>timeout_sec</code></a></td>
    <td>Execute a command inside a running sandbox. Backed by the Railway GraphQL mutation sandboxExec.</td>
</tr>
<tr>
    <td><a href="#heartbeat"><CopyableCode code="heartbeat" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Extend a sandbox's lifetime. Backed by the Railway GraphQL mutation sandboxHeartbeat.</td>
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
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-active">
    <td><CopyableCode code="active" /></td>
    <td><code>boolean</code></td>
    <td>true = live sandboxes only (excludes destroyed; FAILED and transitional states are still included), false = destroyed only, omitted = all.</td>
</tr>
<tr id="parameter-command">
    <td><CopyableCode code="command" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-timeout_sec">
    <td><CopyableCode code="timeout_sec" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
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

Get a sandbox by id. Backed by the Railway GraphQL query sandbox.

```sql
SELECT
id,
environment_id,
created_at,
domains,
idle_timeout_minutes,
network_isolation,
region,
status
FROM railway.agents.sandboxes
WHERE environment_id = '{{ environment_id }}' -- required
AND id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

List sandboxes in an environment, newest first. Passing first/after paginates; omitting them returns the full list. Backed by the Railway GraphQL query sandboxes.

```sql
SELECT
id,
environment_id,
created_at,
domains,
idle_timeout_minutes,
network_isolation,
region,
status
FROM railway.agents.sandboxes
WHERE environment_id = '{{ environment_id }}' -- required
AND active = '{{ active }}'
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

Create a sandbox in an environment. Backed by the Railway GraphQL mutation sandboxCreate.

```sql
INSERT INTO railway.agents.sandboxes (
environment_id,
idle_timeout_minutes,
network_isolation,
public_domains,
region,
resources,
source_sandbox_id,
template,
variables
)
SELECT 
'{{ environment_id }}' /* required */,
{{ idle_timeout_minutes }},
'{{ network_isolation }}',
'{{ public_domains }}',
'{{ region }}',
'{{ resources }}',
'{{ source_sandbox_id }}',
'{{ template }}',
'{{ variables }}'
RETURNING
id,
environment_id,
created_at,
domains,
idle_timeout_minutes,
network_isolation,
region,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: sandboxes
  props:
    - name: environment_id
      value: "{{ environment_id }}"
    - name: idle_timeout_minutes
      value: {{ idle_timeout_minutes }}
      description: |
        Minutes of inactivity before the sandbox is destroyed. Any value <= 0 means never idle out (plan-gated). Defaults to the plan's default idle timeout.
    - name: network_isolation
      value: "{{ network_isolation }}"
      description: |
        Network access for the sandbox. Defaults to ISOLATED (no private network access). Public domains require PRIVATE to be selected explicitly.
      valid_values: ['ISOLATED', 'PRIVATE']
    - name: public_domains
      value: "{{ public_domains }}"
      description: |
        Railway-provided HTTP domains to publish, one per unique prefix and port. Supports up to 10 and requires explicitly selecting PRIVATE networking. Domain prefixes are generated when omitted. JSON array of objects of GraphQL type SandboxDomainInput; keys keep the API's camelCase names.
    - name: region
      value: "{{ region }}"
      description: |
        Region to place the sandbox in (e.g. us-west2, us-east4-eqdc4a). Defaults to the platform default region when omitted.
    - name: resources
      value: "{{ resources }}"
      description: |
        Creation-time CPU and memory, including for forks and checkpoint restores. Each omitted or null field uses the workspace's sandbox default; explicit values must not exceed its independent VM maximum. JSON object of GraphQL type SandboxResourcesInput; keys keep the API's camelCase names.
    - name: source_sandbox_id
      value: "{{ source_sandbox_id }}"
      description: |
        Fork an existing running sandbox in this environment. Mutually exclusive with template.
    - name: template
      value: "{{ template }}"
      description: |
        JSON object of GraphQL type SandboxTemplateInput; keys keep the API's camelCase names.
    - name: variables
      value: "{{ variables }}"
      description: |
        Environment variables baked into the sandbox, available to every command. Values may contain Railway variable references (e.g. \${{shared.FOO}}, \${{ServiceName.BAR}}), resolved at create time.
`}</CodeBlock>

</TabItem>
</Tabs>


## `DELETE` examples

<Tabs
    defaultValue="destroy"
    values={[
        { label: 'destroy', value: 'destroy' }
    ]}
>
<TabItem value="destroy">

Destroy a sandbox. Backed by the Railway GraphQL mutation sandboxDestroy.

```sql
DELETE FROM railway.agents.sandboxes
WHERE 
environment_id = '{{ environment_id }}' --required
AND id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="exec"
    values={[
        { label: 'exec', value: 'exec' },
        { label: 'heartbeat', value: 'heartbeat' }
    ]}
>
<TabItem value="exec">

Execute a command inside a running sandbox. Backed by the Railway GraphQL mutation sandboxExec.

```sql
EXEC railway.agents.sandboxes.exec 
@command='{{ command }}', --required
@environment_id='{{ environment_id }}', --required
@id='{{ id }}', --required
@timeout_sec='{{ timeout_sec }}'
;
```
</TabItem>
<TabItem value="heartbeat">

Extend a sandbox's lifetime. Backed by the Railway GraphQL mutation sandboxHeartbeat.

```sql
EXEC railway.agents.sandboxes.heartbeat 
@environment_id='{{ environment_id }}', --required
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
