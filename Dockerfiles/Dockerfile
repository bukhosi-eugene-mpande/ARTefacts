# Base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on lockfiles
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# =================== 🔥 ADD HERE: Build-time environment injection ===================

# Accept build-time arguments for NEXT_PUBLIC variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_USER_POOL_ID
ARG NEXT_PUBLIC_USER_POOL_CLIENT_ID
ARG NEXT_PUBLIC_AWS_COGNITO_REGION
ARG NEXT_PUBLIC_DOMAIN
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID

# Pass them into environment so Next.js can see them
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_USER_POOL_ID=$NEXT_PUBLIC_USER_POOL_ID
ENV NEXT_PUBLIC_USER_POOL_CLIENT_ID=$NEXT_PUBLIC_USER_POOL_CLIENT_ID
ENV NEXT_PUBLIC_AWS_COGNITO_REGION=$NEXT_PUBLIC_AWS_COGNITO_REGION
ENV NEXT_PUBLIC_DOMAIN=$NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID

# ===============================================================================

# Build app with the injected environment
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image
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
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
