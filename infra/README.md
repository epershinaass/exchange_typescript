# Basic auth

## Prometheus basic auth

[guide](https://prometheus.io/docs/guides/basic-auth/)

## Hashing a password

First, generate a bcrypt hash of the password.

``` bash
pip install bcrypt
python3 gen-pass.py
```

That should prompt you for a password. Use same as GRAFANA_DATASOURCE_PASSWORD env var.

``` bash
password:
$2b$12$hNf2lSsxfm0.i4a.1kVpSOVyBCfIB51VRjgBUyv6kdnyTlgWj81Ay
```

Save that password in prometheus/web.yml

To use Prometheus Datasource, set variable `GRAFANA_DATASOURCE_PASSWORD`

``` bash
export GRAFANA_DATASOURCE_PASSWORD=<your user password>
```

The `grafana` user is used by default, the password is stored in GitHub secrets.

## Haproxy basic auth

[docs](https://www.haproxy.com/documentation/hapee/latest/security/authentication/basic-authentication/)

[stackoverflow](https://stackoverflow.com/a/64138986)

```bash
mkpasswd -m sha-512 'your_password'
```

Expected output

```bash
$6$gnGNapo/XeXYg39A$T/7TDfMrZXUDPbv5UPYemrdxdh5xEwqBrzSbpJYs9rfxLbQtgQzxyzkSGWIVOEGze8KrsA0urh3/dG.1xOx3M0
```

Copy the generated password and paste in haproxy.cfg file

```bash
userlist mycredentials
   user joe password <hashed password>
```
