FROM node:16-alpine as builder
USER node
WORKDIR /app
COPY --chown=1000:1000 package.json yarn.lock nest-cli.json ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY --chown=1000:1000 tsconfig.json tsconfig.build.json ./
COPY --chown=1000:1000 src ./src
ADD --chown=1000:1000 https://raw.githubusercontent.com/epershinaass/exchange_typescript/main/balance/src/proto/balance.proto ./src/balance/proto/balance.proto
ADD --chown=1000:1000 https://raw.githubusercontent.com/epershinaass/exchange_typescript/main/products/src/proto/products.proto ./src/products/proto/products.proto
RUN yarn build

FROM node:16-alpine
USER node
WORKDIR /app
COPY --chown=1000:1000 package.json yarn.lock nest-cli.json ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli

COPY --from=builder --chown=1000:1000 /app/dist /app/dist

CMD [ "yarn", "start:prod" ]
