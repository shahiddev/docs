---
title: Module composer
aliases:
    - "/reference/pkg/nodejs/@pulumi/gcp/composer/"
---

<!-- WARNING: this page was generated by a tool. Do not edit it by hand. -->
<!-- To change it, please see https://github.com/pulumi/docs/tree/master/tools/tscdocgen. -->

<a href="../">@pulumi/gcp</a> &gt; composer

<div class="toggleVisible">
<div class="collapsed">
<h2 class="pdoc-module-header toggleButton" title="Click to show Index">Index ▹</h2>
</div>
<div class="expanded">
<h2 class="pdoc-module-header toggleButton" title="Click to hide Index">Index ▾</h2>
<div class="pdoc-module-contents">
<ul>
<li><a href="#Environment">class Environment</a></li>
<li><a href="#EnvironmentArgs">interface EnvironmentArgs</a></li>
<li><a href="#EnvironmentState">interface EnvironmentState</a></li>
</ul>

<a href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts">composer/environment.ts</a> 
</div>
</div>
</div>


<h2 class="pdoc-module-header" id="Environment">
<a class="pdoc-member-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L108">class <b>Environment</b></a>
</h2>
<div class="pdoc-module-contents">
<pre class="highlight"><span class='kd'>extends</span> <a href='/reference/pkg/nodejs/pulumi/pulumi/#CustomResource'>CustomResource</a></pre>

An environment for running orchestration tasks.

Environments run Apache Airflow software on Google infrastructure.

To get more information about Environments, see:

* [API documentation](https://cloud.google.com/composer/docs/reference/rest/)
* How-to Guides
    * [Official Documentation](https://cloud.google.com/composer/docs)
    * [Configuring Shared VPC for Composer Environments](https://cloud.google.com/composer/docs/how-to/managing/configuring-shared-vpc)
* [Apache Airflow Documentation](http://airflow.apache.org/)

> **Warning:** We **STRONGLY** recommend  you read the [GCP guides](https://cloud.google.com/composer/docs/how-to)
  as the Environment resource requires a long deployment process and involves several layers of GCP infrastructure,
  including a Kubernetes Engine cluster, Cloud Storage, and Compute networking resources. Due to limitations of the API,
  Terraform will not be able to automatically find or manage many of these underlying resources. In particular:
  * It can take up to one hour to create or update an environment resource. In addition, GCP may only detect some
    errors in configuration when they are used (e.g. ~40-50 minutes into the creation process), and is prone to limited
    error reporting. If you encounter confusing or uninformative errors, please verify your configuration is valid
    against GCP Cloud Composer before filing bugs against the Terraform provider.
  * **Environments create Google Cloud Storage buckets that do not get cleaned up automatically** on environment
    deletion. [More about Composer's use of Cloud Storage](https://cloud.google.com/composer/docs/concepts/cloud-storage).

## Example Usage

### Basic Usage
```typescript
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const test = new gcp.composer.Environment("test", {
    region: "us-central1",
});
```

### With GKE and Compute Resource Dependencies

**NOTE** To use service accounts, you need to give `role/composer.worker` to the service account on any resources that may be created for the environment
(i.e. at a project level). This will probably require an explicit dependency
on the IAM policy binding (see `google_project_iam_member` below).

```typescript
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const testNetwork = new gcp.compute.Network("test", {
    autoCreateSubnetworks: false,
});
const testAccount = new gcp.serviceAccount.Account("test", {
    accountId: "composer-env-account",
    displayName: "Test Service Account for Composer Environment",
});
const testSubnetwork = new gcp.compute.Subnetwork("test", {
    ipCidrRange: "10.2.0.0/16",
    network: testNetwork.selfLink,
    region: "us-central1",
});
const composer_worker = new gcp.projects.IAMMember("composer-worker", {
    member: pulumi.interpolate`serviceAccount:${testAccount.email}`,
    role: "roles/composer.worker",
});
const testEnvironment = new gcp.composer.Environment("test", {
    config: {
        nodeConfig: {
            machineType: "n1-standard-1",
            network: testNetwork.selfLink,
            serviceAccount: testAccount.name,
            subnetwork: testSubnetwork.selfLink,
            zone: "us-central1-a",
        },
        nodeCount: 4,
    },
    region: "us-central1",
}, {dependsOn: [composer_worker]});
```

### With Software (Airflow) Config
```typescript
import * as pulumi from "@pulumi/pulumi";
import * as gcp from "@pulumi/gcp";

const test = new gcp.composer.Environment("test", {
    config: {
        softwareConfig: {
            airflowConfigOverrides: {
                "core-load_example": "True",
            },
            envVariables: {
                FOO: "bar",
            },
            pypiPackages: {
                numpy: "",
                scipy: "==1.1.0",
            },
        },
    },
    region: "us-central1",
});
```

<h3 class="pdoc-member-header" id="Environment-constructor">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L129"> <b>constructor</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'></span><span class='kd'>new</span> Environment(name: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>, args?: <a href='#EnvironmentArgs'>EnvironmentArgs</a>, opts?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#CustomResourceOptions'>pulumi.CustomResourceOptions</a>)</pre>


Create a Environment resource with the given unique name, arguments, and options.

* `name` The _unique_ name of the resource.
* `args` The arguments to use to populate this resource&#39;s properties.
* `opts` A bag of options that control this resource&#39;s behavior.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-get">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L117">method <b>get</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'>public static </span>get(name: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>, id: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#ID'>pulumi.ID</a>&gt;, state?: <a href='#EnvironmentState'>EnvironmentState</a>, opts?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#CustomResourceOptions'>pulumi.CustomResourceOptions</a>): <a href='#Environment'>Environment</a></pre>


Get an existing Environment resource's state with the given name, ID, and optional extra
properties used to qualify the lookup.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-getProvider">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L14">method <b>getProvider</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'></span>getProvider(moduleMember: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>): ProviderResource | <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined'>undefined</a></span></pre>

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-isInstance">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L107">method <b>isInstance</b></a>
</h3>
<div class="pdoc-member-contents">
{{% md %}}

<pre class="highlight"><span class='kd'>static </span>isInstance(obj: <span class='kd'><a href='https://www.typescriptlang.org/docs/handbook/basic-types.html#any'>any</a></span>): <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean'>boolean</a></span></pre>


Returns true if the given object is an instance of CustomResource.  This is designed to work even when
multiple copies of the Pulumi SDK have been loaded into the same process.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-config">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L121">property <b>config</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>config: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;{
    airflowUri: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
    dagGcsPrefix: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
    gkeCluster: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
    nodeConfig: {
        diskSizeGb: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'>number</a></span>;
        machineType: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
        network: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
        oauthScopes: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>[];
        serviceAccount: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
        subnetwork: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
        tags: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>[];
        zone: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
    };
    nodeCount: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'>number</a></span>;
    softwareConfig: {
        airflowConfigOverrides: {[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>};
        envVariables: {[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>};
        imageVersion: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
        pypiPackages: {[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>};
        pythonVersion: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>;
    };
}&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-id">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L102">property <b>id</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>id: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>Output</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#ID'>ID</a>&gt;;</pre>
{{% md %}}

id is the provider-assigned unique ID for this managed resource.  It is set during
deployments and may be missing (undefined) during planning phases.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-labels">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L122">property <b>labels</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>labels: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>} | <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined'>undefined</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-name">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L123">property <b>name</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>name: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-project">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L128">property <b>project</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>project: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

The ID of the project in which the resource belongs.
If it is not provided, the provider project is used.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-region">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L129">property <b>region</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'>public </span>region: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>pulumi.Output</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span> | <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined'>undefined</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="Environment-urn">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/node_modules/@pulumi/pulumi/resource.d.ts#L12">property <b>urn</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>urn: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Output'>Output</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#URN'>URN</a>&gt;;</pre>
{{% md %}}

urn is the stable logical URN used to distinctly address a resource, both before and after
deployments.

{{% /md %}}
</div>
</div>
<h2 class="pdoc-module-header" id="EnvironmentArgs">
<a class="pdoc-member-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L178">interface <b>EnvironmentArgs</b></a>
</h2>
<div class="pdoc-module-contents">

The set of arguments for constructing a Environment resource.

<h3 class="pdoc-member-header" id="EnvironmentArgs-config">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L179">property <b>config</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>config?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{
    airflowUri: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    dagGcsPrefix: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    gkeCluster: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    nodeConfig: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{
        diskSizeGb: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'>number</a></span>&gt;;
        machineType: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        network: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        oauthScopes: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;[]&gt;;
        serviceAccount: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        subnetwork: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        tags: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;[]&gt;;
        zone: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    }&gt;;
    nodeCount: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'>number</a></span>&gt;;
    softwareConfig: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{
        airflowConfigOverrides: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;
        envVariables: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;
        imageVersion: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        pypiPackages: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;
        pythonVersion: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    }&gt;;
}&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentArgs-labels">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L180">property <b>labels</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>labels?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentArgs-name">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L181">property <b>name</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>name?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentArgs-project">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L186">property <b>project</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>project?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

The ID of the project in which the resource belongs.
If it is not provided, the provider project is used.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentArgs-region">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L187">property <b>region</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>region?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
</div>
<h2 class="pdoc-module-header" id="EnvironmentState">
<a class="pdoc-member-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L163">interface <b>EnvironmentState</b></a>
</h2>
<div class="pdoc-module-contents">

Input properties used for looking up and filtering Environment resources.

<h3 class="pdoc-member-header" id="EnvironmentState-config">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L164">property <b>config</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>config?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{
    airflowUri: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    dagGcsPrefix: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    gkeCluster: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    nodeConfig: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{
        diskSizeGb: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'>number</a></span>&gt;;
        machineType: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        network: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        oauthScopes: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;[]&gt;;
        serviceAccount: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        subnetwork: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        tags: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;[]&gt;;
        zone: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    }&gt;;
    nodeCount: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number'>number</a></span>&gt;;
    softwareConfig: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{
        airflowConfigOverrides: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;
        envVariables: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;
        imageVersion: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
        pypiPackages: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;
        pythonVersion: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;
    }&gt;;
}&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentState-labels">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L165">property <b>labels</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>labels?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;{[key: <span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>]: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;}&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentState-name">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L166">property <b>name</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>name?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentState-project">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L171">property <b>project</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>project?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}

The ID of the project in which the resource belongs.
If it is not provided, the provider project is used.

{{% /md %}}
</div>
<h3 class="pdoc-member-header" id="EnvironmentState-region">
<a class="pdoc-child-name" href="https://github.com/pulumi/pulumi-gcp/blob/dfd50d3cd37076dc64bfff16a687877050b08fcb/sdk/nodejs/composer/environment.ts#L172">property <b>region</b></a>
</h3>
<div class="pdoc-member-contents">
<pre class="highlight"><span class='kd'></span>region?: <a href='/reference/pkg/nodejs/pulumi/pulumi/#Input'>pulumi.Input</a>&lt;<span class='kd'><a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String'>string</a></span>&gt;;</pre>
{{% md %}}
{{% /md %}}
</div>
</div>