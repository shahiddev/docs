---
title: Module managementresource
aliases:
    - "/reference/pkg/nodejs/@pulumi/azure/managementresource/"
---

<!-- WARNING: this page was generated by a tool. Do not edit it by hand. -->
<!-- To change it, please see https://github.com/pulumi/docs/tree/master/tools/tscdocgen. -->

<a href="../">@pulumi/azure</a> &gt; managementresource

<div class="toggleVisible">
<div class="collapsed">
<h2 class="pdoc-module-header toggleButton" title="Click to show Index">Index ▹</h2>
</div>
<div class="expanded">
<h2 class="pdoc-module-header toggleButton" title="Click to hide Index">Index ▾</h2>
<div class="pdoc-module-contents">
<ul>
<li><a href="#ManangementLock">class ManangementLock</a></li>
<li><a href="#ManangementLockArgs">interface ManangementLockArgs</a></li>
<li><a href="#ManangementLockState">interface ManangementLockState</a></li>
</ul>

<a href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts">managementresource/manangementLock.ts</a> 
</div>
</div>
</div>


<h2 class="pdoc-module-header" id="ManangementLock">
<a class="pdoc-member-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L68">class <b>ManangementLock</b></a>
</h2>
<div class="pdoc-module-contents">
<pre class="highlight"><span class='kd'>extends</span> <a href='/reference/pkg/nodejs/pulumi/pulumi/#CustomResource'>CustomResource</a></pre>
{{% md %}}

Manages a Management Lock which is scoped to a Subscription, Resource Group or Resource.

## Example Usage (Subscription Level Lock)

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const current = pulumi.output(azure.core.getSubscription({}));
const subscription_level = new azure.managementresource.ManangementLock("subscription-level", {
    lockLevel: "CanNotDelete",
    name: "subscription-level",
    notes: "Items can't be deleted in this subscription!",
    scope: current.id,
});
```

## Example Usage (Resource Group Level Lock)

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const test = new azure.core.ResourceGroup("test", {
    location: "West Europe",
    name: "locked-resource-group",
});
const resource_group_level = new azure.managementresource.ManangementLock("resource-group-level", {
    lockLevel: "ReadOnly",
    name: "resource-group-level",
    notes: "This Resource Group is Read-Only",
    scope: test.id,
});
```

## Example Usage (Resource Level Lock)

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure";

const testResourceGroup = new azure.core.ResourceGroup("test", {
    location: "West Europe",
    name: "locked-resource-group",
});
const testPublicIp = new azure.network.PublicIp("test", {
    allocationMethod: "Static",
    idleTimeoutInMinutes: 30,
    location: testResourceGroup.location,
    name: "locked-publicip",
    resourceGroupName: testResourceGroup.name,
});
const public_ip = new azure.managementresource.ManangementLock("public-ip", {
    lockLevel: "CanNotDelete",
    name: "resource-ip",
    notes: "Locked because it's needed by a third-party",
    scope: testPublicIp.id,
});
```

{{% /md %}}
<h3 class="pdoc-member-header" id="ManangementLock-constructor">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L96"> <b>constructor</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'></span><span class='kd'>new</span> ManangementLock(name: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>, args: <a href='#ManangementLockArgs'>ManangementLockArgs</a>, opts?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#CustomResourceOptions'>pulumi.CustomResourceOptions</a>)</pre>


Create a ManangementLock resource with the given unique name, arguments, and options.

* `name` The _unique_ name of the resource.
* `args` The arguments to use to populate this resource&#39;s properties.
* `opts` A bag of options that control this resource&#39;s behavior.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-get">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L77">method <b>get</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'>public static </span>get(name: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>, id: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#ID'>pulumi.ID</a>&gt;, state?: <a href='#ManangementLockState'>ManangementLockState</a>, opts?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#CustomResourceOptions'>pulumi.CustomResourceOptions</a>): <a href='#ManangementLock'>ManangementLock</a></pre>


Get an existing ManangementLock resource's state with the given name, ID, and optional extra
properties used to qualify the lookup.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-getProvider">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L14">method <b>getProvider</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'></span>getProvider(moduleMember: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>): ProviderResource | <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined'>undefined</a></span></pre>

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-isInstance">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L107">method <b>isInstance</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'>static </span>isInstance(obj: <span class='kd'><a href='https://www.typescriptlang.org/docs/handbook/basic-types.html#any'>any</a></span>): <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean'>boolean</a></span></pre>


Returns true if the given object is an instance of CustomResource.  This is designed to work even when
multiple copies of the Pulumi SDK have been loaded into the same process.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-id">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L102">property <b>id</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>id: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>Output</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#ID'>ID</a>&gt;;</pre>
{{% md %}}

id is the provider-assigned unique ID for this managed resource.  It is set during
deployments and may be missing (undefined) during planning phases.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-lockLevel">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L84">property <b>lockLevel</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>lockLevel: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the Level to be used for this Lock. Possible values are `CanNotDelete` and `ReadOnly`. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-name">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L88">property <b>name</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>name: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the name of the Management Lock. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-notes">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L92">property <b>notes</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>notes: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span> | <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined'>undefined</a></span>&gt;;</pre>
{{% md %}}

Specifies some notes about the lock. Maximum of 512 characters. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-scope">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L96">property <b>scope</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>scope: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the scope at which the Management Lock should be created. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLock-urn">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L12">property <b>urn</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>urn: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>Output</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#URN'>URN</a>&gt;;</pre>
{{% md %}}

urn is the stable logical URN used to distinctly address a resource, both before and after
deployments.

{{% /md %}}
</div>
</div>
<h2 class="pdoc-module-header" id="ManangementLockArgs">
<a class="pdoc-member-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L156">interface <b>ManangementLockArgs</b></a>
</h2>
<div class="pdoc-module-contents">
{{% md %}}

The set of arguments for constructing a ManangementLock resource.

{{% /md %}}
<h3 class="pdoc-member-header" id="ManangementLockArgs-lockLevel">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L160">property <b>lockLevel</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>lockLevel: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the Level to be used for this Lock. Possible values are `CanNotDelete` and `ReadOnly`. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLockArgs-name">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L164">property <b>name</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>name?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the name of the Management Lock. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLockArgs-notes">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L168">property <b>notes</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>notes?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies some notes about the lock. Maximum of 512 characters. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLockArgs-scope">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L172">property <b>scope</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>scope: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the scope at which the Management Lock should be created. Changing this forces a new resource to be created.

{{% /md %}}
</div>
</div>
<h2 class="pdoc-module-header" id="ManangementLockState">
<a class="pdoc-member-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L134">interface <b>ManangementLockState</b></a>
</h2>
<div class="pdoc-module-contents">
{{% md %}}

Input properties used for looking up and filtering ManangementLock resources.

{{% /md %}}
<h3 class="pdoc-member-header" id="ManangementLockState-lockLevel">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L138">property <b>lockLevel</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>lockLevel?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the Level to be used for this Lock. Possible values are `CanNotDelete` and `ReadOnly`. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLockState-name">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L142">property <b>name</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>name?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the name of the Management Lock. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLockState-notes">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L146">property <b>notes</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>notes?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies some notes about the lock. Maximum of 512 characters. Changing this forces a new resource to be created.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="ManangementLockState-scope">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-azure/blob/2a0055140cfc0f4bc9650e85334e4bbbfbae4a3e/sdk/nodejs/managementresource/manangementLock.ts#L150">property <b>scope</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>scope?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

Specifies the scope at which the Management Lock should be created. Changing this forces a new resource to be created.

{{% /md %}}
</div>
</div>