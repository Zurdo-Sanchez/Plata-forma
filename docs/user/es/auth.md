# Autenticacion

## Que hace
Permite registrarse y acceder a la plataforma.

## Como se usa
1. Registrarse con email y password.
2. Iniciar sesion con las mismas credenciales.

## Ejemplo
- Registro: `POST /auth/register`
- Login: `POST /auth/login`

## Casos limite
- Si hay mas de `AUTH_MAX_LOGIN_ATTEMPTS` intentos fallidos, la cuenta queda bloqueada por el tiempo configurado en `AUTH_LOCK_MINUTES`.
- El password minimo es 6 caracteres.
