--- 
title: customers
hide_title: false
hide_table_of_contents: false
keywords:
  - customers
  - billing
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

Creates, updates, deletes, gets or lists a <code>customers</code> resource.

## Overview
<table><tbody>
<tr><td><b>Name</b></td><td><CopyableCode code="customers" /></td></tr>
<tr><td><b>Type</b></td><td>Resource</td></tr>
<tr><td><b>Id</b></td><td><CopyableCode code="railway.billing.customers" /></td></tr>
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

One Customer row.

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
    <td><CopyableCode code="default_payment_method_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="stripe_customer_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="applied_credits" /></td>
    <td><code>number</code></td>
    <td>The total amount of credits that have been applied during the current billing period.</td>
</tr>
<tr>
    <td><CopyableCode code="billing_address" /></td>
    <td><code>object</code></td>
    <td>CustomerAddress object</td>
</tr>
<tr>
    <td><CopyableCode code="billing_email" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="billing_period" /></td>
    <td><code>object</code></td>
    <td>BillingPeriod object</td>
</tr>
<tr>
    <td><CopyableCode code="credit_balance" /></td>
    <td><code>number</code></td>
    <td>The total amount of unused credits for the customer.</td>
</tr>
<tr>
    <td><CopyableCode code="current_usage" /></td>
    <td><code>number</code></td>
    <td>The current usage for the customer. This value is cached and may not be up to date.</td>
</tr>
<tr>
    <td><CopyableCode code="default_payment_method" /></td>
    <td><code>object</code></td>
    <td>PaymentMethod object</td>
</tr>
<tr>
    <td><CopyableCode code="has_exhausted_free_plan" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="invoices" /></td>
    <td><code>array</code></td>
    <td>List of CustomerInvoice objects</td>
</tr>
<tr>
    <td><CopyableCode code="is_prepaying" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_trialing" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_usage_subscriber" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="is_withdrawing_to_credits" /></td>
    <td><code>boolean</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="plan_limit_override" /></td>
    <td><code>object</code></td>
    <td>PlanLimitOverride object</td>
</tr>
<tr>
    <td><CopyableCode code="remaining_usage_credit_balance" /></td>
    <td><code>number</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="spend_commitment" /></td>
    <td><code>object</code></td>
    <td>SpendCommitment object</td>
</tr>
<tr>
    <td><CopyableCode code="state" /></td>
    <td><code>string</code></td>
    <td> (ACTIVE, CANCELLED, INACTIVE, PAST_DUE, UNPAID)</td>
</tr>
<tr>
    <td><CopyableCode code="subscriptions" /></td>
    <td><code>array</code></td>
    <td>List of CustomerSubscription objects</td>
</tr>
<tr>
    <td><CopyableCode code="supported_withdrawal_platforms" /></td>
    <td><code>array</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="tax_ids" /></td>
    <td><code>array</code></td>
    <td>List of CustomerTaxId objects</td>
</tr>
<tr>
    <td><CopyableCode code="trial_days_remaining" /></td>
    <td><code>integer</code></td>
    <td></td>
</tr>
<tr>
    <td><CopyableCode code="usage_limit" /></td>
    <td><code>object</code></td>
    <td>UsageLimit object</td>
</tr>
<tr>
    <td><CopyableCode code="workspace" /></td>
    <td><code>object</code></td>
    <td>Workspace object</td>
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
    <td><a href="#parameter-workspace_id"><code>workspace_id</code></a></td>
    <td></td>
    <td>Gets a Customer of a Workspace. Backed by the Railway GraphQL query workspace.customer.</td>
</tr>
<tr>
    <td><a href="#create_free_plan_subscription"><CopyableCode code="create_free_plan_subscription" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-id"><code>id</code></a></td>
    <td></td>
    <td>Create a free plan subscription for a customer. Backed by the Railway GraphQL mutation customerCreateFreePlanSubscription.</td>
</tr>
<tr>
    <td><a href="#remove_usage_limit"><CopyableCode code="remove_usage_limit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-customer_id"><code>customer_id</code></a></td>
    <td></td>
    <td>Remove the usage limit for a customer. Backed by the Railway GraphQL mutation usageLimitRemove.</td>
</tr>
<tr>
    <td><a href="#set_usage_limit"><CopyableCode code="set_usage_limit" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-customer_id"><code>customer_id</code></a>, <a href="#parameter-soft_limit_dollars"><code>soft_limit_dollars</code></a></td>
    <td><a href="#parameter-hard_limit_dollars"><code>hard_limit_dollars</code></a></td>
    <td>Set the usage limit for a customer. Backed by the Railway GraphQL mutation usageLimitSet.</td>
</tr>
<tr>
    <td><a href="#toggle_payouts_to_credits"><CopyableCode code="toggle_payouts_to_credits" /></a></td>
    <td><CopyableCode code="exec" /></td>
    <td><a href="#parameter-customer_id"><code>customer_id</code></a>, <a href="#parameter-is_withdrawing_to_credits"><code>is_withdrawing_to_credits</code></a></td>
    <td></td>
    <td>Toggle whether a customer is automatically withdrawing to credits. Backed by the Railway GraphQL mutation customerTogglePayoutsToCredits.</td>
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
<tr id="parameter-customer_id">
    <td><CopyableCode code="customer_id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-hard_limit_dollars">
    <td><CopyableCode code="hard_limit_dollars" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
</tr>
<tr id="parameter-id">
    <td><CopyableCode code="id" /></td>
    <td><code>string</code></td>
    <td></td>
</tr>
<tr id="parameter-is_withdrawing_to_credits">
    <td><CopyableCode code="is_withdrawing_to_credits" /></td>
    <td><code>string</code></td>
    <td>Boolean passed as a string, for example 'true'.</td>
</tr>
<tr id="parameter-soft_limit_dollars">
    <td><CopyableCode code="soft_limit_dollars" /></td>
    <td><code>string</code></td>
    <td>Integer passed as a string, for example '1'.</td>
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

Gets a Customer of a Workspace. Backed by the Railway GraphQL query workspace.customer.

```sql
SELECT
id,
default_payment_method_id,
stripe_customer_id,
applied_credits,
billing_address,
billing_email,
billing_period,
credit_balance,
current_usage,
default_payment_method,
has_exhausted_free_plan,
invoices,
is_prepaying,
is_trialing,
is_usage_subscriber,
is_withdrawing_to_credits,
plan_limit_override,
remaining_usage_credit_balance,
spend_commitment,
state,
subscriptions,
supported_withdrawal_platforms,
tax_ids,
trial_days_remaining,
usage_limit,
workspace
FROM railway.billing.customers
WHERE workspace_id = '{{ workspace_id }}' -- required
;
```
</TabItem>
</Tabs>


## Lifecycle Methods

<Tabs
    defaultValue="create_free_plan_subscription"
    values={[
        { label: 'create_free_plan_subscription', value: 'create_free_plan_subscription' },
        { label: 'remove_usage_limit', value: 'remove_usage_limit' },
        { label: 'set_usage_limit', value: 'set_usage_limit' },
        { label: 'toggle_payouts_to_credits', value: 'toggle_payouts_to_credits' }
    ]}
>
<TabItem value="create_free_plan_subscription">

Create a free plan subscription for a customer. Backed by the Railway GraphQL mutation customerCreateFreePlanSubscription.

```sql
EXEC railway.billing.customers.create_free_plan_subscription 
@id='{{ id }}' --required
;
```
</TabItem>
<TabItem value="remove_usage_limit">

Remove the usage limit for a customer. Backed by the Railway GraphQL mutation usageLimitRemove.

```sql
EXEC railway.billing.customers.remove_usage_limit 
@customer_id='{{ customer_id }}' --required
;
```
</TabItem>
<TabItem value="set_usage_limit">

Set the usage limit for a customer. Backed by the Railway GraphQL mutation usageLimitSet.

```sql
EXEC railway.billing.customers.set_usage_limit 
@customer_id='{{ customer_id }}', --required
@soft_limit_dollars='{{ soft_limit_dollars }}', --required
@hard_limit_dollars='{{ hard_limit_dollars }}'
;
```
</TabItem>
<TabItem value="toggle_payouts_to_credits">

Toggle whether a customer is automatically withdrawing to credits. Backed by the Railway GraphQL mutation customerTogglePayoutsToCredits.

```sql
EXEC railway.billing.customers.toggle_payouts_to_credits 
@customer_id='{{ customer_id }}', --required
@is_withdrawing_to_credits='{{ is_withdrawing_to_credits }}' --required
;
```
</TabItem>
</Tabs>
