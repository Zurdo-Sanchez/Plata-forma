# Authentication

## What it does
Allows users to register and access the platform.

## How to use
1. Register with email and password.
2. Log in with the same credentials.
3. If you forgot your password, use "Recover password" and follow the link.
4. You can change the language from the selector on the login screen.

## Example
- Register: `POST /auth/register`
- Login: `POST /auth/login`
- Recovery: from the login screen.

## Edge cases
- If there are more than `AUTH_MAX_LOGIN_ATTEMPTS` failed attempts, the account is locked for the time set in `AUTH_LOCK_MINUTES`.
- Minimum password length is 6 characters.
- If the recovery email does not arrive, check the spam folder.
