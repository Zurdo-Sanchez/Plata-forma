# Loans

## What it does
Registers household loans with principal and rate.

## How to use
1. Select a household.
2. Register a loan with name, principal, and start date.
3. Rate is entered in bps (basis points).
4. Optional: set term in months.
5. Edit or delete loans when needed.

## Example
- Loan "Mortgage" principal `12000000` and rate `850` bps.

## Edge cases
- Principal is entered in cents (integer).
- Start date is required.
- Deletion is soft: the loan becomes inactive and is hidden from new lists.
