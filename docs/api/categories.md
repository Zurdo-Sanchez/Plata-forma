# Categories API

Todos los endpoints requieren `Authorization: Bearer <token>`.

## GET /households/:householdId/categories

Lista las categorias activas del hogar.

Response 200:

```json
[
  {
    "id": "uuid",
    "householdId": "uuid",
    "name": "Supermercado",
    "isActive": true
  }
]
```

## POST /households/:householdId/categories

Crea una categoria.

Request:

```json
{
  "name": "Salario"
}
```

Response 201:

```json
{
  "ok": true,
  "message": "Categoria creada correctamente.",
  "category": { "id": "uuid", "name": "Salario" }
}
```

## GET /categories/:id

Obtiene una categoria por id.

Response 200:

```json
{
  "id": "uuid",
  "householdId": "uuid",
  "name": "Salario",
  "isActive": true
}
```

## PATCH /categories/:id

Actualiza los campos de la categoria.

Request:

```json
{
  "name": "Salario principal"
}
```

Response 200:

```json
{
  "ok": true,
  "message": "Categoria actualizada correctamente.",
  "category": { "id": "uuid", "name": "Salario principal" }
}
```

## DELETE /categories/:id

Borrado suave: archiva la categoria (isActive = false).

Response 200:

```json
{
  "ok": true,
  "message": "Categoria archivada correctamente.",
  "category": { "id": "uuid", "isActive": false }
}
```

Errores comunes:
- 400 `Datos inválidos.`
- 401 `No autorizado.`
- 403 `No tienes acceso a este hogar.`
- 404 `Categoria no encontrada.`
