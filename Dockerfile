# Use the official Node.js 18 image with build tools
FROM node:24-bullseye

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory, excluding node_modules
COPY . ./

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "develop"]

# Map the local "blog" directory to the container's "blog" directory at runtime
VOLUME ["/usr/src/app/blog"]
