# Backend - Agenda Virtual 2026

API RESTful construida con Node.js, Express, TypeScript y Prisma (SQLite).

## 🚀 Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env

# 3. Generar Prisma Client
npx prisma generate

# 4. Crear base de datos y ejecutar migraciones
npx prisma migrate dev --name init

# 5. (OPCIONAL) Crear usuario admin y datos de prueba
npm run prisma:seed

# 6. Ejecutar servidor
npm run dev
```

## 👤 Usuario Admin de Prueba

Después de ejecutar `npm run prisma:seed`, puedes iniciar sesión con:

- **Email:** `admin@agenda2026.com`
- **Password:** `admin123`

El seed también crea datos de ejemplo:
- 🎯 Meta de certificación Salesforce
- 💪 Hábitos (Gym, Leer, Meditar) con rachas
- ✅ Tareas con diferentes prioridades
- 📅 Evento de calendario
- 📝 Entrada de diario
- 💰 Transacciones financieras

## 📋 Scripts Disponibles

```bash
npm run dev              # Servidor en modo desarrollo
npm run build            # Compilar TypeScript
npm start                # Ejecutar versión compilada
npm run lint             # Linter ESLint

# Prisma
npm run prisma:generate  # Generar Prisma Client
npm run prisma:migrate   # Ejecutar migraciones
npm run prisma:studio    # Abrir Prisma Studio (GUI)
npm run prisma:seed      # Crear usuario admin y datos de prueba
```

## 🗄️ Base de Datos

Este proyecto usa **SQLite** con **Prisma ORM**.

### Ver datos en Prisma Studio

```bash
npx prisma studio
```

Esto abrirá una interfaz web en `http://localhost:5555` donde puedes ver y editar los datos.

### Recrear base de datos

Si necesitas empezar de cero:

```bash
# Eliminar base de datos
rm -f dev.db dev.db-journal

# Recrear migraciones
npx prisma migrate dev --name init

# Volver a crear datos de prueba
npm run prisma:seed
```

## 🔑 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
PORT=5000
NODE_ENV=development

# Database (SQLite)
DATABASE_URL="file:./dev.db"

# JWT
JWT_SECRET=tu_secreto_super_seguro
JWT_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Calendar
- `GET /api/calendar/events` - Listar eventos
- `POST /api/calendar/events` - Crear evento
- `PUT /api/calendar/events/:id` - Actualizar evento
- `DELETE /api/calendar/events/:id` - Eliminar evento

### Goals
- `GET /api/goals` - Listar metas
- `POST /api/goals` - Crear meta
- `PUT /api/goals/:id` - Actualizar meta
- `DELETE /api/goals/:id` - Eliminar meta

### Habits
- `GET /api/habits` - Listar hábitos
- `POST /api/habits` - Crear hábito
- `PUT /api/habits/:id` - Actualizar hábito
- `DELETE /api/habits/:id` - Eliminar hábito
- `POST /api/habits/:id/log` - Registrar hábito del día

### Tasks
- `GET /api/tasks` - Listar tareas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

### Journal
- `GET /api/journal` - Listar entradas
- `POST /api/journal` - Crear entrada
- `PUT /api/journal/:id` - Actualizar entrada
- `DELETE /api/journal/:id` - Eliminar entrada

### Finance
- `GET /api/finance/transactions` - Listar transacciones
- `POST /api/finance/transactions` - Crear transacción
- `DELETE /api/finance/transactions/:id` - Eliminar transacción
- `GET /api/finance/summary` - Obtener resumen financiero

### Health
- `GET /api/health/workouts` - Listar entrenamientos
- `POST /api/health/workouts` - Crear entrenamiento
- `GET /api/health/measurements` - Listar mediciones
- `POST /api/health/measurements` - Crear medición

### Relationship
- `GET /api/relationship/special-dates` - Listar fechas especiales
- `POST /api/relationship/special-dates` - Crear fecha especial
- `GET /api/relationship/activities` - Listar actividades
- `POST /api/relationship/activities` - Crear actividad
- `GET /api/relationship/moments` - Listar momentos
- `POST /api/relationship/moments` - Crear momento

## 🏗️ Estructura del Proyecto

```
backend/
├── prisma/
│   ├── schema.prisma      # Schema de base de datos
│   └── seed.ts            # Datos iniciales
├── src/
│   ├── config/
│   │   └── database.ts    # Prisma client
│   ├── controllers/       # Lógica de negocio
│   ├── middleware/        # Auth, error handling
│   ├── routes/            # Rutas Express
│   └── index.ts           # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## 🔒 Autenticación

Todas las rutas (excepto `/auth/register` y `/auth/login`) requieren un token JWT en el header:

```
Authorization: Bearer <token>
```

## 🐛 Debugging

Para ver las queries de Prisma en la consola, configura en `.env`:

```env
DATABASE_URL="file:./dev.db?connection_limit=1&pool_timeout=20"
```

Y en `src/config/database.ts` el log está configurado para modo desarrollo.

## 📦 Migración a Producción

Para usar PostgreSQL o MySQL en producción:

1. Actualiza `schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // o "mysql"
  url      = env("DATABASE_URL")
}
```

2. Actualiza la `DATABASE_URL` en `.env`

3. Ejecuta las migraciones:
```bash
npx prisma migrate deploy
```

## ✨ Características

- ✅ TypeScript con type-safety completo
- ✅ Prisma ORM con migraciones automáticas
- ✅ JWT Authentication
- ✅ Error handling centralizado
- ✅ Validación de datos
- ✅ CORS configurado
- ✅ SQLite para desarrollo (fácil migración a PostgreSQL/MySQL)
