# Autenticacio

## Que fa
Permet registrar-se i accedir a la plataforma.

## Com s'utilitza
1. Registrar-se amb email i contrasenya.
2. Iniciar sessio amb les mateixes credencials.

## Exemple
- Registre: `POST /auth/register`
- Login: `POST /auth/login`

## Casos limit
- Si hi ha mes de `AUTH_MAX_LOGIN_ATTEMPTS` intents fallits, el compte queda bloquejat pel temps configurat a `AUTH_LOCK_MINUTES`.
- La contrasenya minima es de 6 caracters.
