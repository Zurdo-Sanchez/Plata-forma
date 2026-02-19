# Autenticacio

## Que fa
Permet registrar-se i accedir a la plataforma.

## Com s'utilitza
1. Registrar-se amb email i contrasenya.
2. Iniciar sessio amb les mateixes credencials.
3. Si has oblidat la contrasenya, usa "Recuperar contrasenya" i segueix l'enllac.
4. Pots canviar l'idioma des del selector a la pantalla de login.
5. Despres d'iniciar sessio correctament, es mostra el dashboard.
6. Despres d'enviar la recuperacio, es redirigeix a la pantalla de restablir contrasenya.

## Exemple
- Registre: `POST /auth/register`
- Login: `POST /auth/login`
- Recuperacio: des de la pantalla de login.

## Casos limit
- Si hi ha mes de `AUTH_MAX_LOGIN_ATTEMPTS` intents fallits, el compte queda bloquejat pel temps configurat a `AUTH_LOCK_MINUTES`.
- La contrasenya minima es de 6 caracters.
- Si no arriba el correu de recuperacio, revisa la carpeta de spam.
- Si les credencials son invalides, es mostra una notificacio a la pantalla.
