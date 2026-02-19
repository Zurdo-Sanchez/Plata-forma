# Credit Cards

## What it does
Lets you register credit cards with closing and due dates.

## How to use
1. Select a household.
2. Register a card with name, closing day, and due day.
3. Optional: set a limit in cents.
4. A CREDIT_CARD account is created if none is provided.

## Example
- Card "Visa" with closing day 20 and due day 10.
- Limit `500000` (5000.00).

## Edge cases
- Closing and due day must be between 1 and 28.
- Limit is optional, but if provided it must be an integer.
