# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY frontend-vite/package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY frontend-vite/ .

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 