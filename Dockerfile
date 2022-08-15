FROM node:16-alpine as builder
USER node
WORKDIR /app
COPY --chown=1000:1000 package.json yarn.lock nest-cli.json ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY --chown=1000:1000 tsconfig.json tsconfig.build.json ./
COPY --chown=1000:1000 src ./src
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

