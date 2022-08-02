# exchange_typescript

## Environment quick setup

### Prerequisites

- Docker [Linux install](https://github.com/epershinaass/exchange_typescript/blob/main/infra/installation-scripts/installation-linux.sh)

- Docker [Windows/mac download](https://www.docker.com/get-started/)
- Docker-compose

### Run

```bash
docker-compose --profile full up -d --build
```

### Stop

```bash
docker-compose --profile full down
```

### [Profiles](https://docs.docker.com/engine/reference/commandline/compose_up/)

```bash
docker-compose --profile profile_name up -d
or
export COMPOSE_PROFILES=profile_name
docker-compose up -d

Profiles avail:
- balance: balance + mongo + kafka
- mongo: mongo + balance
- facade: facade + balance
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
