# Transactions

## What it does
Records accounting movements with multiple lines (ledger).

## How to use
1. Select a household.
2. Create a transaction with date and description.
3. Add lines with account, amount, and optional category.
4. Amounts are entered in cents (integers).
5. The total sum of lines must be 0.

## Example
- Groceries 50.00:
  - Bank: `-5000`
  - Expense:Groceries: `5000`

## Edge cases
- If lines do not balance, the transaction is rejected.
- Decimals and floats are not accepted for amounts.
