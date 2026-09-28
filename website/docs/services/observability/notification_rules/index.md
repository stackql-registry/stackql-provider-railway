--- 
title: notification_rules
hide_title: false
hide_table_of_contents: false
keywords:
  - notification_rules
  - observability
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

Creates, updates, deletes, gets or lists a <code>notification_rules</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="notification_rules" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.observability.notification_rules" /></td></tr>
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

One row per NotificationRule.

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
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="channels" /></td>
    <td><code>array</code></td>
    <td>List of NotificationChannel objects</td>
</tr>
<tr>
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="ephemeral_environments" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="event_types" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="severities" /></td>
    <td><code>array</code></td>
    <td></td>
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
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td>Get all notification rules for a workspace and project. Backed by the Railway GraphQL query notificationRules.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-channel_configs"><code>channel_configs</code></a>, <a href="#parameter-event_types"><code>event_types</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Create a new notification rule. Backed by the Railway GraphQL mutation notificationRuleCreate.</td>
</tr>
<tr>
    <td><a href="#update"><CopyableCode code="update" /></a></td>
    <td><CopyableCode code="update" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Update a notification rule. Backed by the Railway GraphQL mutation notificationRuleUpdate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Delete a notification rule. Backed by the Railway GraphQL mutation notificationRuleDelete.</td>
</tr>
<tr>
    <td><a href="#test_webhook"><CopyableCode code="test_webhook" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-payload"><code>payload</code></a>, <a href="#parameter-url"><code>url</code></a></td>
    <td></td>
    <td>Test a webhook URL by sending a sample payload. Returns the HTTP status code. Backed by the Railway GraphQL mutation webhookTest.</td>
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
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-channel_configs">
    <td><CopyableCode code="channel_configs" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-event_types">
    <td><CopyableCode code="event_types" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-payload">
    <td><CopyableCode code="payload" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-url">
    <td><CopyableCode code="url" /></td>
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

Get all notification rules for a workspace and project. Backed by the Railway GraphQL query notificationRules.

```sql
SELECT
id,
environment_id,
project_id,
service_id,
workspace_id,
channels,
created_at,
ephemeral_environments,
event_types,
severities,
updated_at
FROM railway.observability.notification_rules
WHERE workspace_id = '{{ workspace_id }}' -- required
AND project_id = '{{ project_id }}'
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

Create a new notification rule. Backed by the Railway GraphQL mutation notificationRuleCreate.

```sql
INSERT INTO railway.observability.notification_rules (
channel_configs,
ephemeral_environments,
event_types,
project_id,
severities,
workspace_id
)
SELECT 
'{{ channel_configs }}' /* required */,
{{ ephemeral_environments }},
'{{ event_types }}' /* required */,
'{{ project_id }}',
'{{ severities }}',
'{{ workspace_id }}' /* required */
RETURNING
id,
environment_id,
project_id,
service_id,
workspace_id,
channels,
created_at,
ephemeral_environments,
event_types,
severities,
updated_at
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: notification_rules
  props:
    - name: channel_configs
      value: "{{ channel_configs }}"
    - name: ephemeral_environments
      value: {{ ephemeral_environments }}
    - name: event_types
      value:
        - "{{ event_types }}"
    - name: project_id
      value: "{{ project_id }}"
    - name: severities
      value:
        - "{{ severities }}"
    - name: workspace_id
      value: "{{ workspace_id }}"
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

Update a notification rule. Backed by the Railway GraphQL mutation notificationRuleUpdate.

```sql
UPDATE railway.observability.notification_rules
SET 
channel_configs = '{{ channel_configs }}',
ephemeral_environments = '{{ ephemeral_environments }}',
event_types = '{{ event_types }}',
severities = '{{ severities }}'
WHERE 
id = '{{ id }}' --required
RETURNING
id,
environment_id,
project_id,
service_id,
workspace_id,
channels,
created_at,
ephemeral_environments,
event_types,
severities,
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

Delete a notification rule. Backed by the Railway GraphQL mutation notificationRuleDelete.

```sql
DELETE FROM railway.observability.notification_rules
WHERE 
id = '{{ id }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="test_webhook"
    values={[
        { label: 'test_webhook', value: 'test_webhook' }
    ]}
>
<TabItem value="test_webhook">

Test a webhook URL by sending a sample payload. Returns the HTTP status code. Backed by the Railway GraphQL mutation webhookTest.

```sql
EXEC railway.observability.notification_rules.test_webhook 
@payload='{{ payload }}', --required
@url='{{ url }}' --required
;
```
</TabItem>
</Tabs>
