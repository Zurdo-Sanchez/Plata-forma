# Transacciones

## Que hace
Registra movimientos contables con multiples lineas (ledger).

## Como se usa
1. Seleccionar un hogar.
2. Crear una transaccion con fecha y descripcion.
3. Elegir origen y destino (cuenta o categoria) y monto (en centavos).
4. El origen y destino pueden ser cuentas o categorias.
5. Editar o borrar transacciones cuando sea necesario.

## Ejemplo
- Supermercado 50.00:
  - Cuenta: Banco
  - Categoria: Supermercado (Gasto)
  - Monto: `5000`

## Casos limite
- No se aceptan decimales ni floats en los montos.
- Una categoria puede usarse tanto para ingresos como para gastos.
- La plataforma crea la linea contrapartida automaticamente para mantener el ledger en 0.
- El borrado es suave: la transaccion queda inactiva y no aparece en listas nuevas.
