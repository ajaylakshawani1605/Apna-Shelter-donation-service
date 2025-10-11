# Use the official Node.js 18 image
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies and build the frontend
COPY package.json package-lock.json* ./
COPY pnpm-lock.yaml* ./
RUN npm ci --silent || true

# Copy source
COPY . .

# Build the frontend (Vite)
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what we need
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.cjs ./server.cjs
COPY --from=builder /app/src/models ./src/models

EXPOSE 5000
CMD ["node", "server.cjs"]
