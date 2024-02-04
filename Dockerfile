FROM node:latest AS build
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --force --frozen-lockfile
RUN pnpm run build:cms

FROM directus/directus
ENV ADMIN_EMAIL="admin@example.com"
ENV ADMIN_PASSWORD="d1r3ctu5"
COPY --from=build ./usr/src/app/apps/cms/snapshot.yaml ./snapshot.yaml
COPY --from=build ./usr/src/app/apps/cms/extensions ./extensions
CMD node cli.js bootstrap && node cli.js database migrate:latest && node cli.js schema apply --yes ./snapshot.yaml && node cli.js start