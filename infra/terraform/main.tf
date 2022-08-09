# Create a mount point for the Root Certiifacte authority.
resource "vault_mount" "pki" {
  path        = "pki"
  type        = "pki"
  description = "This is an PKI root"

  default_lease_ttl_seconds = 31556952  # 1 years
  max_lease_ttl_seconds     = 157680000 # 5 years
}

# Create a Self Signed Root Certificate Authority
resource "vault_pki_secret_backend_root_cert" "ca" {
  depends_on = [vault_mount.pki]

  backend = vault_mount.pki.path

  type                 = "internal"
  common_name          = "Root CA"
  ttl                  = "315576000" #10 years
  format               = "pem"
  private_key_format   = "pkcs8"
  key_type             = "ec"
  key_bits             = 521
  exclude_cn_from_sans = true
  organization         = "epershinaass"
}


resource "vault_pki_secret_backend_role" "role" {
  backend        = vault_mount.pki.path
  name           = "my_role"
  ttl            = 315576000 #10 years
  key_type       = "ec"
  key_bits       = 521
  allow_any_name = true
}

# Modify the mount point and set URLs for the issuer and crl.
resource "vault_pki_secret_backend_config_urls" "urls" {
  backend                 = vault_mount.pki.path
  issuing_certificates    = var.root_ca_urls
  crl_distribution_points = var.root_ca_crl
}

# Create a mount point for the Intermediate CA.
resource "vault_mount" "intermediate" {
  path                      = "pki-int"
  type                      = vault_mount.pki.type
  description               = "This is an PKI intermediate"
  default_lease_ttl_seconds = 63072000 # 2 years
  max_lease_ttl_seconds     = 63072000 # 2 years
}

# Step 1
#
# Create a CSR (Certificate Signing Request)
# Behind the scenes this creates a new private key, that has signed the
# CSR.  Later on, when we store the signed Intermediate Cert, that
# certificate must match the Private Key generated here.
resource "vault_pki_secret_backend_intermediate_cert_request" "intermediate" {
  depends_on         = [vault_mount.pki]
  backend            = vault_mount.intermediate.path
  type               = vault_pki_secret_backend_root_cert.ca.type
  common_name        = "Intermediate CA"
  private_key_format = "pkcs8"
  key_type           = "ec"
  key_bits           = 384
}

# Step 2
#
# Have the Root CA Sign our CSR
resource "vault_pki_secret_backend_root_sign_intermediate" "intermediate" {
  depends_on           = [vault_pki_secret_backend_intermediate_cert_request.intermediate]
  backend              = vault_mount.pki.path
  csr                  = vault_pki_secret_backend_intermediate_cert_request.intermediate.csr
  common_name          = "Intermediate CA"
  exclude_cn_from_sans = true
  organization         = "epershinaass"
  revoke               = true
  ttl                  = 252288000 #8 years
}

resource "local_sensitive_file" "signed_intermediate" {
  content         = vault_pki_secret_backend_root_sign_intermediate.intermediate.certificate
  filename        = "${path.root}/output/int_ca/int_cert.pem"
  file_permission = "0400"
}

# Step 3
#
# Now that CSR is processed and we have a signed cert
# Put the Certificate, and The Root CA into the backend
# mount point.  IF you do not put the CA in here, the
# chained_ca output of a generated cert will only be
# the intermedaite cert and not the whole chain.
resource "vault_pki_secret_backend_intermediate_set_signed" "intermediate" {
  backend     = vault_mount.intermediate.path
  certificate = vault_pki_secret_backend_root_sign_intermediate.intermediate.certificate
}

resource "vault_pki_secret_backend_role" "my_role" {
  backend = vault_mount.intermediate.path
  depends_on = [
    vault_pki_secret_backend_intermediate_set_signed.intermediate
  ]
  name               = "my_role"
  ttl                = 3600
  allow_ip_sans      = true
  key_type           = "ec"
  key_bits           = 256
  allowed_domains    = var.server_cert_domain
  allow_subdomains   = true
  allow_bare_domains = true
}

resource "vault_pki_secret_backend_cert" "app" {
  depends_on  = [vault_pki_secret_backend_role.my_role]
  backend     = vault_mount.intermediate.path
  name        = vault_pki_secret_backend_role.my_role.name
  format      = "pem_bundle"
  common_name = var.common_name
  alt_names   = var.alt_names
}

resource "local_sensitive_file" "app_certificate" {
  content         = vault_pki_secret_backend_cert.app.certificate
  filename        = "${path.root}/output/app/app.pem"
  file_permission = "0400"
}


resource "vault_pki_secret_backend_cert" "stage" {
  depends_on  = [vault_pki_secret_backend_role.my_role]
  backend     = vault_mount.intermediate.path
  name        = vault_pki_secret_backend_role.my_role.name
  format      = "pem_bundle"
  common_name = var.stage_common_name
}

resource "local_sensitive_file" "stage_certificate" {
  content         = vault_pki_secret_backend_cert.stage.certificate
  filename        = "${path.root}/output/stage/stage.pem"
  file_permission = "0400"
}


resource "vault_pki_secret_backend_cert" "localhost" {
  depends_on  = [vault_pki_secret_backend_role.my_role]
  backend     = vault_mount.intermediate.path
  name        = vault_pki_secret_backend_role.my_role.name
  format      = "pem_bundle"
  common_name = var.localhost_common_name
}

resource "local_sensitive_file" "localhost_certificate" {
  content         = vault_pki_secret_backend_cert.localhost.certificate
  filename        = "${path.root}/output/localhost/localhost.pem"
  file_permission = "0400"
}
