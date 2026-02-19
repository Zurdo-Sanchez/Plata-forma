# Transactions API

Todos los endpoints requieren `Authorization: Bearer <token>`.

Notas:
- `amount` se envia como string entero en centavos.
- Las lineas deben sumar 0 (doble partida).

## GET /households/:householdId/transactions

Lista transacciones del hogar con filtros opcionales.

Query params:
- `from` (YYYY-MM-DD)
- `to` (YYYY-MM-DD)
- `accountId`
- `categoryId`
- `search`
- `minAmount` (string entero)
- `maxAmount` (string entero)

Response 200:

```json
[
  {
    "id": "uuid",
    "householdId": "uuid",
    "date": "2026-02-19T00:00:00.000Z",
    "description": "Supermercado",
    "lines": [
      { "accountId": "uuid", "categoryId": "uuid", "amount": "-5000" },
      { "accountId": "uuid", "categoryId": "uuid", "amount": "5000" }
    ]
  }
]
```

## POST /households/:householdId/transactions

Crea una transaccion con lineas.

Request:

```json
{
  "date": "2026-02-19",
  "description": "Supermercado",
  "lines": [
    { "accountId": "uuid", "categoryId": "uuid", "amount": "-5000", "memo": "Banco" },
    { "accountId": "uuid", "categoryId": "uuid", "amount": "5000", "memo": "Gasto" }
  ]
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Transaccion creada correctamente.",
  "transaction": { "id": "uuid", "lines": [{ "amount": "-5000" }, { "amount": "5000" }] }
}
```

## GET /transactions/:id

Obtiene una transaccion por id.

Response 200:

```json
{
  "id": "uuid",
  "householdId": "uuid",
  "date": "2026-02-19T00:00:00.000Z",
  "description": "Supermercado",
  "lines": [{ "amount": "-5000" }, { "amount": "5000" }]
}
```

## PATCH /transactions/:id

Actualiza fecha, descripcion o lineas.

Request:

```json
{
  "description": "Supermercado semanal"
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Transaccion actualizada correctamente.",
  "transaction": { "id": "uuid" }
}
```

## DELETE /transactions/:id

Elimina la transaccion.

Response 200:

```json
{
  "ok": true,
  "message": "Transaccion eliminada correctamente.",
  "transaction": { "id": "uuid" }
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 400 `Las lineas no balancean.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
- 404 `Transaccion no encontrada.`
