--- 
title: cloud_agents
hide_title: false
hide_table_of_contents: false
keywords:
  - cloud_agents
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

Creates, updates, deletes, gets or lists a <code>cloud_agents</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="cloud_agents" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.cloud_agents" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' },
        { label: 'list_mine', value: 'list_mine' }
    ]}
>
<TabItem value="get">

One CloudAgent row. A persistent cloud agent for running coding harnesses.

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
    <td><CopyableCode code="console_target_id" /></td>
    <td><code>string</code></td>
    <td>Target ID for console or command execution. Null while unavailable.</td>
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
    <td><CopyableCode code="agent_ws_url" /></td>
    <td><code>string</code></td>
    <td>WebSocket endpoint of the in-VM harness gate, for the dashboard chat. Survives sleep: the domain is stable across sleep and wake. Prefers the machine observation; when that carries no gate domain it falls back to the domain network-cp actively serves, so an agent whose observation lagged still offers chat. Null on agents created before the gate existed, or asleep/absent machines.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td>The agent machine's public HTTP domain (port 8080) — the live preview. Prefers the observation (falling back to the first declared domain when 8080 was never requested); when the observation carries no domains it falls back to the domain network-cp actively serves on 8080, so a preview shows even when the observation lagged. Returns null while the machine sleeps.</td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>array</code></td>
    <td>Every public domain on the agent's machine, one per port, in the order the machine declared them.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>Project object</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Region the agent's machine runs in. Null briefly after creation, before the machine has been placed.</td>
</tr>
<tr>
    <td><CopyableCode code="sessions" /></td>
    <td><code>array</code></td>
    <td>Live coding-agent sessions, one entry per session. Retained for 24h after the last report, so a sleeping agent still shows what it was last doing.</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td>Repo this agent's workspace was created from. Null for agents created without a source.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (CRASHED, DELETING, FAILED, RUNNING, SLEEPING, STARTING)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per CloudAgent. A persistent cloud agent for running coding harnesses.

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
    <td><CopyableCode code="console_target_id" /></td>
    <td><code>string</code></td>
    <td>Target ID for console or command execution. Null while unavailable.</td>
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
    <td><CopyableCode code="agent_ws_url" /></td>
    <td><code>string</code></td>
    <td>WebSocket endpoint of the in-VM harness gate, for the dashboard chat. Survives sleep: the domain is stable across sleep and wake. Prefers the machine observation; when that carries no gate domain it falls back to the domain network-cp actively serves, so an agent whose observation lagged still offers chat. Null on agents created before the gate existed, or asleep/absent machines.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td>The agent machine's public HTTP domain (port 8080) — the live preview. Prefers the observation (falling back to the first declared domain when 8080 was never requested); when the observation carries no domains it falls back to the domain network-cp actively serves on 8080, so a preview shows even when the observation lagged. Returns null while the machine sleeps.</td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>array</code></td>
    <td>Every public domain on the agent's machine, one per port, in the order the machine declared them.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>Project object</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Region the agent's machine runs in. Null briefly after creation, before the machine has been placed.</td>
</tr>
<tr>
    <td><CopyableCode code="sessions" /></td>
    <td><code>array</code></td>
    <td>Live coding-agent sessions, one entry per session. Retained for 24h after the last report, so a sleeping agent still shows what it was last doing.</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td>Repo this agent's workspace was created from. Null for agents created without a source.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (CRASHED, DELETING, FAILED, RUNNING, SLEEPING, STARTING)</td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list_mine">

One row per CloudAgent. A persistent cloud agent for running coding harnesses.

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
    <td><CopyableCode code="console_target_id" /></td>
    <td><code>string</code></td>
    <td>Target ID for console or command execution. Null while unavailable.</td>
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
    <td><CopyableCode code="agent_ws_url" /></td>
    <td><code>string</code></td>
    <td>WebSocket endpoint of the in-VM harness gate, for the dashboard chat. Survives sleep: the domain is stable across sleep and wake. Prefers the machine observation; when that carries no gate domain it falls back to the domain network-cp actively serves, so an agent whose observation lagged still offers chat. Null on agents created before the gate existed, or asleep/absent machines.</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="domain" /></td>
    <td><code>string</code></td>
    <td>The agent machine's public HTTP domain (port 8080) — the live preview. Prefers the observation (falling back to the first declared domain when 8080 was never requested); when the observation carries no domains it falls back to the domain network-cp actively serves on 8080, so a preview shows even when the observation lagged. Returns null while the machine sleeps.</td>
</tr>
<tr>
    <td><CopyableCode code="domains" /></td>
    <td><code>array</code></td>
    <td>Every public domain on the agent's machine, one per port, in the order the machine declared them.</td>
</tr>
<tr>
    <td><CopyableCode code="project" /></td>
    <td><code>object</code></td>
    <td>Project object</td>
</tr>
<tr>
    <td><CopyableCode code="region" /></td>
    <td><code>string</code></td>
    <td>Region the agent's machine runs in. Null briefly after creation, before the machine has been placed.</td>
</tr>
<tr>
    <td><CopyableCode code="sessions" /></td>
    <td><code>array</code></td>
    <td>Live coding-agent sessions, one entry per session. Retained for 24h after the last report, so a sleeping agent still shows what it was last doing.</td>
</tr>
<tr>
    <td><CopyableCode code="source" /></td>
    <td><code>object</code></td>
    <td>Repo this agent's workspace was created from. Null for agents created without a source.</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (CRASHED, DELETING, FAILED, RUNNING, SLEEPING, STARTING)</td>
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
    <td>A cloud agent by ID, within an environment. Null when the agent belongs to another one, so a caller cannot render an agent it has switched away from. Backed by the Railway GraphQL query cloudAgent.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td><a href="#parameter-mine"><code>mine</code></a></td>
    <td>Cloud agents in an environment. Backed by the Railway GraphQL query cloudAgents.</td>
</tr>
<tr>
    <td><a href="#list_mine"><CopyableCode code="list_mine" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td></td>
    <td>Cloud agents you own, across every project and environment you can reach. Answers "where are my agents" in one request; `cloudAgents` needs one call per environment. Machine fields (`status`, `domain`, `domains`) read the last observed state in batched queries, so selecting them across many environments is fine. Backed by the Railway GraphQL query myCloudAgents.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Create a cloud agent. Backed by the Railway GraphQL mutation cloudAgentCreate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete a cloud agent. Backed by the Railway GraphQL mutation cloudAgentDelete.</td>
</tr>
<tr>
    <td><a href="#deploy"><CopyableCode code="deploy" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-path"><code>path</code></a>, <a href="#parameter-regions"><code>regions</code></a>, <a href="#parameter-service_name"><code>service_name</code></a></td>
    <td>Build the agent's code inside its own VM and deploy it. Creates the named service (default: the agent's name) or reuses it. Needs an agent booted with the builder. Backed by the Railway GraphQL mutation cloudAgentDeploy.</td>
</tr>
<tr>
    <td><a href="#fork"><CopyableCode code="fork" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-variables"><code>variables</code></a></td>
    <td>Duplicate a running cloud agent. Backed by the Railway GraphQL mutation cloudAgentFork.</td>
</tr>
<tr>
    <td><a href="#harness_token"><CopyableCode code="harness_token" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Mint a short-lived (5m) JWT for the agent's harness WebSocket (see agentWsUrl). The in-VM gate verifies signature/exp/aud and pins it to this agent. Mint one per dial; the token only has to survive the upgrade. Backed by the Railway GraphQL mutation cloudAgentHarnessToken.</td>
</tr>
<tr>
    <td><a href="#sleep"><CopyableCode code="sleep" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Sleep a running cloud agent, keeping its volume. Processes on the machine are terminated; waking re-runs its entrypoint. Backed by the Railway GraphQL mutation cloudAgentSleep.</td>
</tr>
<tr>
    <td><a href="#wake"><CopyableCode code="wake" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Wake a sleeping cloud agent. Backed by the Railway GraphQL mutation cloudAgentWake.</td>
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
<tr id="parameter-mine">
    <td><CopyableCode code="mine" /></td>
    <td><code>boolean</code></td>
    <td>Return only the agents that belong to you. By default every agent in the environment is returned, including your teammates'.</td>
</tr>
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-path">
    <td><CopyableCode code="path" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-regions">
    <td><CopyableCode code="regions" /></td>
    <td><code>object</code></td>
    <td>Replicas per region, e.g. &#123; "us-west2": 3 &#125;. Saved on the service; omit to keep its current regions.</td>
</tr>
<tr id="parameter-service_name">
    <td><CopyableCode code="service_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-variables">
    <td><CopyableCode code="variables" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
</tbody>
</table>

## `SELECT` examples

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'list', value: 'list' },
        { label: 'list_mine', value: 'list_mine' }
    ]}
>
<TabItem value="get">

A cloud agent by ID, within an environment. Null when the agent belongs to another one, so a caller cannot render an agent it has switched away from. Backed by the Railway GraphQL query cloudAgent.

```sql
SELECT
id,
name,
console_target_id,
environment_id,
project_id,
agent_ws_url,
created_at,
domain,
domains,
project,
region,
sessions,
source,
status
FROM railway.agents.cloud_agents
WHERE environment_id = '{{ environment_id }}' -- required
AND id = '{{ id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Cloud agents in an environment. Backed by the Railway GraphQL query cloudAgents.

```sql
SELECT
id,
name,
console_target_id,
environment_id,
project_id,
agent_ws_url,
created_at,
domain,
domains,
project,
region,
sessions,
source,
status
FROM railway.agents.cloud_agents
WHERE environment_id = '{{ environment_id }}' -- required
AND mine = '{{ mine }}'
;
```
</TabItem>
<TabItem value="list_mine">

Cloud agents you own, across every project and environment you can reach. Answers "where are my agents" in one request; `cloudAgents` needs one call per environment. Machine fields (`status`, `domain`, `domains`) read the last observed state in batched queries, so selecting them across many environments is fine. Backed by the Railway GraphQL query myCloudAgents.

```sql
SELECT
id,
name,
console_target_id,
environment_id,
project_id,
agent_ws_url,
created_at,
domain,
domains,
project,
region,
sessions,
source,
status
FROM railway.agents.cloud_agents
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

Create a cloud agent. Backed by the Railway GraphQL mutation cloudAgentCreate.

```sql
INSERT INTO railway.agents.cloud_agents (
cloud_agent_checkpoint_id,
code_endpoint,
environment_id,
name,
region,
source,
variables
)
SELECT 
'{{ cloud_agent_checkpoint_id }}',
'{{ code_endpoint }}',
'{{ environment_id }}' /* required */,
'{{ name }}',
'{{ region }}',
'{{ source }}',
'{{ variables }}'
RETURNING
id,
name,
console_target_id,
environment_id,
project_id,
agent_ws_url,
created_at,
domain,
domains,
project,
region,
sessions,
source,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: cloud_agents
  props:
    - name: cloud_agent_checkpoint_id
      value: "{{ cloud_agent_checkpoint_id }}"
      description: |
        Create the cloud agent from an existing checkpoint.
    - name: code_endpoint
      value: "{{ code_endpoint }}"
      description: |
        Provision a code-* domain. Omit to disable, including when restoring a checkpoint or bootstrap. JSON object of GraphQL type CloudAgentCodeEndpointInput; keys keep the API's camelCase names.
    - name: environment_id
      value: "{{ environment_id }}"
    - name: name
      value: "{{ name }}"
    - name: region
      value: "{{ region }}"
      description: |
        Region to run the agent in, e.g. us-west2. Defaults to the checkpoint's region when booting from one, else the workspace's preferred region.
    - name: source
      value: "{{ source }}"
      description: |
        JSON object of GraphQL type CloudAgentSourceInput; keys keep the API's camelCase names.
    - name: variables
      value: "{{ variables }}"
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

Delete a cloud agent. Backed by the Railway GraphQL mutation cloudAgentDelete.

```sql
DELETE FROM railway.agents.cloud_agents
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
        { label: 'deploy', value: 'deploy' },
        { label: 'fork', value: 'fork' },
        { label: 'harness_token', value: 'harness_token' },
        { label: 'sleep', value: 'sleep' },
        { label: 'wake', value: 'wake' }
    ]}
>
<TabItem value="deploy">

Build the agent's code inside its own VM and deploy it. Creates the named service (default: the agent's name) or reuses it. Needs an agent booted with the builder. Backed by the Railway GraphQL mutation cloudAgentDeploy.

```sql
EXEC railway.agents.cloud_agents.deploy 
@id='{{ id }}', --required
@path='{{ path }}',
@regions='{{ regions }}',
@service_name='{{ service_name }}'
;
```
</TabItem>
<TabItem value="fork">

Duplicate a running cloud agent. Backed by the Railway GraphQL mutation cloudAgentFork.

```sql
EXEC railway.agents.cloud_agents.fork 
@id='{{ id }}', --required
@name='{{ name }}',
@variables='{{ variables }}'
;
```
</TabItem>
<TabItem value="harness_token">

Mint a short-lived (5m) JWT for the agent's harness WebSocket (see agentWsUrl). The in-VM gate verifies signature/exp/aud and pins it to this agent. Mint one per dial; the token only has to survive the upgrade. Backed by the Railway GraphQL mutation cloudAgentHarnessToken.

```sql
EXEC railway.agents.cloud_agents.harness_token 
@environment_id='{{ environment_id }}', --required
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="sleep">

Sleep a running cloud agent, keeping its volume. Processes on the machine are terminated; waking re-runs its entrypoint. Backed by the Railway GraphQL mutation cloudAgentSleep.

```sql
EXEC railway.agents.cloud_agents.sleep 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="wake">

Wake a sleeping cloud agent. Backed by the Railway GraphQL mutation cloudAgentWake.

```sql
EXEC railway.agents.cloud_agents.wake 
@id='{{ id }}' --required
;
```
</TabItem>
</Tabs>
