FROM node:20-alpine AS build
RUN apk add --no-cache --virtual build-dependencies build-base gcc python3
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN corepack enable
RUN pnpm install --force --frozen-lockfile
RUN pnpm run build:cms

FROM directus/directus
USER node
ENV ADMIN_EMAIL="admin@example.com"
ENV ADMIN_PASSWORD="d1r3ctu5"
COPY --from=build ./usr/src/app/apps/cms/snapshot.yaml ./snapshot.yaml
COPY --from=build ./usr/src/app/apps/cms/extensions ./extensions
COPY --from=build ./usr/src/app/apps/cms/migrations ./migrations
RUN mkdir -p uploads
RUN chown -R node:node uploads
CMD node cli.js bootstrap && node cli.js database migrate:latest && node cli.js start