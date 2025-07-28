# Build react app
FROM node:22-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
# Install dependencies (dev as well for vite and co)
RUN npm ci --workspaces=false

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# Copy compiled react files
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Run it
CMD ["nginx", "-g", "daemon off;"] 