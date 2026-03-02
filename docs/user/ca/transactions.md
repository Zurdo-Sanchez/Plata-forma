# Transaccions

## Que fa
Registra moviments comptables amb multiples linies (ledger).

## Com s'utilitza
1. Seleccionar una llar.
2. Crear una transaccio amb data i descripcio.
3. Escollir compte, categoria, tipus (ingrés/despesa) i import (en centims).
4. El tipus defineix si es ingrés o despesa; la categoria només classifica el moviment.
5. Editar o eliminar transaccions quan calgui.

## Exemple
- Supermercat 50.00:
  - Compte: Banc
  - Categoria: Supermercat (Despesa)
  - Import: `5000`

## Casos limit
- No s'accepten decimals ni floats en els imports.
- Una categoria pot usar-se tant per ingressos com per despeses.
- La plataforma crea la linia contrapartida automaticament per mantenir el ledger en 0.
- El borrat es suau: la transaccio queda inactiva i no apareix en llistes noves.
