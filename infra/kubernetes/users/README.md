# Example of the Kubeconfig file for administrator

Authentication for access to the cluster occurs through MTLS.

```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED # CA Certificate
    server: https://AWS_LB_DOMAIN
  name: devopsschool.k8s.local
contexts:
- context:
    cluster: devopsschool.k8s.local
    user: devopsschool.k8s.local
  name: devopsschool.k8s.local
current-context: devopsschool.k8s.local
kind: Config
preferences: {}
users:
- name: devopsschool.k8s.local
  user:
    client-certificate-data: REDACTED # Client Certificate
    client-key-data: REDACTED # Client Private Key for Client Certificate
```
