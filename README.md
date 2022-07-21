# exchange_typescript

### Usage docker compose

- В файле docker-compose.yaml описаны сервисы для локальной разработки. 
- Перечень доступных сервисов: 
  - mongo (параметр в команде запуска: `mongo`)
  - zookeeper (параметр в команде запуска: `zoo1`)
  - kafka (параметр в команде запуска: `kafka1`)
  - loki (параметр в команде запуска: `loki`)
  - promtail (параметр в команде запуска: `promtail`)
  - grafana (параметр в команде запуска: `grafana`)
- Запуск всех сервисов одновременно: `docker-compose up -d --build` [подробнее](https://docs.docker.com/engine/reference/commandline/compose_up/)
- Если нужды в запуске одновременно всех контейнеров нет, то можно:
  - указывать отдельные сервисы для запуска. Например нужно запустить только сервисы kafka+zookeeper: `docker-compose up -d kafka1 zoo1`
  - Указывать профили: `docker-compose up -d logs` [подробнее](https://docs.docker.com/compose/profiles/). На данный момент доступныt профили:
    - mongo - mongo
    - kafkamng - kafka, zookeeper, kafka connect, mongo
    - kafkafull - kafka, zookeeper, schema registry, kafka connect
    - full - все контейнеры
    - logs - promtail, loki, grafana
- Флаг `--build` используется, если нужно собирать образы из dockerfile.
- В каждой папке с кодом для сборки в образ должен быть файл .dockerignore, в котором указаны файлы/папки. [подробнее](https://www.tutorialspoint.com/using-dockerignore-file)
- Возможно версионирование собираемых образов через переменные (по-умолчанию версии 0.1.0). Например: `BALANCE_VERSION=0.2.1 docker-compose up -d --build balance`
