# Inicializacion Frontend
npm install --legacy-peer-deps

npm run dev

# Inicializacion Backend
composer install

cp .env.example .env
    
php artisan key:generate

php artisan migrate

php artisan serve