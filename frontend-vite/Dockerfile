# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Add build argument for artifacts path
ARG BLOCKCHAIN_ARTIFACTS_PATH

# Copy package files
COPY frontend-vite/package*.json ./

# Install dependencies
RUN npm install

# Copy frontend project files
COPY frontend-vite/ .

# Create directory for blockchain artifacts
RUN mkdir -p /blockchain-hardhat/artifacts

# Copy blockchain artifacts if they exist
COPY blockchain-hardhat/artifacts/ /blockchain-hardhat/artifacts/

# Build the project
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY frontend-vite/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 