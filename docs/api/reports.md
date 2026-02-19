# Reports API

Todos los endpoints requieren `Authorization: Bearer <token>`.

Notas:
- Los montos se devuelven como string entero en centavos.

## GET /households/:householdId/reports/monthly

Devuelve el resumen mensual.

Query params:
- `month` (YYYY-MM)

Response 200:

```json
{
  "month": "2026-02",
  "range": { "start": "2026-02-01T00:00:00.000Z", "end": "2026-03-01T00:00:00.000Z" },
  "totals": { "income": "100000", "expense": "45000", "net": "55000" },
  "byCategory": [
    { "categoryId": "uuid", "name": "Salario", "type": "INCOME", "amount": "100000" }
  ],
  "byAccount": [
    { "accountId": "uuid", "name": "Banco", "type": "BANK", "amount": "55000" }
  ]
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
