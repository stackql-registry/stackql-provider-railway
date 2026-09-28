--- 
title: sandbox_template_builds
hide_title: false
hide_table_of_contents: false
keywords:
  - sandbox_template_builds
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

Creates, updates, deletes, gets or lists a <code>sandbox_template_builds</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="sandbox_template_builds" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.agents.sandbox_template_builds" /></td></tr>
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

One SandboxTemplateBuild row. The state of a template build, derived from its workflow and the existence of its checkpoint. READY means the checkpoint exists and can be booted.

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
    <td>The template's resolved-content hash.</td>
</tr>
<tr>
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (BUILDING, FAILED, PENDING, READY)</td>
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
    <td>Get a template's build state by id (the recipe content hash). READY once its checkpoint exists; BUILDING/FAILED reflect the build workflow. Backed by the Railway GraphQL query sandboxTemplateBuild.</td>
</tr>
<tr>
    <td><a href="#create"><CopyableCode code="create" /></a></td>
    <td><CopyableCode code="insert" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td></td>
    <td>Build a sandbox template into a bootable checkpoint. Backed by the Railway GraphQL mutation sandboxTemplateBuild.</td>
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

Get a template's build state by id (the recipe content hash). READY once its checkpoint exists; BUILDING/FAILED reflect the build workflow. Backed by the Railway GraphQL query sandboxTemplateBuild.

```sql
SELECT
id,
environment_id,
status
FROM railway.agents.sandbox_template_builds
WHERE environment_id = '{{ environment_id }}' -- required
AND id = '{{ id }}' -- required
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

Build a sandbox template into a bootable checkpoint. Backed by the Railway GraphQL mutation sandboxTemplateBuild.

```sql
INSERT INTO railway.agents.sandbox_template_builds (
environment_id,
instructions,
name,
region,
variables
)
SELECT 
'{{ environment_id }}' /* required */,
'{{ instructions }}',
'{{ name }}',
'{{ region }}',
'{{ variables }}'
RETURNING
id,
environment_id,
status
;
```
</TabItem>
<TabItem value="manifest">

<CodeBlock language="yaml">{`# Description fields are for documentation purposes
- name: sandbox_template_builds
  props:
    - name: environment_id
      value: "{{ environment_id }}"
    - name: instructions
      value:
        - "{{ instructions }}"
      description: |
        Build a template by running these shell instructions on the base image. Mutually exclusive with name.
    - name: name
      value: "{{ name }}"
      description: |
        Boot from a saved checkpoint with this name (one captured from a sandbox). Mutually exclusive with instructions.
    - name: region
      value: "{{ region }}"
      description: |
        Placement region for the build sandbox. The resulting checkpoint lives in this region, and sandboxes created from the template boot there. Defaults to the platform default; only the cold build consults it (a built template's own region wins).
    - name: variables
      value: "{{ variables }}"
      description: |
        Environment variables available to the template's build instructions. Values may contain Railway variable references (e.g. \${{shared.FOO}}, \${{ServiceName.BAR}}), resolved at build time.
`}</CodeBlock>

</TabItem>
</Tabs>
