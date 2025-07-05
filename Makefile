.PHONY: help build up down restart logs logs-backend logs-frontend shell-backend shell-frontend install fresh migrate seed artisan composer test

help: ## Mostrar esta ayuda
	@echo "Comandos disponibles:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Construir contenedores
	docker-compose build

up: ## Levantar contenedores
	docker-compose up -d

down: ## Detener contenedores
	docker-compose down

restart: ## Reiniciar contenedores
	docker-compose restart

logs: ## Ver logs de todos los servicios
	docker-compose logs -f

logs-backend: ## Ver logs del backend (Laravel API)
	docker-compose logs -f backend

logs-frontend: ## Ver logs del frontend (React)
	docker-compose logs -f frontend

shell-backend: ## Acceder al shell del contenedor backend
	docker-compose exec backend bash

shell-frontend: ## Acceder al shell del contenedor frontend
	docker-compose exec frontend sh

install: ## Instalar proyecto completo (backend + frontend)
	chmod +x init.sh && ./init.sh

fresh: ## Instalar desde cero
	docker-compose down -v
	docker-compose up -d --build
	sleep 45
	docker-compose exec backend composer create-project laravel/laravel . --prefer-dist --no-interaction
	docker-compose exec backend php artisan key:generate
	docker-compose exec backend php artisan install:api
	docker-compose exec backend php artisan migrate
	docker-compose exec frontend npm install
	docker-compose exec backend chown -R www-data:www-data storage bootstrap/cache

migrate: ## Ejecutar migraciones en el backend
	docker-compose exec backend php artisan migrate

seed: ## Ejecutar seeders en el backend
	docker-compose exec backend php artisan db:seed

artisan: ## Ejecutar comando artisan (uso: make artisan cmd="migrate:status")
	docker-compose exec backend php artisan $(cmd)

composer: ## Ejecutar comando composer en backend (uso: make composer cmd="require package")
	docker-compose exec backend composer $(cmd)

npm: ## Ejecutar comando npm en frontend (uso: make npm cmd="install package")
	docker-compose exec frontend npm $(cmd)

test-backend: ## Ejecutar tests del backend
	docker-compose exec backend php artisan test

test-frontend: ## Ejecutar tests del frontend
	docker-compose exec frontend npm test

dev-backend: ## Modo desarrollo backend (con logs)
	docker-compose logs -f backend

dev-frontend: ## Modo desarrollo frontend (con logs)
	docker-compose logs -f frontend
