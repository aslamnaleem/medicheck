# =========================================================
# Stage 1: Build the React Frontend (A temporary build environment)
# =========================================================
FROM node:20 AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package files for caching dependencies
COPY package*.json ./

# Copy the entire client directory (assuming React code is here)
COPY client/ ./client

# Install dependencies (NodeJS/React)
RUN npm install

# Build the React application. This outputs files to 'client/build'
RUN npm run build

# =========================================================
# Stage 2: Run the NodeJS Server (The final, smaller image)
# =========================================================
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy server-side package files
COPY package*.json ./

# Install production dependencies only for the server
RUN npm install --production

# Copy the server code (assuming server logic is in the 'server' folder)
COPY server/ ./server

# Copy the built React assets from Stage 1 into the server's public folder
# Adjust 'client/build' if your React build output folder is named differently
COPY --from=build-stage /app/client/build /app/server/public

# Expose the port (Cloud Run defaults to 8080)
EXPOSE 8080

# Start the NodeJS server (Ensure your server.js listens on process.env.PORT)
CMD ["node", "server/server.js"]