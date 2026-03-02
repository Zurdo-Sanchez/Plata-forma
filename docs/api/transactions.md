# Transactions API

Todos los endpoints requieren `Authorization: Bearer <token>`.

Notas:
- `amount` se envia como string entero en centavos.
- La API permite modo simple (`entry`) o modo avanzado (`lines`).
- En modo simple se define `from` y `to`, que pueden ser `ACCOUNT` o `CATEGORY`.

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

## GET /households/:householdId/transactions/balances

Devuelve el saldo mensual por cuenta y categoria.

Query params:
- `month` (YYYY-MM)

Response 200:

```json
{
  "month": "2026-02",
  "range": { "start": "2026-02-01T00:00:00.000Z", "end": "2026-03-01T00:00:00.000Z" },
  "accounts": { "uuid": "-5000" },
  "categories": { "uuid": "-5000" }
}
```

## POST /households/:householdId/transactions

Crea una transaccion. Puedes usar modo simple o avanzado.

Request:

```json
{
  "date": "2026-02-19",
  "description": "Supermercado",
  "entry": {
    "from": { "kind": "CATEGORY", "id": "uuid" },
    "to": { "kind": "ACCOUNT", "id": "uuid" },
    "amount": "5000",
    "memo": "Gasto"
  }
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

Modo avanzado (ledger completo):

```json
{
  "date": "2026-02-19",
  "description": "Supermercado",
  "lines": [
    { "accountId": "uuid", "categoryId": "uuid", "amount": "-5000" },
    { "accountId": "uuid", "categoryId": "uuid", "amount": "5000" }
  ]
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

Actualiza fecha, descripcion, lineas o entrada simple (`entry`).

Request:

```json
{
  "description": "Supermercado semanal"
}
```

Modo simple (entry):

```json
{
  "date": "2026-02-19",
  "description": "Supermercado",
  "entry": {
    "from": { "kind": "CATEGORY", "id": "uuid" },
    "to": { "kind": "ACCOUNT", "id": "uuid" },
    "amount": "5000",
    "memo": "Gasto"
  }
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

Borrado suave: archiva la transaccion (isActive = false).

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
