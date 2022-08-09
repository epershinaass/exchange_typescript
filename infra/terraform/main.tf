terraform {
  required_providers {
    vault = {
      source  = "hashicorp/vault"
      version = "3.8.1"
    }
  }
  backend "s3" {
    bucket = "tf-state"
    key    = "terraform.tfstate"

    endpoint   = "http://127.0.0.1:8082"
    access_key = ""
    secret_key = ""

    region                      = "main"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    force_path_style            = true
  }
}

provider "vault" {
  # Configuration options
}

resource "vault_mount" "pki" {
  path        = "pki"
  type        = "pki"
  description = "This is an PKI root"

  default_lease_ttl_seconds = 86400
  max_lease_ttl_seconds     = 315360000
}
