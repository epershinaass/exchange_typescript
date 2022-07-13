FROM node:14-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production=true --frozen-lockfile && \
    yarn cache clean && \
    yarn global add @nestjs/cli

COPY --from=builder /app/dist /app/dist

CMD [ "yarn", "start:prod" ]
