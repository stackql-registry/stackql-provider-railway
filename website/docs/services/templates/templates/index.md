--- 
title: templates
hide_title: false
hide_table_of_contents: false
keywords:
  - templates
  - templates
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

Creates, updates, deletes, gets or lists a <code>templates</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="templates" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.templates.templates" /></td></tr>
</tbody></table>

## Fields

The following fields are returned by `SELECT` queries:

<Tabs
    defaultValue="get"
    values={[
        { label: 'get', value: 'get' },
        { label: 'get_source_for_project', value: 'get_source_for_project' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

One Template row.

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
    <td><CopyableCode code="demo_project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="publishing_restriction_id" /></td>
    <td><code>string</code></td>
    <td>The active restriction stopping this workspace publishing templates, so a restricted author can be sent to the page that explains it and takes the appeal. Null when publishing is not restricted, and for anyone but the template's owner: the `template` query is public, and whether a workspace is under an abuse restriction is not.</td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="active_projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="canvas_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="community_thread_slug" /></td>
    <td><code>string</code></td>
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
    <td>TemplateCreator object</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="guides" /></td>
    <td><code>object</code></td>
    <td>TemplateGuide object</td>
</tr>
<tr>
    <td><CopyableCode code="health" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_approved" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_v2_template" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_verified" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="languages" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="maintainer" /></td>
    <td><code>object</code></td>
    <td>MaintainerWorkspace object</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="readme" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="recent_projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="serialized_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="similar_templates" /></td>
    <td><code>array</code></td>
    <td>List of SimilarTemplate objects</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (HIDDEN, PUBLISHED, UNPUBLISHED)</td>
</tr>
<tr>
    <td><CopyableCode code="support_health_metrics" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="total_payout" /></td>
    <td><code>number</code></td>
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
<TabItem value="get_source_for_project">

One Template row.

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
    <td><CopyableCode code="demo_project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="publishing_restriction_id" /></td>
    <td><code>string</code></td>
    <td>The active restriction stopping this workspace publishing templates, so a restricted author can be sent to the page that explains it and takes the appeal. Null when publishing is not restricted, and for anyone but the template's owner: the `template` query is public, and whether a workspace is under an abuse restriction is not.</td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="active_projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="canvas_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="community_thread_slug" /></td>
    <td><code>string</code></td>
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
    <td>TemplateCreator object</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="guides" /></td>
    <td><code>object</code></td>
    <td>TemplateGuide object</td>
</tr>
<tr>
    <td><CopyableCode code="health" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_approved" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_v2_template" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_verified" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="languages" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="maintainer" /></td>
    <td><code>object</code></td>
    <td>MaintainerWorkspace object</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="readme" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="recent_projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="serialized_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="similar_templates" /></td>
    <td><code>array</code></td>
    <td>List of SimilarTemplate objects</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (HIDDEN, PUBLISHED, UNPUBLISHED)</td>
</tr>
<tr>
    <td><CopyableCode code="support_health_metrics" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="total_payout" /></td>
    <td><code>number</code></td>
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
<TabItem value="list">

One row per Template.

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
    <td><CopyableCode code="demo_project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="publishing_restriction_id" /></td>
    <td><code>string</code></td>
    <td>The active restriction stopping this workspace publishing templates, so a restricted author can be sent to the page that explains it and takes the appeal. Null when publishing is not restricted, and for anyone but the template's owner: the `template` query is public, and whether a workspace is under an abuse restriction is not.</td>
</tr>
<tr>
    <td><CopyableCode code="workspace_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="active_projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="canvas_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="community_thread_slug" /></td>
    <td><code>string</code></td>
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
    <td>TemplateCreator object</td>
</tr>
<tr>
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="guides" /></td>
    <td><code>object</code></td>
    <td>TemplateGuide object</td>
</tr>
<tr>
    <td><CopyableCode code="health" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_approved" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_v2_template" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_verified" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="languages" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="maintainer" /></td>
    <td><code>object</code></td>
    <td>MaintainerWorkspace object</td>
</tr>
<tr>
    <td><CopyableCode code="projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="readme" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="recent_projects" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="serialized_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="similar_templates" /></td>
    <td><code>array</code></td>
    <td>List of SimilarTemplate objects</td>
</tr>
<tr>
    <td><CopyableCode code="status" /></td>
    <td><code>string</code></td>
    <td> (HIDDEN, PUBLISHED, UNPUBLISHED)</td>
</tr>
<tr>
    <td><CopyableCode code="support_health_metrics" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tags" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="total_payout" /></td>
    <td><code>number</code></td>
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
    <td><a href="#get"><CopyableCode code="get" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-code"><code>code</code></a></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-owner"><code>owner</code></a>, <a href="#parameter-repo"><code>repo</code></a></td>
    <td>Get a template by code or ID or GitHub owner and repo. Backed by the Railway GraphQL query template.</td>
</tr>
<tr>
    <td><a href="#get_source_for_project"><CopyableCode code="get_source_for_project" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td></td>
    <td>Get the source template for a project. Backed by the Railway GraphQL query templateSourceForProject.</td>
</tr>
<tr>
    <td><a href="#list"><CopyableCode code="list" /></a></td>
    <td><CopyableCode code="select" /></td>
    <td></td>
    <td><a href="#parameter-recommended"><code>recommended</code></a>, <a href="#parameter-verified"><code>verified</code></a></td>
    <td>Get all published templates. Backed by the Railway GraphQL query templates.</td>
</tr>
<tr>
    <td><a href="#delete"><CopyableCode code="delete" /></a></td>
    <td><CopyableCode code="delete" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Deletes a template. Backed by the Railway GraphQL mutation templateDelete.</td>
</tr>
<tr>
    <td><a href="#clone"><CopyableCode code="clone" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-code"><code>code</code></a></td>
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Duplicates an existing template. Backed by the Railway GraphQL mutation templateClone.</td>
</tr>
<tr>
    <td><a href="#deploy_v2"><CopyableCode code="deploy_v2" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-serialized_config"><code>serialized_config</code></a>, <a href="#parameter-template_id"><code>template_id</code></a></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-existing_root_service_id"><code>existing_root_service_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-stage_only"><code>stage_only</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Deploys a template using the serialized template config. Backed by the Railway GraphQL mutation templateDeployV2.</td>
</tr>
<tr>
    <td><a href="#eject_service_source"><CopyableCode code="eject_service_source" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-repo_name"><code>repo_name</code></a>, <a href="#parameter-repo_owner"><code>repo_owner</code></a>, <a href="#parameter-service_ids"><code>service_ids</code></a>, <a href="#parameter-upstream_url"><code>upstream_url</code></a></td>
    <td></td>
    <td>Ejects a service from the template and creates a new repo in the provided org. Backed by the Railway GraphQL mutation templateServiceSourceEject.</td>
</tr>
<tr>
    <td><a href="#generate"><CopyableCode code="generate" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-project_id"><code>project_id</code></a></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a></td>
    <td>Generate a template for a project. Backed by the Railway GraphQL mutation templateGenerate.</td>
</tr>
<tr>
    <td><a href="#publish"><CopyableCode code="publish" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a>, <a href="#parameter-category"><code>category</code></a>, <a href="#parameter-description"><code>description</code></a>, <a href="#parameter-readme"><code>readme</code></a></td>
    <td><a href="#parameter-demo_project_id"><code>demo_project_id</code></a>, <a href="#parameter-image"><code>image</code></a>, <a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td>Publishes a template. Backed by the Railway GraphQL mutation templatePublish.</td>
</tr>
<tr>
    <td><a href="#revert"><CopyableCode code="revert" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-environment_id"><code>environment_id</code></a>, <a href="#parameter-project_id"><code>project_id</code></a>, <a href="#parameter-root_service_id"><code>root_service_id</code></a>, <a href="#parameter-template_code"><code>template_code</code></a></td>
    <td><a href="#parameter-group_id"><code>group_id</code></a>, <a href="#parameter-stage_only"><code>stage_only</code></a></td>
    <td>Reverts an HA cluster to standalone mode using template metadata to derive variables to remove. Backed by the Railway GraphQL mutation templateRevert.</td>
</tr>
<tr>
    <td><a href="#unpublish"><CopyableCode code="unpublish" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Unpublishes a template. Backed by the Railway GraphQL mutation templateUnpublish.</td>
</tr>
<tr>
    <td><a href="#update_volume"><CopyableCode code="update_volume" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-service_id"><code>service_id</code></a>, <a href="#parameter-template_id"><code>template_id</code></a>, <a href="#parameter-volume_id"><code>volume_id</code></a></td>
    <td><a href="#parameter-size_mb"><code>size_mb</code></a></td>
    <td>Sets the default size (in MB) for a volume mount in a template's config. New volumes created when the template is deployed are provisioned at this size, clamped to the deployer's plan maximum. Pass sizeMB: null to clear the pre-size and fall back to the plan default. Editing a template requires maintainer access. Backed by the Railway GraphQL mutation templateVolumeUpdate.</td>
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
<tr id="parameter-code">
    <td><CopyableCode code="code" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-project_id">
    <td><CopyableCode code="project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-owner">
    <td><CopyableCode code="owner" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-recommended">
    <td><CopyableCode code="recommended" /></td>
    <td><code>boolean</code></td>
    <td>If set to true, only recommended templates will be returned.</td>
</tr>
<tr id="parameter-repo">
    <td><CopyableCode code="repo" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-verified">
    <td><CopyableCode code="verified" /></td>
    <td><code>boolean</code></td>
    <td>If set to true, only verified templates will be returned.</td>
</tr>
<tr id="parameter-category">
    <td><CopyableCode code="category" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-demo_project_id">
    <td><CopyableCode code="demo_project_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-description">
    <td><CopyableCode code="description" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-environment_id">
    <td><CopyableCode code="environment_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-existing_root_service_id">
    <td><CopyableCode code="existing_root_service_id" /></td>
    <td><code>string</code></td>
    <td>Use an existing service as the cluster root instead of creating a new one. A live cluster edge is resolved to the root it fronts. Used for HA cluster conversion where an existing postgres becomes the primary.</td>
</tr>
<tr id="parameter-group_id">
    <td><CopyableCode code="group_id" /></td>
    <td><code>string</code></td>
    <td>The group ID to delete when reverting.</td>
</tr>
<tr id="parameter-image">
    <td><CopyableCode code="image" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-readme">
    <td><CopyableCode code="readme" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-repo_name">
    <td><CopyableCode code="repo_name" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-repo_owner">
    <td><CopyableCode code="repo_owner" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-root_service_id">
    <td><CopyableCode code="root_service_id" /></td>
    <td><code>string</code></td>
    <td>The root service ID of the HA cluster to revert.</td>
</tr>
<tr id="parameter-serialized_config">
    <td><CopyableCode code="serialized_config" /></td>
    <td><code>object</code></td>
    <td></td>
</tr>
<tr id="parameter-service_id">
    <td><CopyableCode code="service_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-service_ids">
    <td><CopyableCode code="service_ids" /></td>
    <td><code>array</code></td>
    <td>Provide multiple serviceIds when ejecting services from a monorepo.</td>
</tr>
<tr id="parameter-size_mb">
    <td><CopyableCode code="size_mb" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
<tr id="parameter-stage_only">
    <td><CopyableCode code="stage_only" /></td>
    <td><code>string</code></td>
    <td>If true, create resources and patch but don't deploy. Returns patchId for later commit. Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-template_code">
    <td><CopyableCode code="template_code" /></td>
    <td><code>string</code></td>
    <td>The template code to revert (e.g., 'ha-postgres').</td>
</tr>
<tr id="parameter-template_id">
    <td><CopyableCode code="template_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-upstream_url">
    <td><CopyableCode code="upstream_url" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-volume_id">
    <td><CopyableCode code="volume_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-workspace_id">
    <td><CopyableCode code="workspace_id" /></td>
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
        { label: 'get_source_for_project', value: 'get_source_for_project' },
        { label: 'list', value: 'list' }
    ]}
>
<TabItem value="get">

Get a template by code or ID or GitHub owner and repo. Backed by the Railway GraphQL query template.

```sql
SELECT
id,
name,
demo_project_id,
publishing_restriction_id,
workspace_id,
active_projects,
canvas_config,
category,
code,
community_thread_slug,
created_at,
creator,
description,
guides,
health,
image,
is_approved,
is_v2_template,
is_verified,
languages,
maintainer,
projects,
readme,
recent_projects,
serialized_config,
similar_templates,
status,
support_health_metrics,
tags,
total_payout,
updated_at
FROM railway.templates.templates
WHERE code = '{{ code }}' -- required
AND id = '{{ id }}'
AND owner = '{{ owner }}'
AND repo = '{{ repo }}'
;
```
</TabItem>
<TabItem value="get_source_for_project">

Get the source template for a project. Backed by the Railway GraphQL query templateSourceForProject.

```sql
SELECT
id,
name,
demo_project_id,
publishing_restriction_id,
workspace_id,
active_projects,
canvas_config,
category,
code,
community_thread_slug,
created_at,
creator,
description,
guides,
health,
image,
is_approved,
is_v2_template,
is_verified,
languages,
maintainer,
projects,
readme,
recent_projects,
serialized_config,
similar_templates,
status,
support_health_metrics,
tags,
total_payout,
updated_at
FROM railway.templates.templates
WHERE project_id = '{{ project_id }}' -- required
;
```
</TabItem>
<TabItem value="list">

Get all published templates. Backed by the Railway GraphQL query templates.

```sql
SELECT
id,
name,
demo_project_id,
publishing_restriction_id,
workspace_id,
active_projects,
canvas_config,
category,
code,
community_thread_slug,
created_at,
creator,
description,
guides,
health,
image,
is_approved,
is_v2_template,
is_verified,
languages,
maintainer,
projects,
readme,
recent_projects,
serialized_config,
similar_templates,
status,
support_health_metrics,
tags,
total_payout,
updated_at
FROM railway.templates.templates
WHERE recommended = '{{ recommended }}'
AND verified = '{{ verified }}'
;
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

Deletes a template. Backed by the Railway GraphQL mutation templateDelete.

```sql
DELETE FROM railway.templates.templates
WHERE 
id = '{{ id }}' --required
AND workspace_id = '{{ workspace_id }}'
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="clone"
    values={[
        { label: 'clone', value: 'clone' },
        { label: 'deploy_v2', value: 'deploy_v2' },
        { label: 'eject_service_source', value: 'eject_service_source' },
        { label: 'generate', value: 'generate' },
        { label: 'publish', value: 'publish' },
        { label: 'revert', value: 'revert' },
        { label: 'unpublish', value: 'unpublish' },
        { label: 'update_volume', value: 'update_volume' }
    ]}
>
<TabItem value="clone">

Duplicates an existing template. Backed by the Railway GraphQL mutation templateClone.

```sql
EXEC railway.templates.templates.clone 
@code='{{ code }}', --required
@workspace_id='{{ workspace_id }}'
;
```
</TabItem>
<TabItem value="deploy_v2">

Deploys a template using the serialized template config. Backed by the Railway GraphQL mutation templateDeployV2.

```sql
EXEC railway.templates.templates.deploy_v2 
@serialized_config='{{ serialized_config }}', --required
@template_id='{{ template_id }}', --required
@environment_id='{{ environment_id }}',
@existing_root_service_id='{{ existing_root_service_id }}',
@project_id='{{ project_id }}',
@stage_only='{{ stage_only }}',
@workspace_id='{{ workspace_id }}'
;
```
</TabItem>
<TabItem value="eject_service_source">

Ejects a service from the template and creates a new repo in the provided org. Backed by the Railway GraphQL mutation templateServiceSourceEject.

```sql
EXEC railway.templates.templates.eject_service_source 
@project_id='{{ project_id }}', --required
@repo_name='{{ repo_name }}', --required
@repo_owner='{{ repo_owner }}', --required
@service_ids='{{ service_ids }}', --required
@upstream_url='{{ upstream_url }}' --required
;
```
</TabItem>
<TabItem value="generate">

Generate a template for a project. Backed by the Railway GraphQL mutation templateGenerate.

```sql
EXEC railway.templates.templates.generate 
@project_id='{{ project_id }}', --required
@environment_id='{{ environment_id }}'
;
```
</TabItem>
<TabItem value="publish">

Publishes a template. Backed by the Railway GraphQL mutation templatePublish.

```sql
EXEC railway.templates.templates.publish 
@id='{{ id }}', --required
@category='{{ category }}', --required
@description='{{ description }}', --required
@readme='{{ readme }}', --required
@demo_project_id='{{ demo_project_id }}',
@image='{{ image }}',
@workspace_id='{{ workspace_id }}'
;
```
</TabItem>
<TabItem value="revert">

Reverts an HA cluster to standalone mode using template metadata to derive variables to remove. Backed by the Railway GraphQL mutation templateRevert.

```sql
EXEC railway.templates.templates.revert 
@environment_id='{{ environment_id }}', --required
@project_id='{{ project_id }}', --required
@root_service_id='{{ root_service_id }}', --required
@template_code='{{ template_code }}', --required
@group_id='{{ group_id }}',
@stage_only='{{ stage_only }}'
;
```
</TabItem>
<TabItem value="unpublish">

Unpublishes a template. Backed by the Railway GraphQL mutation templateUnpublish.

```sql
EXEC railway.templates.templates.unpublish 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="update_volume">

Sets the default size (in MB) for a volume mount in a template's config. New volumes created when the template is deployed are provisioned at this size, clamped to the deployer's plan maximum. Pass sizeMB: null to clear the pre-size and fall back to the plan default. Editing a template requires maintainer access. Backed by the Railway GraphQL mutation templateVolumeUpdate.

```sql
EXEC railway.templates.templates.update_volume 
@service_id='{{ service_id }}', --required
@template_id='{{ template_id }}', --required
@volume_id='{{ volume_id }}', --required
@size_mb='{{ size_mb }}'
;
```
</TabItem>
</Tabs>
