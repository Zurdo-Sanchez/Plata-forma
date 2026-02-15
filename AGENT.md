# 🪙 Plata-Forma – Development Agent Rules

Este documento define las reglas obligatorias de desarrollo para el proyecto **Plata-Forma**.

El objetivo es mantener coherencia técnica, calidad, escalabilidad y claridad documental desde el inicio.

---

# 🧠 Principios Fundamentales

## 1️⃣ Responsabilidad Única (SRP)

Cada módulo, servicio, clase y componente debe tener una sola responsabilidad clara.

❌ Incorrecto:
- Un servicio que valida, guarda y genera reportes.
- Un componente Vue que renderiza UI y contiene lógica financiera.

✅ Correcto:
- Validación → schema (Zod)
- Lógica de negocio → service
- Acceso a datos → repository / Prisma
- UI → componente
- Orquestación → controller

---

## 2️⃣ Arquitectura Modular

Backend (NestJS) debe dividirse en módulos independientes:

- auth
- households
- accounts
- categories
- transactions
- credit-cards
- loans
- reports

Ningún módulo debe depender directamente de otro módulo sin pasar por su capa pública.

---

## 3️⃣ Modelo Ledger Obligatorio

El sistema financiero se basa en:

- Transacciones con múltiples líneas
- La suma de las líneas debe ser 0
- No se guardan saldos manuales
- No se usan floats (solo enteros en centavos)

Toda nueva feature financiera debe respetar estas reglas.

---

# 🌍 Multi-Idioma (i18n) – OBLIGATORIO

## Regla 1
Toda nueva cadena visible en UI debe agregarse a los archivos de traducción.

Nunca hardcodear strings en componentes.

## Regla 2
Cada nuevo texto debe existir en:
- es
- ca
- en

Estructura:

apps/web/src/i18n/
es/
ca/
en/


## Regla 3
La API debe respetar `Accept-Language` para mensajes de error.

## Regla 4
Los datos creados por usuarios NO se traducen automáticamente.

---

# 📚 Documentación Obligatoria

Cada feature nueva debe incluir:

1. Documentación de usuario (`docs/user/<lang>/`)
2. Documentación técnica/API (`docs/api/`)
3. Actualización de changelog si aplica

Si un PR no incluye documentación → no se considera completo.

---

## 🧑‍💻 Documentación de Usuario

Debe incluir:
- Qué hace la funcionalidad
- Cómo usarla
- Ejemplos prácticos
- Casos límite

Debe mantenerse en:
- es
- ca
- en

---

## 🔌 Documentación de API

Toda modificación de endpoint requiere:
- Actualizar OpenAPI
- Documentar request
- Documentar response
- Documentar posibles errores

---

# 🏃 Metodología Scrum

Plata-Forma sigue Scrum simplificado:

## Sprint
- Duración recomendada: 2 semanas
- Cada sprint debe tener objetivo claro

## Definition of Done (DoD)

Una tarea está terminada solo si:

- Código implementado
- Tests básicos agregados
- Traducciones agregadas
- Documentación actualizada
- Sin warnings de lint
- Docker build funciona

---

# 🧪 Testing

Reglas:

- Servicios con lógica financiera deben tener tests unitarios
- Validaciones ledger deben testearse
- No mezclar lógica financiera en controllers

---

# 🐳 Docker

- Todo debe correr en Docker
- No depender de entornos locales fuera del container
- Variables en `.env`
- No hardcodear secretos

---

# 🗄 Base de Datos

Reglas:

- Usar Prisma
- Migraciones obligatorias
- Nunca modificar DB manualmente en producción
- Usar bigint para dinero
- Indexar campos de búsqueda frecuente

---

# 🔐 Seguridad

- Validación obligatoria en backend (Zod)
- Nunca confiar en frontend
- Sanitizar inputs
- JWT para autenticación
- Separación por household_id obligatoria en queries

---

# 🧩 Frontend (Vue + Quasar)

Reglas:

- Componentes pequeños y reutilizables
- Lógica fuera de componentes (usar composables o stores)
- Pinia para estado global
- No lógica financiera en UI

---

# 📦 DTO / Schemas

- Toda entrada debe validarse con Zod
- Validaciones complejas (ej: balance ledger) deben implementarse en schema o service
- No usar `any`

---

# 📈 Versionado

- Semantic Versioning (SemVer)
- Breaking changes documentados
- Changelog actualizado

---

# 📜 Código

- TypeScript estricto
- ESLint + Prettier obligatorios
- No comentarios innecesarios
- Nombres claros y descriptivos

---

# 🚫 Prohibiciones

- No usar floats para dinero
- No hardcodear textos
- No mezclar responsabilidades
- No saltarse migraciones
- No omitir documentación
- No romper el modelo ledger

---

# 🎯 Filosofía Final

Plata-Forma debe ser:

- Clara
- Escalable
- Auditada
- Modular
- Internacional
- Profesional
- Preparada para evolucionar a SaaS si se decide

Cada decisión técnica debe favorecer:
- claridad
- mantenibilidad
- coherencia contable
- simplicidad estructural

---

Fin del documento.
