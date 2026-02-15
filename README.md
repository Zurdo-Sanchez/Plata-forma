# Plata-forma
Aplicación de contabilidad familiar basada en ledger (doble partida) para gestionar cuentas bancarias, tarjetas de crédito, préstamos y presupuestos. Construida con NestJS, Vue 3 (Quasar) y MySQL, completamente dockerizada.

🪙 Plata-Forma

Entrená, organizá y dominá las finanzas de tu hogar.

Plata-Forma es una aplicación moderna de contabilidad familiar basada en un modelo ledger (doble partida), diseñada para gestionar cuentas bancarias, tarjetas de crédito, préstamos y presupuestos de forma clara, consistente y escalable.

🚀 Características

👨‍👩‍👧‍👦 Gestión multiusuario por hogar

💰 Cuentas (banco, efectivo, tarjeta, préstamo)

🧾 Transacciones con múltiples líneas (ledger)

🔎 Filtros avanzados por fecha, cuenta y categoría

📊 Reportes mensuales y análisis de gastos

💳 Control de tarjetas de crédito (cierre y vencimiento)

📉 Gestión de préstamos con amortización

🧮 Cálculo dinámico de saldos

🐳 Totalmente dockerizado

🧠 Filosofía

Plata-Forma está construido con principios contables sólidos:

✔️ Modelo ledger con doble partida

✔️ Cada transacción debe balancear (∑ líneas = 0)

✔️ No se almacenan saldos manuales

✔️ El dinero se maneja en enteros (centavos)

✔️ Historial auditable

✔️ Arquitectura pensada para escalar

🏗 Arquitectura
Plata-Forma/
│
├── apps/
│   ├── api/        # Backend NestJS
│   └── web/        # Frontend Vue 3 + Quasar
│
├── packages/
│   ├── db/         # Prisma + esquema
│   └── shared/     # Schemas (Zod) y tipos compartidos
│
├── docker-compose.yml
└── README.md

🛠 Stack Tecnológico
Backend

NestJS

TypeScript

Prisma ORM

MySQL

Validación con Zod

Frontend

Vue 3

Quasar Framework

Pinia

Infraestructura

Docker

Docker Compose

Entornos separados (dev / prod)

🏦 Modelo Contable

Cada movimiento se registra como una transacción compuesta por múltiples líneas:

Ejemplo — Gasto supermercado 50€:

Cuenta	Monto
Banco	-5000
Gasto: Supermercado	+5000

La suma siempre debe ser cero.

Esto permite:

Transferencias naturales

Manejo correcto de tarjetas

Pagos parciales

División de gastos (split)

Soporte de préstamos e intereses

⚙️ Instalación (Desarrollo)
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/plata-forma.git
cd plata-forma

2️⃣ Levantar entorno con Docker
docker compose up --build


Esto iniciará:

API (NestJS)

Frontend (Quasar)

MySQL

🔐 Variables de Entorno

Crear archivo .env en /apps/api:

DATABASE_URL="mysql://user:password@mysql:3306/plataforma"
JWT_SECRET="supersecret"

📈 Roadmap
Fase 1

 CRUD de cuentas

 CRUD de transacciones

 Reporte mensual básico

Fase 2

 Tarjetas con cierre y vencimiento

 Préstamos con tabla de amortización

 Presupuestos por categoría

 Importación CSV

Fase 3

 Multi-moneda

 API pública

 Modo SaaS

🧪 Testing (futuro)

Unit tests en servicios

Validaciones ledger

Testing de reglas financieras

📜 Licencia

MIT License
© 2026 Juan Manuel Sanchez

💡 Inspiración

Plata-Forma nace con la idea de:

Convertir el control financiero familiar en algo claro, moderno y sostenible.
