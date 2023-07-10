FROM --platform=$TARGETPLATFORM node:18.16.1 AS base

######################
# Dependency installer
######################
FROM --platform=$TARGETPLATFORM base AS deps
WORKDIR /app
COPY web/package.json web/yarn.lock ./
RUN yarn --network-timeout 600000 --frozen-lockfile --no-progress


#####################
# Source code builder
#####################
FROM --platform=$TARGETPLATFORM base AS builder
WORKDIR /app
COPY ./web .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build


####################
# Application runner
####################
FROM --platform=$TARGETPLATFORM base AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 80

ENV PORT 80

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# HEALTHCHECK --interval=5s --timeout=5s --start-period=10s --retries=10 CMD curl --fail http://localhost/api/healthcheck/349bec8b72 || exit 1

CMD ["--require", "node_modules/.bin/next", "start", "-p", "80"]
