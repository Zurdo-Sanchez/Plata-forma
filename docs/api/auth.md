# Auth API

## POST /auth/register

Crea un usuario nuevo.

Request:

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Registro exitoso.",
  "userId": "uuid"
}
```

Errores:
- 400 `Datos inválidos.`
- 400 `El usuario ya existe.`

## POST /auth/login

Autentica un usuario y devuelve un token JWT.

Request:

```json
{
  "email": "user@example.com",
  "password": "string"
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Login exitoso.",
  "accessToken": "jwt",
  "tokenType": "Bearer",
  "userId": "uuid"
}
```

Errores:
- 400 `Datos inválidos.`
- 401 `Credenciales inválidas.`
- 429 `Cuenta bloqueada por intentos fallidos. Intenta más tarde.`

## GET /auth/me

Devuelve el usuario asociado al token.

Headers:
- `Authorization: Bearer <token>`

Response 200:

```json
{
  "ok": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

Errores:
- 401 `No autorizado.`

## Localizacion

Los mensajes de error responden segun `Accept-Language`:
- `es` (default)
- `ca`
- `en`

## Logs

- `auth_login_attempts`: guarda cada intento (SUCCESS, FAILED, BLOCKED).
- `auth_login_alerts`: guarda las alertas de bloqueo.

## Seeder

Se crea/actualiza un usuario superadmin:
- Email: `su@admin.com`
- Password: `secret`

Ejecutar:
- `npx prisma db seed`

## Variables de entorno

- `AUTH_MAX_LOGIN_ATTEMPTS` (default: 5) -> se bloquea cuando se supera este valor.
- `AUTH_LOCK_MINUTES` (default: 15)
- `AUTH_TOKEN_EXPIRES_IN` (default: 1h)
- `JWT_SECRET`
