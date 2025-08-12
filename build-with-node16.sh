#!/bin/bash
# Bash script to build with Node 16 compatibility
# This script sets the NODE_OPTIONS environment variable to use legacy OpenSSL provider

echo "Building Gridsome site with Node.js compatibility settings..."

# Set the NODE_OPTIONS environment variable
export NODE_OPTIONS="--openssl-legacy-provider"

# Clean previous build
if [ -d "./dist" ]; then
    echo "Cleaning previous build..."
    rm -rf ./dist
fi

# Install dependencies if needed
echo "Installing dependencies..."
npm install

# Run the build
echo "Building the site..."
npm run build

if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    echo "The site has been built to the ./dist directory"
else
    echo "Build failed. Please check the error messages above."
    exit 1
fi