


#-------------------------------------------------------------


FROM node:18-alpine AS base

RUN npm i -g pnpm

# The web Dockerfile is copy-pasted into our main docs at /docs/handbook/deploying-with-docker.
# Make sure you update this Dockerfile, the Dockerfile in the web workspace and copy that over to Dockerfile in the docs.

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN pnpm global add turbo
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and its dependencies
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# Uncomment and use build args to enable remote caching
# ARG TURBO_TEAM
# ENV TURBO_TEAM=$TURBO_TEAM

# ARG TURBO_TOKEN
# ENV TURBO_TOKEN=$TURBO_TOKEN

RUN pnpm turbo run build --filter=api...

FROM base AS runner
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 expressjs
RUN adduser --system --uid 1001 expressjs
USER expressjs
COPY --from=installer /app .

CMD ["pnpm", "run", "dev"]



#--------------------------------------------------------



# FROM node:18-alpine

# RUN npm i -g pnpm

# WORKDIR /app

# COPY . .

# RUN pnpm install

# CMD ["pnpm", "run", "dev"]

# COPY ["../../packages/eslint-config-custom-server/package.json", "./"]

# FROM node:18-alpine AS base

# RUN npm i -g pnpm

# FROM base AS dependencies

# WORKDIR /app
# COPY package.json ./
# RUN pnpm install

# FROM base AS build


# WORKDIR /app
# COPY . .
# COPY --from=dependencies /app/node_modules ./node_modules
# RUN pnpm build
# RUN pnpm prune --prod

# FROM base AS deploy
# COPY --from=build /app/dist/ ./dist/
# COPY --from=build /app/node_modules ./node_modules

# CMD ["node", "dist/main.js"]