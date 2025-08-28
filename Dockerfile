ARG NODE_IMAGE=node:22-bookworm-slim
ARG DISTROLESS_IMAGE=gcr.io/distroless/nodejs22-debian12

FROM ${NODE_IMAGE} AS deps
WORKDIR /app
RUN corepack enable

RUN mkdir -p /pnpm/store && pnpm config set store-dir /pnpm/store
COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch

FROM ${NODE_IMAGE} AS build
WORKDIR /app
RUN corepack enable

RUN apt-get update -y && apt-get install -y --no-install-recommends openssl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /pnpm/store && pnpm config set store-dir /pnpm/store
COPY --from=deps /pnpm/store /pnpm/store

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY prisma ./prisma
COPY src ./src

RUN pnpm install --offline
RUN pnpm prisma generate
RUN pnpm run tsc --noEmit
RUN pnpm run build
RUN pnpm prune --prod

FROM ${DISTROLESS_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json ./

CMD ["/app/dist/main.js"]
