# Transacciones

## Que hace
Registra movimientos contables con multiples lineas (ledger).

## Como se usa
1. Seleccionar un hogar.
2. Crear una transaccion con fecha y descripcion.
3. Agregar lineas con cuenta, monto y categoria opcional.
4. Los montos se ingresan en centavos (enteros).
5. La suma total de las lineas debe ser 0.

## Ejemplo
- Supermercado 50.00:
  - Banco: `-5000`
  - Gasto:Supermercado: `5000`

## Casos limite
- Si las lineas no balancean, la transaccion se rechaza.
- No se aceptan decimales ni floats en los montos.
