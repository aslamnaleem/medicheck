# Stage 1: Build the React/Vite frontend
FROM node:20 AS build

WORKDIR /app

# Copy package files and install ALL dependencies (including devDependencies needed for build)
COPY package*.json ./
RUN npm ci

# Copy all source files and build the frontend
COPY . .
RUN npm run build

# Stage 2: Production server
FROM node:18-alpine

WORKDIR /app

# Create server directory
RUN mkdir -p server/public

# Copy package files and install ONLY production dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the Express server file
COPY server/server.js ./server/

# Copy the built frontend assets from Stage 1 into server/public
COPY --from=build /app/dist ./server/public

# Expose port 8080 (Cloud Run requirement)
EXPOSE 8080

# Set working directory to server folder and start the Express server
WORKDIR /app/server
CMD ["node", "server.js"]