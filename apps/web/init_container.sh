#!/bin/bash

# init_container.sh - Script de inicialización para el contenedor plataforma-web

set -e

# Aquí puedes agregar los comandos de inicialización necesarios
echo "Inicializando el contenedor plataforma-web..."

cd /web

if [ ! -d "/web/node_modules" ]; then
    echo "/web/node_modules no existe, ejecutando npm install..."
    npm install
fi

if [ "$DOCKER_ENVIRONMENT" = "dev" ]; then
    quasar dev -p 800
else
    quasar build
    quasar serve -p 800 /web/dist/spa
fi
