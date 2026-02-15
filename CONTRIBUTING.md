# 🤝 Contributing to Plata-Forma

Gracias por contribuir a **Plata-Forma**.

Este documento define cómo contribuir correctamente al proyecto.

---

# 🧭 Filosofía

Plata-Forma prioriza:

- Claridad
- Consistencia contable
- Arquitectura limpia
- Escalabilidad
- Documentación viva
- Multi-idioma obligatorio

---

# 📦 Flujo de Trabajo

## 1️⃣ Crear una rama

Formato:

feature/<modulo>-<descripcion>
fix/<modulo>-<descripcion>
refactor/<modulo>-<descripcion>

Ejemplos:
- feature/transactions-split
- fix/accounts-balance
- refactor/ledger-service

---

## 2️⃣ Reglas antes de hacer PR

Un Pull Request será aceptado solo si cumple:

- ✅ Código implementado
- ✅ Tests (si aplica)
- ✅ Traducciones agregadas (es, ca, en)
- ✅ Documentación actualizada
- ✅ No rompe modelo ledger
- ✅ Lint sin errores
- ✅ Docker build funcional

---

# 🌍 Traducciones

Toda nueva cadena visible en UI debe agregarse en:

apps/web/src/i18n/
es/
ca/
en/


Prohibido hardcodear textos.

---

# 📚 Documentación Obligatoria

Si agregás:

- Endpoint → actualizar docs/api
- Feature visible → actualizar docs/user
- Cambio estructural → actualizar ARCHITECTURE.md

---

# 🧪 Testing

Obligatorio para:

- Lógica financiera
- Validaciones ledger
- Cálculo de saldos
- Amortizaciones

No es obligatorio para:
- Componentes visuales simples

---

# 💰 Reglas Financieras Inmutables

- Dinero en centavos (bigint)
- No floats
- ∑ líneas = 0
- No guardar saldos manuales

---

# 🐳 Docker

Todo debe correr dentro del entorno Docker.

No usar dependencias fuera del container.

---

# 🎯 Definition of Done

Una tarea está completa solo si:

- Funciona
- Está validada
- Está traducida
- Está documentada
- Está dockerizada
