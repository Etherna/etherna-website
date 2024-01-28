FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
WORKDIR /apps/cms
RUN pnpm run build
RUN pnpm run build --migrationsOnly

FROM directus/directus
ENV ADMIN_EMAIL="admin@example.com"
ENV ADMIN_PASSWORD="d1r3ctu5"
COPY --from=build ./apps/cms/snapshot.yaml ./snapshot.yaml
COPY --from=build ./apps/cms/extensions ./extensions
CMD node cli.js bootstrap && node cli.js database migrate:latest && node cli.js schema apply --yes ./snapshot.yaml && node cli.js start