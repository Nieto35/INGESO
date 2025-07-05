#!/bin/bash

echo "🚀 Inicializando proyecto Laravel + React con Clerk Auth..."

# Crear directorios si no existen
mkdir -p backend frontend

# Copiar archivos de entorno
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env 2>/dev/null || echo "APP_NAME=prueba_API" > backend/.env
    echo "✅ Archivo backend/.env creado"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env 2>/dev/null || echo "REACT_APP_API_URL=http://backend:80" > frontend/.env
    echo "✅ Archivo frontend/.env creado"
fi

# Construir y levantar contenedores
echo "🐳 Construyendo contenedores Docker..."
docker-compose up -d --build

# Esperar a que los contenedores estén listos
echo "⏳ Esperando a que los servicios estén listos..."
sleep 45

# Instalar Laravel en el backend
echo "📦 Instalando Laravel en el backend..."
docker-compose exec backend composer create-project laravel/laravel . --prefer-dist --no-interaction

# Instalar dependencias adicionales para Clerk
echo "🔐 Instalando dependencias de autenticación..."
docker-compose exec backend composer require firebase/php-jwt guzzlehttp/guzzle

# Generar clave de aplicación
echo "🔑 Generando clave de aplicación..."
docker-compose exec backend php artisan key:generate

# Configurar Laravel para API
echo "🛠️ Configurando Laravel para API..."
docker-compose exec backend php artisan install:api

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones de base de datos..."
docker-compose exec backend php artisan migrate

# Instalar dependencias del frontend
echo "🎨 Instalando dependencias del frontend..."
docker-compose exec frontend npm install

# Configurar permisos del backend
echo "🔒 Configurando permisos..."
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache

echo "✨ ¡Proyecto Laravel + React con Clerk Auth listo!"
echo ""
echo "🔧 CONFIGURACIÓN REQUERIDA:"
echo "1. Crear cuenta en https://clerk.com"
echo "2. Crear una nueva aplicación"
echo "3. Obtener las claves de API"
echo "4. Configurar las variables de entorno:"
echo ""
echo "   📁 frontend/.env:"
echo "   REACT_APP_CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui"
echo ""
echo "   📁 backend/.env:"
echo "   CLERK_PUBLISHABLE_KEY=pk_test_tu_clave_aqui"
echo "   CLERK_SECRET_KEY=sk_test_tu_clave_aqui"
echo ""
echo "🌐 URLs disponibles:"
echo "  Frontend (React):     http://localhost:3000"
echo "  Backend API (Laravel): http://localhost:8000"
echo "  phpMyAdmin:           http://localhost:8080"
echo ""
echo "🔧 Comandos útiles:"
echo "  make logs-backend     # Ver logs del backend"
echo "  make logs-frontend    # Ver logs del frontend" 
echo "  make shell-backend    # Acceder al contenedor backend"
echo "  make shell-frontend   # Acceder al contenedor frontend"
echo "  make down             # Detener contenedores"
