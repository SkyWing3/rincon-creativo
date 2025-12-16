#!/bin/sh

# Exit on error
set -e

# Copy .env if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example"
    cp .env.example .env
fi

# Install PHP dependencies if missing
if [ ! -d "vendor" ]; then
    echo "Installing PHP dependencies..."
    composer install --no-interaction --prefer-dist --optimize-autoloader
fi

# Install Node dependencies and build if missing
if [ ! -d "node_modules" ] || [ ! -d "public/build" ]; then
    echo "Installing Node dependencies and building assets..."
    npm install
    npm run build
fi

# Generate APP_KEY if it's not set
if grep -q "APP_KEY=$" .env || grep -q "APP_KEY=" .env | grep -v "base64"; then
    echo "Generating APP_KEY"
    php artisan key:generate
fi

# Wait for database to be ready
echo "Waiting for database..."
# Loop until we can connect to the database (assuming mysql)
# We use 'db' as the hostname from docker-compose
# Retries 30 times with 1s sleep
until nc -z -v -w30 db 3306
do
  echo "Waiting for database connection..."
  sleep 5
done

echo "Database is ready!"

# Run migrations
echo "Running migrations..."
php artisan migrate --force

echo "Starting application..."
exec "$@"
