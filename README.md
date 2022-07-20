# exchange_typescript

### Usage docker compose

- В файле docker-compose.yaml описаны сервисы для локальной разработки. Запуск всех сервисов одновременно: `docker-compose up -d --build` [подробнее](https://docs.docker.com/engine/reference/commandline/compose_up/)
- Если нужды в запуске одновременно всех контейнеров нет, то можно указывать отдельные сервисы для запуска.
  - Например нужно запустить только сервисы kafka+zookeeper: `docker-compose up -d kafka1 zoo1`.
- Флаг `--build` используеться, если нужно собирать образы из dockerfile. На данный момент такой нужен для сервиса kafka-connect. В дальнейшем для сборки из папок приложения.
- В каждой папке с кодом для сборки в образ должен быть файл .dockerignore, в котором указаны файлы/папки. [подробнее](https://www.tutorialspoint.com/using-dockerignore-file)
- Возможно версионирование собираемых образов через переменные (по-умолчанию версии 0.1.0). Например: `BALANCE_VERSION=0.2.1 docker-compose up -d --build balance`
