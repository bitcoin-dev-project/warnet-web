# Use an official Node runtime as the base image
FROM node:20

# Copy the entire monorepo (we'll use .dockerignore to filter)
COPY . /app

# Set the working directory to the server directory
WORKDIR /app/server

# Install dependencies in the server directory
RUN npm install

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start"]