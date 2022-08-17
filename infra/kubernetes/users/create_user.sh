#!/bin/env bash

set -euo pipefail

USER="$1"
GROUP="$2"
if [[ -z ${USER} ]] || [[ -z ${GROUP} ]]; then
    echo "usage: $0 <user> <group>"
    exit 1
fi

KUBECFG_FILE_NAME="/tmp/kube/k8s-${USER}-conf"
TARGET_FOLDER="/tmp/kube"

create_target_folder() {
    echo -n "Creating target directory to hold files in ${TARGET_FOLDER}..."
    mkdir -p "${TARGET_FOLDER}"
    echo "done"
}

create_private_key() {
    echo "Creating private key"
    openssl genrsa -out "${TARGET_FOLDER}/key.pem"
    echo "done"
}

create_csr(){
    echo "Creating CSR"
    openssl req -new -key "${TARGET_FOLDER}/key.pem" -out "${TARGET_FOLDER}/request.csr" -subj "/CN={$USER}/O={$GROUP}"
    echo "done"
}

create_request() {
    echo "Create a CertificateSigningRequest and submit it to a Kubernetes Cluster via kubectl"
    REQUEST=$(base64 "${TARGET_FOLDER}/request.csr" | tr -d '\n')
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

    echo -n "Setting token credentials entry in kubeconfig..."
    kubectl config set-credentials "${USER}" \
    --client-certificate="${TARGET_FOLDER}/certificate.crt" \
    --client-key="${TARGET_FOLDER}/key.pem" \
    --kubeconfig="${KUBECFG_FILE_NAME}" \
    --embed-certs

    echo -n "Setting a context entry in kubeconfig..."
    kubectl config set-context "${USER}" \
    --cluster="${CLUSTER_NAME}" \
    --user="${USER}" \
    --kubeconfig="${KUBECFG_FILE_NAME}"

    echo -n "Setting the current-context in the kubeconfig file..."
    kubectl config use-context "${USER}" \
    --kubeconfig="${KUBECFG_FILE_NAME}"
}

create_target_folder
create_private_key
create_csr
create_request
approve_csr
get_issued_crt
extract_ca_crt
set_kube_config_values

echo -e "\\nAll done!"
echo "Kubeconfig located at ${KUBECFG_FILE_NAME}"
echo "you should not have any permissions by default - you have just created the authentication part"
echo "You will need to create RBAC permissions"