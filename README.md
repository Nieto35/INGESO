# INGESO - Sistema de Gestión de Usuarios

Sistema completo de gestión de usuarios con backend Laravel y frontend React, desarrollado con Docker.

## 🚀 Características

- **Backend Laravel**: API REST con arquitectura DDD
- **Frontend React**: Interfaz moderna con Tailwind CSS
- **Docker**: Desarrollo y despliegue simplificado
- **Gestión de usuarios**: CRUD completo con paginación y búsqueda
- **Responsive**: Interfaz adaptable a diferentes dispositivos

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/Nieto35/INGESO.git
cd INGESO
```

### 2. Levantar los servicios con Docker

```bash
docker-compose up -d --build
```

### 3. Instalar dependencias del backend

```bash
docker-compose exec backend composer install
```

### 4. Instalar dependencias del frontend

```bash
docker-compose exec frontend npm install
```

### 5. Esperar a que los servicios estén listos

El proceso puede tomar unos minutos la primera vez. Los servicios estarán disponibles en:

## 🌐 Acceso a la aplicación

### Backend (Laravel API)
- **URL**: [http://localhost:8000](http://localhost:8000)
- **Documentación API**: Los endpoints principales están disponibles en `/api/`

### Frontend (React)
- **URL**: [http://localhost:3000](http://localhost:3000)
- **Interfaz de usuario**: Sistema completo de gestión de usuarios

## 📁 Estructura del Proyecto

```
├── backend/                 # Backend Laravel
│   ├── app/                # Controladores y modelos
│   ├── src/                # Arquitectura DDD
│   ├── routes/             # Rutas API
│   └── ...
├── frontend/               # Frontend React
│   ├── src/                # Componentes React
│   ├── public/             # Archivos estáticos
│   └── ...
├── docker/                 # Configuración Docker
├── docker-compose.yml      # Orquestación de servicios
└── Makefile               # Comandos útiles
```

## 🔧 Comandos Útiles

### Usando Make (recomendado)

```bash
# Ver todos los comandos disponibles
make help

# Levantar servicios
make up

# Ver logs
make logs

# Acceder al shell del backend
make shell-backend

# Acceder al shell del frontend
make shell-frontend

# Ejecutar migraciones
make migrate
```

### Usando Docker Compose directamente

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Ejecutar comando en el backend
docker-compose exec backend php artisan [comando]

# Ejecutar comando en el frontend
docker-compose exec frontend npm [comando]
```

## 🗃️ Base de Datos

La base de datos se configura automáticamente con:
- **Motor**: MySQL
- **Puerto**: 3306
- **Base de datos**: `ingeso_db`
- **Usuario**: `ingeso_user`
- **Las migraciones se ejecutan automáticamente**

## 🎯 Funcionalidades

### Sistema de Usuarios
- ✅ Lista paginada de usuarios
- ✅ Búsqueda por nombre, DNI, email o teléfono
- ✅ Agregar nuevos usuarios
- ✅ Editar usuarios existentes
- ✅ Interfaz moderna y responsive
- ✅ Avatares generados automáticamente

### API Backend
- ✅ `GET /api/user/table` - Listar usuarios con paginación
- ✅ `POST /api/user/create` - Crear nuevo usuario
- ✅ `PUT /api/user/update` - Actualizar usuario
- ✅ Búsqueda y filtrado de usuarios

## 🚧 Desarrollo

### Estructura del Backend (Laravel)
- **Arquitectura DDD**: Dominio, Aplicación, Infraestructura
- **Value Objects**: Validación de datos
- **Repositorios**: Patrón Repository
- **Servicios**: Lógica de negocio

### Estructura del Frontend (React)
- **Hooks personalizados**: Gestión de estado
- **Componentes modulares**: Reutilizable y mantenible
- **Tailwind CSS**: Estilos modernos
- **Gestión de formularios**: Validación y envío

## 🐛 Solución de Problemas

### Los servicios no se levantan
1. Verificar que Docker esté corriendo
2. Verificar que los puertos 3000 y 8000 estén libres
3. Ejecutar `docker-compose down` y luego `docker-compose up -d --build`

### Error de permisos
```bash
# En el directorio del proyecto
sudo chown -R $USER:$USER .
```

### Limpiar y reinstalar
```bash
# Detener y limpiar todo
docker-compose down -v
docker system prune -a

# Volver a construir
docker-compose up -d --build
```

## 📝 Notas

- El proyecto está optimizado para desarrollo local
- Los cambios en el código se reflejan automáticamente
- La base de datos persiste entre reinicios
- Los logs están disponibles con `make logs`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**Desarrollado con ❤️ usando Laravel + React + Docker**