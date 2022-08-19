# exchange_typescript

## Environment quick setup

### Prerequisites

- Docker [Linux install](https://github.com/epershinaass/exchange_typescript/blob/main/infra/installation-scripts/installation-linux.sh)

- Docker [Windows/mac download](https://www.docker.com/get-started/)
- Docker-compose

### Run

```bash
docker-compose --profile facade up -d --build
```

### Stop

```bash
docker-compose --profile facade down
```

### [Profiles](https://docs.docker.com/engine/reference/commandline/compose_up/)

```bash
docker-compose --profile profile_name up -d
or
export COMPOSE_PROFILES=profile_name
docker-compose up -d

2 or more profiles
docker-compose --profile profile_name1 --profile profile_name2 up -d

Profiles avail:
- profile-only: facade
- profile-dev-only: facade-dev
- balance: balance + mongo
- balance-dev: balance-dev + mongo
- account: account + mongo
- account-dev: account-dev + mongo
- products: products + mongo
- products-dev: products-dev + mongo
- mongo: mongo + balance + products + account
- mongo-dev: mongo + balance-dev + products-dev + account-dev
- facade: facade + balance + products + mongo + account
- facade-dev: facade-dev + balance-dev + products-dev + mongo + account-dev
- test: facade + balance +  products + mongo + loki + promtail + grafana
- dev: facade-dev + balance-dev +  products-dev + mongo + loki + promtail + grafana
- kafka: kafka + schema-registry + kowl
- kafdrop: kafdrop
- logs: loki + promtail + grafana
- full: all not dev services
- full-dev: all dev services
```

### [Build](https://docs.docker.com/engine/reference/commandline/compose_build/)

```bash
docker-compose build service_name
```

### Connection ports

```md
- Balance: 5000
- Products: 5001
- Account: 5002
- Facade: 3000
- Kafka: 29092
- Schema registry (kafka): 8081
- Kafdrop(UI for kafka): 9000
- Kowl(UI for kafka): 9001
- Grafana: 3001
- Mongodb: 2800
```

#### URls

- Grafana + loki url: <http://localhost:3001>
- Kafdrop url: <http://localhost:9000>
- [kowl  url](https://github.com/redpanda-data/console) : <http://localhost:9001>

#### Работа в режиме dev

- Не забыть скопировать файл example.env для каждого микросервиса в папку с микросервисом под именем .env
- Переходим в корень проекта и запускаем сервисы командой: docker-compose --profile profile_name up -d --build
