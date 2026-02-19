# Loans API

Todos los endpoints requieren `Authorization: Bearer <token>`.

Notas:
- `principalAmount` se envia como string entero en centavos.
- Si no se envia `accountId`, se crea una cuenta `LOAN`.

## GET /households/:householdId/loans

Lista prestamos del hogar.

Response 200:

```json
[
  {
    "id": "uuid",
    "householdId": "uuid",
    "accountId": "uuid",
    "name": "Hipoteca",
    "principalAmount": "12000000",
    "interestRateBps": 850,
    "startDate": "2026-02-01T00:00:00.000Z",
    "termMonths": 240,
    "account": { "id": "uuid", "type": "LOAN" }
  }
]
```

## POST /households/:householdId/loans

Crea un prestamo.

Request:

```json
{
  "name": "Hipoteca",
  "principalAmount": "12000000",
  "interestRateBps": 850,
  "startDate": "2026-02-01",
  "termMonths": 240
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Prestamo creado correctamente.",
  "loan": { "id": "uuid", "name": "Hipoteca" }
}
```

## GET /loans/:id

Obtiene un prestamo por id.

Response 200:

```json
{
  "id": "uuid",
  "householdId": "uuid",
  "name": "Hipoteca",
  "principalAmount": "12000000",
  "interestRateBps": 850
}
```

## PATCH /loans/:id

Actualiza los campos del prestamo.

Request:

```json
{
  "interestRateBps": 900
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Prestamo actualizado correctamente.",
  "loan": { "id": "uuid", "interestRateBps": 900 }
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 400 `Cuenta invalida.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
- 404 `Prestamo no encontrado.`
