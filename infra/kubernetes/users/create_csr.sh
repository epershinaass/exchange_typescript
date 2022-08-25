#!/bin/env bash

set -euo pipefail

USER="$1"
GROUP="$2"
if [[ -z ${USER} ]] || [[ -z ${GROUP} ]]; then
    echo "usage: $0 <user> <group>"
    exit 1
fi

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
    openssl req -new -key "${TARGET_FOLDER}/key.pem" -out "${TARGET_FOLDER}/request.csr" -subj "/CN=$USER/O=$GROUP"
    echo "done"
}

create_target_folder
create_private_key
create_csr

echo -e "\\nAll done!"

echo "SCR and private key located at ${TARGET_FOLDER}"
echo "You will need to approve it to a Kubernetes Cluster"