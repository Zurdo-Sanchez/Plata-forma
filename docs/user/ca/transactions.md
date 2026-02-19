# Transaccions

## Que fa
Registra moviments comptables amb multiples linies (ledger).

## Com s'utilitza
1. Seleccionar una llar.
2. Crear una transaccio amb data i descripcio.
3. Afegir linies amb compte, import i categoria opcional.
4. Els imports s'introdueixen en centims (enters).
5. La suma total de les linies ha de ser 0.

## Exemple
- Supermercat 50.00:
  - Banc: `-5000`
  - Despesa:Supermercat: `5000`

## Casos limit
- Si les linies no balancegen, la transaccio es rebutja.
- No s'accepten decimals ni floats en els imports.
