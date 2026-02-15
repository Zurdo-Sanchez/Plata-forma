# 🏗 Plata-Forma – Arquitectura Técnica

Este documento describe la arquitectura oficial del proyecto.

---

# 🧱 Arquitectura General

Plata-Forma es un sistema modular full-stack:

Frontend → Vue 3 + Quasar  
Backend → NestJS + TypeScript  
DB → MySQL  
ORM → Prisma  
Infra → Docker  

---

# 🧠 Principios Arquitectónicos

- Single Responsibility Principle
- Modularidad estricta
- Separación de capas
- Ledger como núcleo financiero
- No lógica financiera en UI
- Validación obligatoria en backend

---

# 🏦 Modelo Ledger

Entidad principal: Transaction

Transaction:
- id
- date
- description
- household_id

TransactionLine:
- transaction_id
- account_id
- amount (bigint)
- metadata

Regla:
SUM(amount) = 0

No se almacenan saldos.

---

# 📦 Backend Structure

apps/api/src/
modules/
auth/
households/
accounts/
categories/
transactions/
credit-cards/
loans/
reports/


Cada módulo contiene:

- controller
- service
- dto/schema
- repository (si aplica)

---

# 🌍 Internacionalización

Frontend:
- i18n modular

Backend:
- Mensajes localizables por Accept-Language

---

# 📚 Documentación

docs/
  user/
  api/
  adr/

Cada feature nueva debe actualizar documentación.

---

# 🐳 Infraestructura

Servicios:

- mysql
- api
- web
- adminer

Todo debe poder levantarse con:

docker compose up --build

---

# 🔐 Seguridad

- JWT
- Separación por household_id
- Validación con Zod
- No confiar en frontend

---

# 📈 Escalabilidad Futura

La arquitectura permite:

- Multi-moneda
- SaaS
- API pública
- Microservicios si crece
- Event sourcing si se necesita

---

# 🎯 Objetivo Arquitectónico

Plata-Forma debe mantenerse:

- Simple
- Consistente
- Predecible
- Modular
- Financiera y contablemente correcta

