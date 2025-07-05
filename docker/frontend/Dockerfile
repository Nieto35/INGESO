# Imagen base de Node.js
FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache git

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de configuración
COPY frontend/package*.json ./
COPY frontend/.npmrc* ./

# Limpiar cache de npm e instalar dependencias
RUN npm cache clean --force && \
    npm install --verbose

# Copiar el resto de la aplicación
COPY frontend/ ./

# Establecer variables de entorno para Next.js desarrollo
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
ENV FAST_REFRESH=true
ENV WATCHPACK_POLLING=true

# Exponer puerto de Next.js
EXPOSE 3000

# Comando para desarrollo con hot reload
CMD ["npm", "run", "dev"]
