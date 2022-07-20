FROM node:16-alpine as builder
WORKDIR /app
COPY package.json yarn.lock nest-cli.json ./

RUN yarn install  && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM node:16
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install  && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY tsconfig.json tsconfig.build.json ./

COPY --from=builder /app/dist /app/dist

CMD [ "yarn", "start" ]

