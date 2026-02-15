# Plata-forma
Aplicación de contabilidad familiar basada en ledger (doble partida) para gestionar cuentas bancarias, tarjetas de crédito, préstamos y presupuestos. Construida con NestJS, Vue 3 (Quasar) y MySQL, completamente dockerizada.

---

## 🌍 Multi-idioma (i18n)

### Frontend
El frontend usa i18n para traducir:
- UI (menús, formularios, reportes)
- nombres de categorías base (si se usan defaults)
- mensajes de error de validación a nivel UI

> Recomendación: mantener traducciones por módulos para escalar mejor.

### API
La API expone errores y mensajes localizables según el header:
- `Accept-Language: es | ca | en | pt ...`

> Nota: los datos del dominio (descripciones de transacciones, nombres de cuentas/categorías creadas por usuarios) no se traducen automáticamente.

Idiomas previstos (inicial):
- `es` (Español)
- `ca` (Català)
- `en` (English)
- (opcional) `pt` más adelante

---

## 📚 Documentación viva (Usuario + API)

Plata-Forma mantiene documentación **versionada** y actualizada junto al código.

### 🧑‍💻 Documentación de Usuario
Ubicación: `docs/user/`

- Guías por módulos (Cuentas, Movimientos, Tarjetas, Préstamos, Reportes)
- FAQ y “primeros pasos”
- Multi-idioma por carpeta:
  - `docs/user/es/`
  - `docs/user/ca/`
  - `docs/user/en/`

### 🔌 Documentación de API
Ubicación: `docs/api/`

- Especificación OpenAPI (Swagger)
- Ejemplos de requests/responses
- Guías: autenticación, paginación, errores, filtros
- Changelog de endpoints

> Objetivo: que el frontend consuma una API bien documentada desde el día 1.

---

## 🛠 Stack Tecnológico

### Backend
- NestJS
- TypeScript
- Prisma ORM
- MySQL
- Validación con Zod

### Frontend
- Vue 3
- Quasar Framework
- Pinia

### Infra
- Docker
- Docker Compose

---

## 🏦 Modelo Contable (Ledger)

Cada operación se registra como una **transacción** con múltiples líneas.

Ejemplo — Gasto supermercado 50€:

| Cuenta | Monto (centavos) |
|--------|-------------------|
| Banco | -5000 |
| Gasto: Supermercado | +5000 |

La suma siempre debe ser **0**.

Esto permite:
- Transferencias naturales
- Manejo correcto de tarjetas (deuda)
- Pagos parciales
- Splits por categorías
- Intereses y cuotas sin hacks

---

## ⚙️ Instalación (Desarrollo)

### 1) Clonar
```bash
git clone https://github.com/tu-usuario/plata-forma.git
cd plata-forma
