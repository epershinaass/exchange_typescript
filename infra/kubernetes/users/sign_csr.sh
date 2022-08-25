#!/bin/env bash

set -euo pipefail

USER="$1"
CSR="$2"
if [[ -z ${USER} ]] || [[ -z ${CSR} ]]; then
    echo "usage: $0 <user> <csr-file>"
    exit 1
fi

KUBECFG_FILE_NAME="/tmp/kube/k8s-${USER}-conf"
TARGET_FOLDER="/tmp/kube"

create_target_folder() {
    echo -n "Creating target directory to hold files in ${TARGET_FOLDER}..."
    mkdir -p "${TARGET_FOLDER}"
    echo "done"
}

create_request() {
    echo "Create a CertificateSigningRequest and submit it to a Kubernetes Cluster via kubectl"
    REQUEST=$(base64 "${CSR}" | tr -d '\n')
    cat <<EOF | kubectl apply -f -
apiVersion: certificates.k8s.io/v1
kind: CertificateSigningRequest
metadata:
  name: ${USER}
spec:
  request: ${REQUEST}
  signerName: kubernetes.io/kube-apiserver-client
  usages:
  - client auth
EOF
    echo "done"
}

approve_csr() {
    echo "Approve the CSR"
    kubectl certificate approve "${USER}"
    echo "done"
}

get_issued_crt(){
    echo "Export the issued certificate from the CertificateSigningRequest."
    kubectl get csr "${USER}" -o jsonpath='{.status.certificate}'| base64 -d > "${TARGET_FOLDER}/certificate.crt"
    echo "done"
}

extract_ca_crt(){
    kubectl config view -o jsonpath='{.clusters[0].cluster.certificate-authority-data}' --raw | base64 --decode - > "${TARGET_FOLDER}/ca.crt"
    echo "done"
}

set_kube_config_values(){
    CLUSTER_NAME=$(kubectl config view -o jsonpath='{.clusters[0].name}')
    echo "Cluster name: ${CLUSTER_NAME}"

    ENDPOINT=$(kubectl config view \
    -o jsonpath="{.clusters[?(@.name == \"${CLUSTER_NAME}\")].cluster.server}")
    echo "Endpoint: ${ENDPOINT}"

    # Set up the config
    echo -e "\\nPreparing k8s-${USER}-conf"
    echo -n "Setting a cluster entry in kubeconfig..."
    kubectl config set-cluster "${CLUSTER_NAME}" \
    --server="${ENDPOINT}" \
    --kubeconfig="${KUBECFG_FILE_NAME}" \
    --certificate-authority="${TARGET_FOLDER}/ca.crt" \
    --embed-certs=true
}

create_target_folder
create_request
approve_csr
get_issued_crt
extract_ca_crt
set_kube_config_values

echo -e "\\nAll done!"
echo "Kubeconfig located at ${KUBECFG_FILE_NAME}"
echo "you should not have any permissions by default - you have just created the authentication part"
echo "You will need to create RBAC permissions"