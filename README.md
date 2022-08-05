# exchange_typescript

## Environment quick setup

### Prerequisites

- Docker [Linux install](https://github.com/epershinaass/exchange_typescript/blob/main/infra/installation-scripts/installation-linux.sh)

- Docker [Windows/mac download](https://www.docker.com/get-started/)
- Docker-compose

### Run

```bash
docker-compose --profile dev up -d --build
```

### Stop

```bash
docker-compose --profile dev down
```

### [Profiles](https://docs.docker.com/engine/reference/commandline/compose_up/)

```bash
docker-compose --profile profile_name up -d
or
export COMPOSE_PROFILES=profile_name
docker-compose up -d

Profiles avail:
- balance: balance + mongo + kafka
- products: products + mongo + kafka
- mongo: mongo + balance + products
- facade: facade + balance + mongo + products
- dev: facade + balance + mongo + loki + promtail + grafana + products
- kafka: kafka + schema-registry + kafdrop
- logs: loki + promtail + grafana
- full: all services
```

### [Build](https://docs.docker.com/engine/reference/commandline/compose_build/)

```bash
docker-compose build service_name
```

### Connection ports

```md
- Balance: 5000
- Products: 5001
- Facade: 3000
- Kafka: 29092
- Schema registry (kafka): 8081
- Kafdrop(UI for kafka): 9000
- Grafana: 3001
- Mongodb: 27017
```

#### URls

- Grafana + loki url: <http://localhost:3001>
- Kafdrop url: <http://localhost:9000>

#### Работа в режиме dev

- Не забыть скопировать файл example.env для каждого микросервиса в папку с микросервисом под именем .env
- Переходим в корень проекта и запускаем сервисы командой: docker-compose --profile profile_name up -d --build
- Чтобы перейти в режим prod: DOCKER_FILENAME=Dockerfile docker-compose --profile profile_name up -d --build
