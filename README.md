# API Universidad - Sequelize

Backend para gestión de estudiantes, profesores, cursos y matrículas con arquitectura MVC.

## Estructura del Proyecto

```
university-sequelize/
├── config/           # Configuración de Sequelize
├── models/           # Modelos de Sequelize
├── services/         # Lógica de negocio
├── controllers/      # Controladores de rutas
├── routes/           # Definición de endpoints
├── server.js         # Servidor Express
└── seed.js           # Datos de prueba
```

## Instalación

```bash
npm install
```

## Configuración

Edita el archivo `.env` con tu conexión a la base de datos:

```
DATABASE_URL=tu_connection_string
PORT=3000
```

## Iniciar el servidor

```bash
npm run dev
```

El servidor sincronizará automáticamente los modelos con la base de datos al iniciar.

## Poblar la base de datos (opcional)

```bash
npm run seed
```

---

## Endpoints API

### 1. Estudiantes (`/api/students`)

#### GET /api/students
Obtener todos los estudiantes con sus cursos matriculados.

**Query Params:**
- `nombre` - Filtrar por nombre (búsqueda parcial, case-insensitive)
- `correo` - Filtrar por correo (búsqueda parcial, case-insensitive)
- `limit` - Limitar número de resultados
- `offset` - Saltar resultados (paginación)

**Ejemplos:**
```
GET /api/students
GET /api/students?nombre=Carlos
GET /api/students?correo=@universidad.edu
GET /api/students?limit=10&offset=0
```

#### GET /api/students/:id
Obtener un estudiante por ID con sus cursos.

**Path Params:**
- `id` - ID del estudiante

**Ejemplo:**
```
GET /api/students/1
```

#### POST /api/students
Crear un nuevo estudiante.

**Body:**
```json
{
  "documento": "1001234567",
  "nombre": "Carlos Rodríguez",
  "correo": "carlos@universidad.edu"
}
```

#### PUT /api/students/:id
Actualizar un estudiante existente.

**Path Params:**
- `id` - ID del estudiante

**Body:**
```json
{
  "nombre": "Carlos Alberto Rodríguez",
  "correo": "carlos.rodriguez@universidad.edu"
}
```

#### DELETE /api/students/:id
Eliminar un estudiante.

**Path Params:**
- `id` - ID del estudiante

---

### 2. Profesores (`/api/professors`)

#### GET /api/professors
Obtener todos los profesores con sus cursos.

**Query Params:**
- `nombre` - Filtrar por nombre (búsqueda parcial, case-insensitive)
- `especialidad` - Filtrar por especialidad (búsqueda parcial, case-insensitive)
- `limit` - Limitar número de resultados
- `offset` - Saltar resultados (paginación)

**Ejemplos:**
```
GET /api/professors
GET /api/professors?nombre=Juan
GET /api/professors?especialidad=Matemáticas
GET /api/professors?limit=5&offset=0
```

#### GET /api/professors/:id
Obtener un profesor por ID con sus cursos.

**Path Params:**
- `id` - ID del profesor

**Ejemplo:**
```
GET /api/professors/1
```

#### POST /api/professors
Crear un nuevo profesor.

**Body:**
```json
{
  "documento": "123456789",
  "nombre": "Dr. Juan Pérez",
  "especialidad": "Matemáticas"
}
```

#### PUT /api/professors/:id
Actualizar un profesor existente.

**Path Params:**
- `id` - ID del profesor

**Body:**
```json
{
  "nombre": "Dr. Juan Carlos Pérez",
  "especialidad": "Matemáticas Aplicadas"
}
```

#### DELETE /api/professors/:id
Eliminar un profesor.

**Path Params:**
- `id` - ID del profesor

---

### 3. Cursos (`/api/courses`)

#### GET /api/courses
Obtener todos los cursos con profesor y estudiantes matriculados.

**Query Params:**
- `nombre` - Filtrar por nombre (búsqueda parcial, case-insensitive)
- `codigo` - Filtrar por código (búsqueda parcial, case-insensitive)
- `professorId` - Filtrar por ID del profesor
- `limit` - Limitar número de resultados
- `offset` - Saltar resultados (paginación)

**Ejemplos:**
```
GET /api/courses
GET /api/courses?nombre=Cálculo
GET /api/courses?codigo=MAT
GET /api/courses?professorId=1
GET /api/courses?limit=10&offset=0
```

#### GET /api/courses/:id
Obtener un curso por ID con profesor y estudiantes.

**Path Params:**
- `id` - ID del curso

**Ejemplo:**
```
GET /api/courses/1
```

#### POST /api/courses
Crear un nuevo curso.

**Body:**
```json
{
  "codigo": "MAT101",
  "nombre": "Cálculo I",
  "creditos": 4,
  "professorId": 1
}
```

#### PUT /api/courses/:id
Actualizar un curso existente.

**Path Params:**
- `id` - ID del curso

**Body:**
```json
{
  "nombre": "Cálculo Diferencial",
  "creditos": 5,
  "professorId": 1
}
```

#### DELETE /api/courses/:id
Eliminar un curso.

**Path Params:**
- `id` - ID del curso

---

### 4. Matrículas (`/api/enrollments`)

#### GET /api/enrollments
Obtener todas las matrículas con información de estudiante y curso.

**Query Params:**
- `studentId` - Filtrar por ID del estudiante
- `courseId` - Filtrar por ID del curso
- `notaMin` - Filtrar por nota mínima
- `notaMax` - Filtrar por nota máxima
- `limit` - Limitar número de resultados
- `offset` - Saltar resultados (paginación)

**Ejemplos:**
```
GET /api/enrollments
GET /api/enrollments?studentId=1
GET /api/enrollments?courseId=2
GET /api/enrollments?notaMin=4.0
GET /api/enrollments?notaMin=3.0&notaMax=4.5
GET /api/enrollments?limit=20&offset=0
```

#### GET /api/enrollments/:id
Obtener una matrícula por ID con información completa.

**Path Params:**
- `id` - ID de la matrícula

**Ejemplo:**
```
GET /api/enrollments/1
```

#### POST /api/enrollments
Matricular un estudiante en un curso.

**Body:**
```json
{
  "studentId": 1,
  "courseId": 1,
  "notaFinal": null
}
```

#### PUT /api/enrollments/:id
Actualizar una matrícula (generalmente para registrar nota).

**Path Params:**
- `id` - ID de la matrícula

**Body:**
```json
{
  "notaFinal": 4.5
}
```

#### DELETE /api/enrollments/:id
Eliminar una matrícula.

**Path Params:**
- `id` - ID de la matrícula

---

## Modelos y Relaciones

### Student
- `id` (PK, auto-increment)
- `documento` (único)
- `nombre`
- `correo` (único, validado)
- Relación: belongsToMany Course (through Enrollment)

### Professor
- `id` (PK, auto-increment)
- `documento` (único)
- `nombre`
- `especialidad`
- Relación: hasMany Course

### Course
- `id` (PK, auto-increment)
- `codigo` (único)
- `nombre`
- `creditos`
- `professorId` (FK)
- Relaciones:
  - belongsTo Professor
  - belongsToMany Student (through Enrollment)

### Enrollment
- `id` (PK, auto-increment)
- `studentId` (FK)
- `courseId` (FK)
- `notaFinal` (0-5, nullable)
- Índice único: (studentId, courseId)
- Relaciones:
  - belongsTo Student
  - belongsTo Course

---

## Características Implementadas

✅ Arquitectura MVC (Models, Controllers, Services, Routes)
✅ 5 endpoints CRUD por cada modelo (GET all, GET by id, POST, PUT, DELETE)
✅ Query params para filtrado y paginación
✅ Path params para operaciones específicas
✅ Relaciones entre modelos con Sequelize
✅ Validaciones en modelos
✅ Manejo de errores
✅ Sincronización automática de base de datos al iniciar
✅ Operadores de Sequelize (Op.iLike, Op.gte, Op.lte)
