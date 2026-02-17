# Autenticacion

## Que hace
Permite registrarse y acceder a la plataforma.

## Como se usa
1. Registrarse con email y password.
2. Iniciar sesion con las mismas credenciales.
3. Si olvidaste la contrasena, usa "Recuperar contrasena" y sigue el enlace.
4. Puedes cambiar el idioma desde el selector en la pantalla de login.

## Ejemplo
- Registro: `POST /auth/register`
- Login: `POST /auth/login`
- Recuperacion: desde la pantalla de login.

## Casos limite
- Si hay mas de `AUTH_MAX_LOGIN_ATTEMPTS` intentos fallidos, la cuenta queda bloqueada por el tiempo configurado en `AUTH_LOCK_MINUTES`.
- El password minimo es 6 caracteres.
- Si no llega el correo de recuperacion, revisa la carpeta de spam.
