FROM node:21-slim AS base

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/cms/package.json ./apps/cms/
COPY packages/payload-plugin-scheduler/package.json ./packages/payload-plugin-scheduler/
COPY packages/eslint-config-custom/package.json ./packages/eslint-config-custom/
COPY packages/tsconfig/package.json ./packages/tsconfig/
RUN corepack enable pnpm && pnpm i --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/cms/node_modules ./apps/cms/node_modules
COPY --from=deps /app/packages/payload-plugin-scheduler/node_modules ./packages/payload-plugin-scheduler/node_modules
COPY --from=deps /app/packages/eslint-config-custom/node_modules ./packages/eslint-config-custom/node_modules
COPY --from=deps /app/packages/tsconfig/node_modules ./packages/tsconfig/node_modules
COPY . .
ENV SKIP_ENV_VALIDATION=true
RUN corepack enable pnpm && pnpm run build --filter cms

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone/node_modules ./node_modules
WORKDIR /app/apps/cms
RUN mkdir .next
RUN mkdir uploads
RUN chown nextjs:nodejs .next
RUN chown nextjs:nodejs uploads
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/standalone/apps/cms ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/cms/.next/static ./.next/static
RUN if ! [ -f ./server.js ]; then echo 'server.js is missing'; exit 1; fi

USER nextjs
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME="0.0.0.0"
CMD node server.js