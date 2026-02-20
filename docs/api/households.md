# Households API

Todos los endpoints requieren `Authorization: Bearer <token>`.

## GET /households

Lista los hogares del usuario autenticado.

Response 200:

```json
[
  {
    "id": "uuid",
    "name": "Mi hogar",
    "currency": "USD",
    "createdAt": "2026-02-19T00:00:00.000Z",
    "updatedAt": "2026-02-19T00:00:00.000Z",
    "members": [{ "role": "OWNER" }]
  }
]
```

## POST /households

Crea un hogar nuevo y agrega al usuario como OWNER.

Request:

```json
{
  "name": "Hogar principal",
  "currency": "USD"
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Hogar creado correctamente.",
  "household": {
    "id": "uuid",
    "name": "Hogar principal",
    "currency": "USD"
  }
}
```

## GET /households/:id

Obtiene un hogar por id.

Response 200:

```json
{
  "id": "uuid",
  "name": "Hogar principal",
  "currency": "USD"
}
```

## PATCH /households/:id

Actualiza el nombre o moneda del hogar (solo OWNER).

Request:

```json
{
  "name": "Nuevo nombre",
  "currency": "EUR"
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Hogar actualizado correctamente.",
  "household": { "id": "uuid", "name": "Nuevo nombre", "currency": "EUR" }
}
```

## POST /households/:id/members

Agrega un miembro existente por email (solo OWNER).

Request:

```json
{
  "email": "user@example.com",
  "role": "MEMBER"
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Miembro agregado correctamente.",
  "member": { "id": 1, "role": "MEMBER" }
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
- 404 `Hogar no encontrado.`

## DELETE /households/:id

Elimina un hogar y todos sus datos (solo OWNER).

Response 200:

```json
{
  "ok": true,
  "message": "Hogar eliminado correctamente."
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
