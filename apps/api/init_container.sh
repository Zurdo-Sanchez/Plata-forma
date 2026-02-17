#!/bin/bash

# init_container.sh - Script de inicialización para el contenedor plataforma-api

set -e

# Aquí puedes agregar los comandos de inicialización necesarios
echo "Inicializando el contenedor plataforma-api..."

cd /api
if [ ! -d "/api/node_modules" ] || [ ! -x "/api/node_modules/.bin/prisma" ]; then
    echo "/api/node_modules no existe o Prisma no esta instalado, ejecutando npm install..."
    npm install
fi

if [ "$DOCKER_ENVIRONMENT" = "dev" ]; then
    npm run start:dev
else
    npm run start
fi
