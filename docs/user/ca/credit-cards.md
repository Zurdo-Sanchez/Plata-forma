# Targetes

## Que fa
Permet registrar targetes de credit amb data de tancament i venciment.

## Com s'utilitza
1. Seleccionar una llar.
2. Registrar targeta amb nom, dia de tancament i dia de venciment.
3. Opcional: definir limit en centims.
4. Es crea un compte tipus CREDIT_CARD si no existeix.

## Exemple
- Targeta "Visa" amb tancament 20 i venciment 10.
- Limit `500000` (5000.00).

## Casos limit
- El dia de tancament i venciment ha d'estar entre 1 i 28.
- El limit es opcional, pero si s'envia ha de ser enter.
