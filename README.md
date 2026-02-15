🪙 Plata-Forma

Entrená, organizá y dominá las finanzas de tu hogar.

Plata-Forma es una aplicación moderna de contabilidad familiar basada en un modelo ledger (doble partida), diseñada para gestionar cuentas bancarias, tarjetas de crédito, préstamos y presupuestos de forma clara, consistente y escalable.

🎯 Objetivo

Crear una plataforma financiera familiar:

Clara

Modular

Internacional

Auditada

Escalable

Lista para evolucionar a SaaS si se decide

🚀 Características

👨‍👩‍👧‍👦 Gestión multiusuario por hogar

🌍 Multi-idioma obligatorio (es / ca / en)

💰 Cuentas (banco, efectivo, tarjeta, préstamo)

🧾 Transacciones con múltiples líneas (ledger)

🔎 Filtros avanzados

📊 Reportes mensuales

💳 Control de tarjetas

📉 Gestión de préstamos

🧮 Cálculo dinámico de saldos

🐳 Totalmente dockerizado

🧠 Principios Fundamentales
📌 1. Modelo Ledger Obligatorio

Cada transacción tiene múltiples líneas

La suma total de líneas debe ser 0

No se guardan saldos manuales

No se usan floats (solo centavos en bigint)

El historial es auditable

📌 2. Responsabilidad Única (SRP)

Cada componente tiene una sola responsabilidad:

Controller → Entrada HTTP

Service → Lógica de negocio

Schema (Zod) → Validación

Prisma → Acceso a datos

UI → Renderización

📌 3. Arquitectura Modular

Backend estructurado por módulos independientes:

auth

households

accounts

categories

transactions

credit-cards

loans

reports

🌍 Multi-Idioma (i18n) – Obligatorio

Toda nueva cadena visible debe existir en:

apps/web/src/i18n/
  es/
  ca/
  en/


Reglas:

Prohibido hardcodear textos

La API debe respetar Accept-Language

Los datos creados por usuario no se traducen automáticamente

📚 Documentación Viva

Toda nueva funcionalidad debe incluir:

🧑‍💻 Documentación de Usuario

Ubicación:

docs/user/<lang>/


Debe incluir:

Qué hace

Cómo se usa

Ejemplos

Casos límite

🔌 Documentación de API

Ubicación:

docs/api/


Debe incluir:

Endpoint

Request

Response

Errores posibles

Ejemplo real

Un PR sin documentación no está completo.

🏃 Metodología

Plata-Forma sigue Scrum simplificado:

Sprint recomendado: 2 semanas

Cada sprint debe tener objetivo claro

Definition of Done obligatorio:

Código

Traducciones

Documentación

Tests (si aplica)

Docker funcional

Lint limpio

🏗 Arquitectura
Plata-Forma/
│
├── apps/
│   ├── api/                 # Backend NestJS
│   └── web/                 # Frontend Vue 3 + Quasar
│
├── packages/
│   ├── db/                  # Prisma + migrations
│   └── shared/              # Schemas Zod + tipos compartidos
│
├── docs/
│   ├── user/
│   ├── api/
│   └── adr/
│
├── AGENT.md
├── CONTRIBUTING.md
├── SCRUM.md
├── ARCHITECTURE.md
├── docker-compose.yml
└── README.md

🛠 Stack Tecnológico
Backend

NestJS

TypeScript

Prisma ORM

MySQL

Zod para validación

Frontend

Vue 3

Quasar

Pinia

Infraestructura

Docker

Docker Compose

🐳 Levantar entorno de desarrollo
docker compose up --build


Servicios:

Web → http://localhost:9000

API → http://localhost:3000

Adminer → http://localhost:8080

MySQL → puerto 3306

🔐 Variables de entorno (API)

Archivo apps/api/.env:

NODE_ENV=development
PORT=3000
DATABASE_URL="mysql://plataforma:plataforma@mysql:3306/plataforma"
JWT_SECRET="change-me"
DEFAULT_LOCALE="es"

📈 Roadmap
Fase 1 – Core

 Auth + household

 Cuentas

 Categorías

 Transacciones ledger

 Reporte mensual

 Base i18n

 Base documentación

Fase 2 – Deuda

 Tarjetas con cierre/vencimiento

 Préstamos con amortización

 Presupuestos

 Importación CSV

Fase 3 – Pro

 Multi-moneda

 API pública

 Modo SaaS

💰 Ejemplo Ledger

Gasto supermercado 50€:

Cuenta	Monto
Banco	-5000
Gasto:Supermercado	+5000

Suma total = 0

📜 Licencia

MIT License
© 2026 Juan Manuel Sanchez

🧭 Filosofía Final

Plata-Forma debe mantenerse:

Clara

Predecible

Contablemente correcta

Modular

Internacional

Profesional

Lista para crecer

Cada decisión técnica debe favorecer simplicidad estructural y coherencia financiera.
