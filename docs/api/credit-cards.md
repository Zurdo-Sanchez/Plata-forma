# Credit Cards API

Todos los endpoints requieren `Authorization: Bearer <token>`.

Notas:
- `limitAmount` se envia como string entero en centavos (opcional).
- Si no se envia `accountId`, se crea una cuenta `CREDIT_CARD`.

## GET /households/:householdId/credit-cards

Lista tarjetas del hogar.

Response 200:

```json
[
  {
    "id": "uuid",
    "householdId": "uuid",
    "accountId": "uuid",
    "name": "Visa",
    "closingDay": 20,
    "dueDay": 10,
    "limitAmount": "500000",
    "account": { "id": "uuid", "type": "CREDIT_CARD" }
  }
]
```

## POST /households/:householdId/credit-cards

Crea una tarjeta.

Request:

```json
{
  "name": "Visa",
  "closingDay": 20,
  "dueDay": 10,
  "limitAmount": "500000"
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Tarjeta creada correctamente.",
  "card": { "id": "uuid", "name": "Visa" }
}
```

## GET /credit-cards/:id

Obtiene una tarjeta por id.

Response 200:

```json
{
  "id": "uuid",
  "householdId": "uuid",
  "name": "Visa",
  "closingDay": 20,
  "dueDay": 10,
  "limitAmount": "500000"
}
```

## PATCH /credit-cards/:id

Actualiza los campos de la tarjeta.

Request:

```json
{
  "closingDay": 25
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Tarjeta actualizada correctamente.",
  "card": { "id": "uuid", "closingDay": 25 }
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 400 `Cuenta invalida.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
- 404 `Tarjeta no encontrada.`
