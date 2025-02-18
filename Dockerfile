FROM node:18-alpine as build

RUN apk add --no-cache libc6-compact

WORKDIR /app

COPY package.json pnpm-lock.yaml

RUN npm install -g corepack

RUN corepack enable pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:18-alpine

RUN apk update && apk upgrade && apk add dumb-init && adduser -D nextuser

WORKDIR /app

COPY --from=build --chown=nextuser:nextuser /app/public ./public
COPY --from=build --chown=nextuser:nextuser /app/.next/standalone ./
COPY --from=build --chown=nextuser:nextuser /app/.next/static ./.next/static

USER nextuser

EXPOSE 3000

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production

CMD ["dumb-init", "node", "server.js"]