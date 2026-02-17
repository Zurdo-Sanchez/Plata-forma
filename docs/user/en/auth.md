# Authentication

## What it does
Allows users to register and access the platform.

## How to use
1. Register with email and password.
2. Log in with the same credentials.

## Example
- Register: `POST /auth/register`
- Login: `POST /auth/login`

## Edge cases
- If there are more than `AUTH_MAX_LOGIN_ATTEMPTS` failed attempts, the account is locked for the time set in `AUTH_LOCK_MINUTES`.
- Minimum password length is 6 characters.
