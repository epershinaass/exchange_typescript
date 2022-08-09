terraform {
  required_providers {
    vault = {
      source  = "hashicorp/vault"
      version = "3.8.1"
    }
    local = {
      source  = "hashicorp/local"
      version = "2.2.3"
    }
  }
  backend "s3" {
    bucket = "tf-state"
    key    = "terraform.tfstate"

    endpoint   = "http://127.0.0.1:8082"
    access_key = "" # export MINIO_ACCESS_KEY=
    secret_key = "" # export MINIO_SECRET_KEY=

    region                      = "main"
    skip_credentials_validation = true
    skip_region_validation      = true
    force_path_style            = true
  }
}

provider "local" {
  # Configuration options
}

provider "vault" {
  # Configuration options
  address = "http://localhost:8000" # export VAULT_ADDR
}
