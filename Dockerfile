# Use the official Node.js image as the base image
FROM node:18-alpine AS build-stage

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Nginx image to serve the built application
FROM nginx:alpine AS production-stage

# Copy the built application from the build stage to the Nginx HTML directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]