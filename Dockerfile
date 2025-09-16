FROM php:8.3-fpm

# Rendszer csomagok + szükséges PHP extension-ök
RUN apt-get update && apt-get install -y \
    curl zip unzip git libpng-dev libjpeg-dev libfreetype6-dev \
    libonig-dev libxml2-dev libzip-dev libpq-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Composer telepítése
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Node.js + npm telepítése (frontend buildhez, pl. Vite)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

WORKDIR /var/www

# Laravel futtatása php-fpm-mel
CMD ["php-fpm"]