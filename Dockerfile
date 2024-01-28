FROM node:21-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS repo
COPY . .

FROM repo AS prod
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM repo AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
WORKDIR /apps/cms
RUN pnpm run build
RUN pnpm run build --migrationsOnly

FROM base
COPY --from=prod ./apps/cms/package.json /app/package.json
COPY --from=prod ./apps/cms/node_modules /app/node_modules
COPY --from=prod ./apps/cms/snapshot.yaml /app/snapshot.yaml
COPY --from=prod ./apps/cms/startup.sh /app/startup.sh
COPY --from=build ./apps/cms/extensions /app/extensions
WORKDIR /app
ENTRYPOINT ["startup.sh"]