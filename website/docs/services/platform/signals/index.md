--- 
title: signals
hide_title: false
hide_table_of_contents: false
keywords:
  - signals
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

Creates, updates, deletes, gets or lists a <code>signals</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="signals" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.platform.signals" /></td></tr>
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

One Signal row.

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
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_by" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="default_" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="rules" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (bool, json, number, string)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="writable_by" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
</tbody>
</table>
</TabItem>
<TabItem value="list">

One row per Signal.

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
    <td><CopyableCode code="created_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="created_by" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="default_" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="rules" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td> (bool, json, number, string)</td>
</tr>
<tr>
    <td><CopyableCode code="updated_at" /></td>
    <td><code>string (date-time)</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="version" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="writable_by" /></td>
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
    <td><a href="#parameter-name"><code>name</code></a></td>
    <td><a href="#parameter-owner"><code>owner</code></a></td>
    <td>Fetch a single signal by owner scope and name. Backed by the Railway GraphQL query signal.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-owner"><code>owner</code></a></td>
    <td>List signals registered for an owner scope. Backed by the Railway GraphQL query signals.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-default_"><code>default_</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td></td>
    <td>Register a new signal for an owner scope. Backed by the Railway GraphQL mutation signalCreate.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a></td>
    <td></td>
    <td>Delete a signal and its audit log. Backed by the Railway GraphQL mutation signalDelete.</td>
</tr>
<tr>
    <td><a href="#replace"><CopyableCode code="replace" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-default_"><code>default_</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-type"><code>type</code></a></td>
    <td></td>
    <td>Replace a signal's type and default, clearing all rules. Destructive — intended for CLI --force re-type. Backed by the Railway GraphQL mutation signalReplace.</td>
</tr>
<tr>
    <td><a href="#rollback"><CopyableCode code="rollback" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-seq"><code>seq</code></a></td>
    <td></td>
    <td>Restore a signal to the snapshot captured before a change (reads prevState from the target change row). Backed by the Railway GraphQL mutation signalRollback.</td>
</tr>
<tr>
    <td><a href="#set_default"><CopyableCode code="set_default" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-default_"><code>default_</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a></td>
    <td></td>
    <td>Change a signal's canonical default (production floor). Backed by the Railway GraphQL mutation signalDefaultSet.</td>
</tr>
<tr>
    <td><a href="#set_rule"><CopyableCode code="set_rule" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-expression"><code>expression</code></a>, <a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-rule_id"><code>rule_id</code></a>, <a href="#parameter-value"><code>value</code></a></td>
    <td></td>
    <td>Attach or replace a rule on a signal. Matching rules must agree at resolution time or the default is returned. Backed by the Railway GraphQL mutation signalRuleSet.</td>
</tr>
<tr>
    <td><a href="#unset_rule"><CopyableCode code="unset_rule" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-name"><code>name</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-rule_id"><code>rule_id</code></a></td>
    <td></td>
    <td>Remove a rule from a signal. Backed by the Railway GraphQL mutation signalRuleUnset.</td>
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
<tr id="parameter-name">
    <td><CopyableCode code="name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-owner">
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-default_">
    <td><CopyableCode code="default_" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-expression">
    <td><CopyableCode code="expression" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-rule_id">
    <td><CopyableCode code="rule_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-seq">
    <td><CopyableCode code="seq" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-type">
    <td><CopyableCode code="type" /></td>
    <td><code>string</code></td>
    <td>(bool, json, number, string)</td>
</tr>
<tr id="parameter-value">
    <td><CopyableCode code="value" /></td>
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
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Fetch a single signal by owner scope and name. Backed by the Railway GraphQL query signal.

```sql
SELECT
id,
name,
created_at,
created_by,
default_,
owner,
rules,
type,
updated_at,
version,
writable_by
FROM railway.platform.signals
WHERE name = '{{ name }}' -- required
AND owner = '{{ owner }}'
;
```
</TabItem>
<TabItem value="list">

List signals registered for an owner scope. Backed by the Railway GraphQL query signals.

```sql
SELECT
id,
name,
created_at,
created_by,
default_,
owner,
rules,
type,
updated_at,
version,
writable_by
FROM railway.platform.signals
WHERE owner = '{{ owner }}'
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

Register a new signal for an owner scope. Backed by the Railway GraphQL mutation signalCreate.

```sql
INSERT INTO railway.platform.signals (
default_,
name,
owner,
type,
writable_by
)
SELECT 
'{{ default_ }}' /* required */,
'{{ name }}' /* required */,
'{{ owner }}' /* required */,
'{{ type }}' /* required */,
'{{ writable_by }}'
RETURNING
id,
name,
created_at,
created_by,
default_,
owner,
rules,
type,
updated_at,
version,
writable_by
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: signals
  props:
    - name: default_
      value: "{{ default_ }}"
    - name: name
      value: "{{ name }}"
    - name: owner
      value: "{{ owner }}"
    - name: type
      value: "{{ type }}"
      valid_values: ['bool', 'json', 'number', 'string']
    - name: writable_by
      value:
        - "{{ writable_by }}"
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

Delete a signal and its audit log. Backed by the Railway GraphQL mutation signalDelete.

```sql
DELETE FROM railway.platform.signals
WHERE 
name = '{{ name }}' --required
AND owner = '{{ owner }}' --required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="replace"
    values={[
        { label: 'replace', value: 'replace' },
        { label: 'rollback', value: 'rollback' },
        { label: 'set_default', value: 'set_default' },
        { label: 'set_rule', value: 'set_rule' },
        { label: 'unset_rule', value: 'unset_rule' }
    ]}
>
<TabItem value="replace">

Replace a signal's type and default, clearing all rules. Destructive — intended for CLI --force re-type. Backed by the Railway GraphQL mutation signalReplace.

```sql
EXEC railway.platform.signals.replace 
@default_='{{ default_ }}', --required
@name='{{ name }}', --required
@owner='{{ owner }}', --required
@type='{{ type }}' --required
;
```
</TabItem>
<TabItem value="rollback">

Restore a signal to the snapshot captured before a change (reads prevState from the target change row). Backed by the Railway GraphQL mutation signalRollback.

```sql
EXEC railway.platform.signals.rollback 
@name='{{ name }}', --required
@owner='{{ owner }}', --required
@seq='{{ seq }}' --required
;
```
</TabItem>
<TabItem value="set_default">

Change a signal's canonical default (production floor). Backed by the Railway GraphQL mutation signalDefaultSet.

```sql
EXEC railway.platform.signals.set_default 
@default_='{{ default_ }}', --required
@name='{{ name }}', --required
@owner='{{ owner }}' --required
;
```
</TabItem>
<TabItem value="set_rule">

Attach or replace a rule on a signal. Matching rules must agree at resolution time or the default is returned. Backed by the Railway GraphQL mutation signalRuleSet.

```sql
EXEC railway.platform.signals.set_rule 
@expression='{{ expression }}', --required
@name='{{ name }}', --required
@owner='{{ owner }}', --required
@rule_id='{{ rule_id }}', --required
@value='{{ value }}' --required
;
```
</TabItem>
<TabItem value="unset_rule">

Remove a rule from a signal. Backed by the Railway GraphQL mutation signalRuleUnset.

```sql
EXEC railway.platform.signals.unset_rule 
@name='{{ name }}', --required
@owner='{{ owner }}', --required
@rule_id='{{ rule_id }}' --required
;
```
</TabItem>
</Tabs>
