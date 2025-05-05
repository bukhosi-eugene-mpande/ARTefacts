# ======================== Base image ========================
FROM node:18-alpine AS base

# ======================== Dependency layer ========================
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package manager files first to cache dependencies
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

# Install dependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ======================== Builder layer ========================
FROM base AS builder
WORKDIR /app

# ----------------- Build-time ENV injection -----------------
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_USER_POOL_ID
ARG NEXT_PUBLIC_USER_POOL_CLIENT_ID
ARG NEXT_PUBLIC_AWS_COGNITO_REGION
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_USER_POOL_ID=$NEXT_PUBLIC_USER_POOL_ID
ENV NEXT_PUBLIC_USER_POOL_CLIENT_ID=$NEXT_PUBLIC_USER_POOL_CLIENT_ID
ENV NEXT_PUBLIC_AWS_COGNITO_REGION=$NEXT_PUBLIC_AWS_COGNITO_REGION
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
# ------------------------------------------------------------

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# ======================== Runtime image ========================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
