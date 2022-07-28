FROM node:16-alpine as builder
WORKDIR /app
COPY package.json yarn.lock nest-cli.json ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build
# ARG buildDate=today
# LABEL buildDate=${buildDate}

FROM node:16-alpine
WORKDIR /app
COPY package.json yarn.lock nest-cli.json ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli

COPY --from=builder /app/dist /app/dist

CMD [ "yarn", "start:prod" ]
# ARG buildDate=today
# LABEL buildDate=${buildDate}