# Tarjetas

## Que hace
Permite registrar tarjetas de credito con fecha de cierre y vencimiento.
Los consumos con tarjeta se reflejan en el reporte del mes siguiente.

## Como se usa
1. Seleccionar un hogar.
2. Registrar tarjeta con nombre, dia de cierre y dia de vencimiento.
3. Opcional: definir limite en centavos.
4. Editar o borrar tarjetas cuando sea necesario.
5. Se crea una cuenta tipo CREDIT_CARD si no existe.

## Ejemplo
- Tarjeta "Visa" con cierre 20 y vencimiento 10.
- Limite `500000` (5000.00).

## Casos limite
- El dia de cierre y vencimiento debe estar entre 1 y 28.
- El limite es opcional, pero si se envia debe ser entero.
- El borrado es suave: la tarjeta queda inactiva y no aparece en listas nuevas.
