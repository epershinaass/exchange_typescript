# Terraform outputs if you want to do something more with these intermediate certs in terraform.
output "ca_cert_chain" {
  value = vault_pki_secret_backend_root_sign_intermediate.intermediate.ca_chain
}

output "intermediate_ca" {
  value = vault_pki_secret_backend_root_sign_intermediate.intermediate.certificate
}
