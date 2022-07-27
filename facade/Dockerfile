FROM node:16-alpine as builder
WORKDIR /app
COPY package.json yarn.lock nest-cli.json ./
RUN yarn install --production=false --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
ADD https://raw.githubusercontent.com/epershinaass/exchange_typescript/get-balance/balance/src/proto/balance.proto ./src/balance/proto/balance.proto
RUN yarn build

FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock nest-cli.json ./
RUN yarn install --production=false --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli

COPY --from=builder /app/dist /app/dist

CMD [ "yarn", "start:prod" ]
