variable "root_ca_urls" {
  description = "Root URLs for the issuer"
  type        = list(string)
  default     = ["http://localhost:8000/v1/pki/ca"]
}

variable "root_ca_crl" {
  description = "Root crl for the issuer"
  type        = list(string)
  default     = ["http://localhost:8000/v1/pki/crl"]
}

variable "server_cert_domain" {
  description = "We create a role to create client certs, what DNS domain will these certs be in"
  type        = list(string)
  default     = ["cluster.local", "domain.local", "92.53.65.114"]
}

variable "common_name" {
  description = "Common_name"
  type        = string
  default     = "domain.local"
}
variable "alt_names" {
  description = "Alt names"
  type        = list(string)
  default     = ["*.domain.local"]
}

variable "stage_common_name" {
  description = "Common_name"
  type        = string
  default     = "92.53.65.114"
}
