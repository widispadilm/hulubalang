FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx turbo run build --filter=api

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma

# Install production dependencies for workspace
RUN npm install --omit=dev --workspace=api

# Generate prisma client
RUN npx prisma generate --schema=./apps/api/prisma/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "start:prod", "--workspace=api"]
