FROM php:8.3-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    supervisor

# Limpiar cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar extensiones PHP
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Establecer directorio de trabajo
WORKDIR /var/www/html

# Configurar Nginx para API
COPY docker/backend/nginx.conf /etc/nginx/sites-available/default

# Configurar Supervisor
COPY docker/backend/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copiar composer.json y composer.lock si existen
COPY backend/composer*.json ./

# Instalar dependencias PHP si existen
RUN if [ -f composer.json ]; then composer install --no-dev --optimize-autoloader --no-scripts; fi

# Copiar el resto de la aplicación
COPY backend/ ./

# Crear directorios necesarios para Laravel
RUN mkdir -p storage/logs \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/app \
    bootstrap/cache

# Configurar permisos de forma definitiva
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html \
    && chmod -R 775 storage bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# Crear script de inicialización para permisos
RUN echo '#!/bin/bash\n\
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache\n\
chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache\n\
exec "$@"' > /entrypoint.sh \
    && chmod +x /entrypoint.sh

# Exponer puerto
EXPOSE 80

# Usar entrypoint para asegurar permisos en cada inicio
ENTRYPOINT ["/entrypoint.sh"]

# Comando de inicio
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
