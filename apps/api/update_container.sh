#!/bin/bash

# update_container.sh - Tareas de actualizacion (migraciones, cliente Prisma)

set -e

cd /api

if [ ! -d "/api/node_modules" ] || [ ! -x "/api/node_modules/.bin/prisma" ]; then
    echo "/api/node_modules no existe o Prisma no esta instalado, ejecutando npm install..."
    npm install
fi

if [ -f "/api/prisma/schema.prisma" ]; then
    echo "Ejecutando migraciones Prisma..."
    npx --no-install prisma migrate deploy
    echo "Generando Prisma Client..."
    npx --no-install prisma generate
    echo "Ejecutando seed..."
    npx --no-install prisma db seed
fi
