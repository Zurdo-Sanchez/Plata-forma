# Transactions

## What it does
Records accounting movements with multiple lines (ledger).

## How to use
1. Select a household.
2. Create a transaction with date and description.
3. Choose origin and destination (account or category) and amount (in cents).
4. Origin and destination can be accounts or categories.
5. Edit or delete transactions when needed.

## Example
- Groceries 50.00:
  - Account: Bank
  - Category: Groceries (Expense)
  - Amount: `5000`

## Edge cases
- Decimals and floats are not accepted for amounts.
- A category can be used for both income and expenses.
- The platform creates the counter line automatically to keep the ledger balanced.
- Deletion is soft: the transaction becomes inactive and is hidden from new lists.
