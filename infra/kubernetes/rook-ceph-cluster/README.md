---
title: Ceph Cluster Helm Chart
---

Creates Rook resources to configure a [Ceph](https://ceph.io/) cluster using the [Helm](https://helm.sh) package manager.
This chart is a simple packaging of templates that will optionally create Rook resources such as:

* CephCluster, CephFilesystem, and CephObjectStore CRs
* Storage classes to expose Ceph RBD volumes, CephFS volumes, and RGW buckets
* Ingress for external access to the dashboard
* Toolbox

## Prerequisites

* Kubernetes 1.17+
* Helm 3.x
* Install the [Rook Operator chart](../rook-ceph/README.md)

## Installing

The `helm install` command deploys rook on the Kubernetes cluster in the default configuration.
The [configuration](https://github.com/rook/rook/blob/master/Documentation/Helm-Charts/ceph-cluster-chart.md#configuration) section lists the parameters that can be configured during installation. It is
recommended that the rook operator be installed into the `rook-ceph` namespace. The clusters can be installed
into the same namespace as the operator or a separate namespace.

Rook currently publishes builds of this chart to the `release` and `master` channels.

**Before installing, review the values.yaml to confirm if the default settings need to be updated.**

* If the operator was installed in a namespace other than `rook-ceph`, the namespace
  must be set in the `operatorNamespace` variable.
* Set the desired settings in the `cephClusterSpec`. The [defaults](https://github.com/rook/rook/tree/master/deploy/charts/rook-ceph-cluster/values.yaml)
  are only an example and not likely to apply to your cluster.
* The `monitoring` section should be removed from the `cephClusterSpec`, as it is specified separately in the helm settings.
* The default values for `cephBlockPools`, `cephFileSystems`, and `CephObjectStores` will create one of each, and their corresponding storage classes.
* All Ceph components now have default values for the pod resources. The resources may need to be adjusted in production clusters depending on the load. The resources can also be disabled if Ceph should not be limited (e.g. test clusters).

### **Release**

The release channel is the most recent release of Rook that is considered stable for the community.

The example install assumes you have first installed the [Rook Operator Helm Chart](../rook-ceph/README.md)
and created your customized values-override.yaml.

```console
helm repo add rook-release https://charts.rook.io/release
helm install --namespace rook-ceph rook-ceph-cluster rook-release/rook-ceph-cluster -f values.yaml
```

## Uninstalling the Chart

To see the currently installed Rook chart:

```console
helm ls --namespace rook-ceph
```

To uninstall/delete the `rook-ceph-cluster` chart:

```console
helm delete --namespace rook-ceph rook-ceph-cluster
```

The command removes all the Kubernetes components associated with the chart and deletes the release. Removing the cluster
chart does not remove the Rook operator. In addition, all data on hosts in the Rook data directory
(`/var/lib/rook` by default) and on OSD raw devices is kept. To reuse disks, you will have to wipe them before recreating the cluster.

See the [teardown documentation](https://github.com/rook/rook/blob/master/Documentation/Storage-Configuration/ceph-teardown.md) for more information.
