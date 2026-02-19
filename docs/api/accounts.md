# Accounts API

Todos los endpoints requieren `Authorization: Bearer <token>`.

## GET /households/:householdId/accounts

Lista las cuentas del hogar.

Response 200:

```json
[
  {
    "id": "uuid",
    "householdId": "uuid",
    "name": "Banco principal",
    "type": "BANK",
    "currency": "USD",
    "isActive": true
  }
]
```

## POST /households/:householdId/accounts

Crea una cuenta dentro del hogar.

Request:

```json
{
  "name": "Efectivo",
  "type": "CASH",
  "currency": "ARS"
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Cuenta creada correctamente.",
  "account": {
    "id": "uuid",
    "name": "Efectivo",
    "type": "CASH",
    "currency": "ARS",
    "isActive": true
  }
}
```

## GET /accounts/:id

Obtiene una cuenta por id.

Response 200:

```json
{
  "id": "uuid",
  "householdId": "uuid",
  "name": "Efectivo",
  "type": "CASH",
  "currency": "ARS",
  "isActive": true
}
```

## PATCH /accounts/:id

Actualiza los campos de la cuenta.

Request:

```json
{
  "name": "Efectivo diario",
  "currency": "ARS"
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Cuenta actualizada correctamente.",
  "account": { "id": "uuid", "name": "Efectivo diario" }
}
```

## DELETE /accounts/:id

Archiva la cuenta (isActive = false).

Response 200:

```json
{
  "ok": true,
  "message": "Cuenta archivada correctamente.",
  "account": { "id": "uuid", "isActive": false }
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
- 404 `Cuenta no encontrada.`
