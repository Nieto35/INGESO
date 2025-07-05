# Sistema de prueba - Frontend + Backend

Un sistema de prueba moderno con **arquitectura separada**:
- **Backend**: Laravel 11 API (Puerto 8000)
- **Frontend**: React 18 SPA (Puerto 3000)
- **Comunicación**: Entre contenedores por nombres de servicio Docker

## 🏗️ Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │    Database     │
│   (React)       │◄──►│  (Laravel API)  │◄──►│    (MySQL)      │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🚀 Inicio Rápido

### Prerequisitos
- Docker
- Docker Compose
- Make (opcional, para comandos simplificados)

### Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd pruebas
   ```

2. **Opción 1: Instalación automática (recomendado)**
   ```bash
   make install
   # o
   chmod +x init.sh && ./init.sh
   ```

3. **Opción 2: Instalación manual**
   ```bash
   # Construir y levantar contenedores
   docker-compose up -d --build
   
   # Instalar Laravel en backend
   docker-compose exec backend composer create-project laravel/laravel . --prefer-dist
   
   # Configurar Laravel para API
   docker-compose exec backend php artisan key:generate
   docker-compose exec backend php artisan install:api
   
   # Instalar dependencias del frontend
   docker-compose exec frontend npm install
   
   # Ejecutar migraciones
   docker-compose exec backend php artisan migrate
   ```

## 🌐 Acceso

- **Frontend (React)**: http://localhost:3000
- **Backend API (Laravel)**: http://localhost:8000
  - Usuario: `laravel`
  - Contraseña: `userpassword`

## 📋 Comandos Útiles

### Con Make (recomendado)
```bash
make help              # Mostrar todos los comandos disponibles
make up                # Levantar contenedores
make down              # Detener contenedores
make logs              # Ver logs de todos los servicios
make logs-backend      # Ver logs del backend
make logs-frontend     # Ver logs del frontend
make shell-backend     # Acceder al contenedor backend
make shell-frontend    # Acceder al contenedor frontend
make migrate           # Ejecutar migraciones
make fresh             # Reinstalar desde cero
```

### Con Docker Compose
```bash
# Gestión de contenedores
docker-compose up -d                    # Levantar contenedores
docker-compose down                     # Detener contenedores
docker-compose logs -f backend          # Ver logs del backend
docker-compose logs -f frontend         # Ver logs del frontend

# Backend (Laravel API)
docker-compose exec backend bash                    # Acceder al contenedor
docker-compose exec backend php artisan migrate     # Ejecutar migraciones
docker-compose exec backend php artisan route:list  # Listar rutas API

# Frontend (React)
docker-compose exec frontend sh                     # Acceder al contenedor
docker-compose exec frontend npm install            # Instalar dependencias
docker-compose exec frontend npm start              # Modo desarrollo
```

## 🗄️ Base de Datos

### Configuración MySQL
- **Host**: `localhost:3306` (desde host) o `db:3306` (desde contenedores)
- **Base de datos**: `prueba`
- **Usuario**: `laravel`
- **Contraseña**: `userpassword`
- **Root password**: `rootpassword`

### Comandos de Base de Datos
```bash
# Ejecutar migraciones
make artisan cmd="migrate"

# Crear migración
make artisan cmd="make:migration create_invoices_table"

# Crear seeder
make artisan cmd="make:seeder InvoiceSeeder"

# Ejecutar seeders
make seed
```

## 🛠️ Desarrollo

### Backend (Laravel API)
```bash
# Crear controlador API
make artisan cmd="make:controller Api/InvoiceController --api"

# Crear modelo con migración
make artisan cmd="make:model Invoice -m"

# Crear middleware
make artisan cmd="make:middleware CheckInvoiceAccess"

# Limpiar cache
make artisan cmd="cache:clear"

# Listar rutas API
make artisan cmd="route:list"
```

### Frontend (React)
```bash
# Instalar paquete
make npm cmd="install axios"

# Actualizar dependencias
make npm cmd="update"

# Ejecutar tests
make test-frontend

# Build para producción
make npm cmd="run build"
```

### Comandos Composer (Backend)
```bash
# Instalar paquete
make composer cmd="require spatie/laravel-permission"

# Actualizar dependencias
make composer cmd="update"
```

## � Comunicación entre Contenedores

Los contenedores se comunican usando nombres de servicio:

- **Frontend → Backend**: `http://backend:80/api`
- **Backend → Database**: `mysql://db:3306`

### Ejemplo de llamada API desde React:
```javascript
// En el frontend
const response = await axios.get('/api/invoices');
// Se resuelve automáticamente a: http://backend:80/api/invoices
```

### Configuración de Proxy en React:
El `package.json` del frontend incluye: `"proxy": "http://backend:80"`

## 📁 Estructura del Proyecto

```
pruebas/
├── backend/                    # API Laravel
│   ├── app/                    # Lógica de la aplicación
│   ├── database/               # Migraciones y seeders
│   ├── routes/                 # Rutas API
│   ├── composer.json           # Dependencias PHP
│   └── .env.example           # Variables de entorno
├── frontend/                   # SPA React
│   ├── src/                    # Código fuente React
│   ├── public/                 # Archivos públicos
│   └── package.json           # Dependencias Node.js
├── docker/                     # Configuraciones Docker
│   ├── backend/               # Configuración Laravel
│   │   ├── Dockerfile         # Imagen Laravel
│   │   ├── nginx.conf         # Configuración Nginx API
│   │   ├── php.ini            # Configuración PHP
│   │   └── supervisord.conf   # Supervisor
│   └── frontend/              # Configuración React
│       ├── Dockerfile         # Imagen React
│       └── nginx.conf         # Configuración Nginx Frontend
├── docker-compose.yml         # Orquestación de servicios
├── Makefile                   # Comandos simplificados
├── init.sh                    # Script de instalación
└── README.md                  # Este archivo
```

## 🔧 Configuración Avanzada

### Variables de Entorno

**Backend (.env)**:
```bash
APP_NAME="prueba API"
APP_URL=http://localhost:8000
DB_HOST=db
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000,127.0.0.1:3000
```

**Frontend (variables de entorno)**:
```bash
REACT_APP_API_URL=http://backend:80
```

### Volúmenes Docker
Los datos se persisten en:
- `mysql_data`: Datos de MySQL
- `./backend`: Código Laravel montado
- `./frontend`: Código React montado
- `/app/node_modules`: Dependencias Node.js en volumen anónimo

## 🔐 Seguridad y CORS

El backend está configurado con:
- **Laravel Sanctum** para autenticación API
- **CORS** habilitado para el frontend
- **Rutas API** protegidas y públicas

### Rutas API Ejemplo:
```bash
# Públicas
GET  /api/health          # Estado de la API
POST /api/register        # Registro de usuarios
POST /api/login           # Login

# Protegidas (requieren token)
GET    /api/invoices      # Listar pruebas
POST   /api/invoices      # Crear prueba
PUT    /api/invoices/{id} # Actualizar prueba
DELETE /api/invoices/{id} # Eliminar prueba
```

## 🐛 Solución de Problemas

### Permisos Backend
```bash
# Arreglar permisos de storage
docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache
```

### Reinstalar desde cero
```bash
make fresh
```

### Problemas de conexión API
```bash
# Verificar que los contenedores estén corriendo
docker-compose ps

# Ver logs del backend
make logs-backend

# Ver logs del frontend
make logs-frontend

# Verificar conectividad entre contenedores
docker-compose exec frontend ping backend
```

### Problemas con dependencias
```bash
# Reinstalar dependencias del backend
docker-compose exec backend composer install

# Reinstalar dependencias del frontend
docker-compose exec frontend npm install
```

### Cache y optimización
```bash
# Limpiar cache del backend
make artisan cmd="cache:clear"
make artisan cmd="config:clear"
make artisan cmd="route:clear"

# Optimizar para producción
make artisan cmd="config:cache"
make artisan cmd="route:cache"
```

## 🚀 Despliegue en Producción

### Variables de entorno de producción
```bash
# Backend
APP_ENV=production
APP_DEBUG=false
APP_URL=https://api.tudominio.com

# Frontend
REACT_APP_API_URL=https://api.tudominio.com
```

### Build para producción
```bash
# Frontend
make npm cmd="run build"

# Backend (optimizaciones)
make composer cmd="install --optimize-autoloader --no-dev"
make artisan cmd="config:cache"
make artisan cmd="route:cache"
```

## 📝 Tecnologías Utilizadas

- **Backend**: PHP 8.3, Laravel 11, MySQL 8.0, Nginx
- **Frontend**: Node.js 18, React 18, Axios
- **DevOps**: Docker, Docker Compose, Supervisor
- **Base de Datos**: MySQL 8.0, phpMyAdmin

## 📝 Licencia

Este proyecto está bajo la licencia MIT.
