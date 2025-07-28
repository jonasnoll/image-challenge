FROM node:22-alpine AS base
WORKDIR /app

# Copy package files
COPY package*.json ./

# Build stage
FROM base AS builder
# Install all dependencies including dev dependencies
RUN npm ci --workspaces=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM base AS production
# Install only production dependencies
RUN npm ci --only=production --workspaces=false

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Create database directory
RUN mkdir -p /app/database

EXPOSE 3030

# Start the application
CMD ["node", "./dist/src/main.js"] 