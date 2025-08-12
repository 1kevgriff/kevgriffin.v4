# PowerShell script to build with Node 16 compatibility
# This script sets the NODE_OPTIONS environment variable to use legacy OpenSSL provider

Write-Host "Building Gridsome site with Node.js compatibility settings..." -ForegroundColor Green

# Set the NODE_OPTIONS environment variable for this session
$env:NODE_OPTIONS = "--openssl-legacy-provider"

# Clean previous build
if (Test-Path ".\dist") {
    Write-Host "Cleaning previous build..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".\dist"
}

# Install dependencies if needed
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Run the build
Write-Host "Building the site..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build completed successfully!" -ForegroundColor Green
    Write-Host "The site has been built to the ./dist directory" -ForegroundColor Green
} else {
    Write-Host "Build failed. Please check the error messages above." -ForegroundColor Red
}