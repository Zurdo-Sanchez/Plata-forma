# Accounts

## What it does
Lets you create and manage bank, cash, card, and loan accounts.

## How to use
1. Select a household.
2. Create an account with name and type.
3. Edit accounts when details change.
4. Delete accounts you no longer use (soft delete).
5. Use accounts when creating transactions.

## Example
- Account "Bank" type BANK.
- Account "Cash" type CASH.

## Edge cases
- Only household members can view or edit accounts.
- Deletion is soft: the account becomes inactive and is hidden from new lists.
- Inactive accounts should not be used in new transactions.
