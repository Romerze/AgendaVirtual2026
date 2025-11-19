# Arquitectura - Agenda Virtual 2026

## 📐 Visión General

Agenda Virtual 2026 es una aplicación web full-stack construida con arquitectura moderna y escalable.

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────┐
│                   FRONTEND (React)                   │
│  ┌───────────┐  ┌──────────┐  ┌─────────────────┐  │
│  │   Pages   │  │Components│  │  State (Zustand)│  │
│  └─────┬─────┘  └────┬─────┘  └────────┬────────┘  │
│        │             │                  │            │
│        └─────────────┴──────────────────┘            │
│                      │                               │
│              ┌───────▼────────┐                      │
│              │  React Query   │                      │
│              │   (API Layer)  │                      │
│              └───────┬────────┘                      │
└──────────────────────┼──────────────────────────────┘
                       │ HTTP/REST
                       │
┌──────────────────────▼──────────────────────────────┐
│              BACKEND (Node.js/Express)              │
│  ┌──────────┐  ┌────────────┐  ┌───────────────┐  │
│  │  Routes  │→ │Controllers │→ │    Models     │  │
│  └──────────┘  └────────────┘  └───────┬───────┘  │
│                                         │           │
│  ┌──────────────────────────────────────▼────────┐ │
│  │            Middleware Layer                   │ │
│  │  • Authentication (JWT)                       │ │
│  │  • Error Handling                             │ │
│  │  • Validation                                 │ │
│  └───────────────────────────────────────────────┘ │
└──────────────────────┼──────────────────────────────┘
                       │ Mongoose ODM
                       │
┌──────────────────────▼──────────────────────────────┐
│                  MongoDB Database                    │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │  Users   │  │  Events  │  │  Goals/Habits/...│  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────┘
```

## 📁 Estructura de Directorios

### Frontend
```
frontend/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── layout/       # Layout components (Sidebar, Header)
│   │   ├── ui/           # UI primitives (Button, Card, Input)
│   │   ├── calendar/     # Componentes del calendario
│   │   ├── goals/        # Componentes de metas
│   │   ├── habits/       # Componentes de hábitos
│   │   └── ...           # Otros módulos
│   ├── pages/            # Páginas de la aplicación
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API calls y servicios
│   ├── store/            # Zustand stores
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilidades y helpers
│   ├── assets/           # Imágenes, fonts, etc.
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Estilos globales
├── public/               # Archivos estáticos
├── index.html           # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

### Backend
```
backend/
├── src/
│   ├── controllers/      # Lógica de negocio
│   │   ├── auth.controller.ts
│   │   ├── calendar.controller.ts
│   │   ├── goals.controller.ts
│   │   └── ...
│   ├── models/           # Mongoose schemas
│   │   ├── User.ts
│   │   ├── CalendarEvent.ts
│   │   ├── Goal.ts
│   │   └── ...
│   ├── routes/           # Express routes
│   │   ├── auth.routes.ts
│   │   ├── calendar.routes.ts
│   │   └── ...
│   ├── middleware/       # Middleware functions
│   │   ├── auth.ts
│   │   └── errorHandler.ts
│   ├── services/         # Servicios externos
│   ├── utils/            # Utilidades
│   ├── config/           # Configuración
│   │   └── database.ts
│   └── index.ts          # Entry point
├── .env.example
├── package.json
└── tsconfig.json
```

## 🔄 Flujo de Datos

### 1. Autenticación
```
User → Login Page → API Call → Backend Validation → JWT Token → Zustand Store → Protected Routes
```

### 2. Operaciones CRUD
```
User Action → Page Component → API Service → Backend Controller → Database → Response → React Query Cache → UI Update
```

### 3. Estado Global
```
Authentication State → Zustand (persist to localStorage)
Server Data → React Query (cache)
UI State → React useState/useReducer
```

## 🛡️ Seguridad

### Autenticación
- **JWT (JSON Web Tokens)** para autenticación stateless
- Tokens almacenados en `localStorage` (considerar `httpOnly cookies` para producción)
- Middleware de autenticación en todas las rutas protegidas

### Validación
- Validación en el frontend (UX)
- Validación en el backend (Seguridad)
- Mongoose schema validation

### Protección
- CORS configurado
- Rate limiting (por implementar)
- Helmet.js (por implementar)
- Input sanitization

## 📊 Base de Datos

### Modelos Principales

1. **User** - Usuarios del sistema
2. **CalendarEvent** - Eventos del calendario
3. **Goal** - Metas con steps y milestones
4. **Habit** - Hábitos con logs diarios
5. **Task** - Tareas con prioridades
6. **JournalEntry** - Entradas del diario
7. **Transaction** - Transacciones financieras
8. **Workout** - Entrenamientos
9. **BodyMeasurement** - Mediciones corporales
10. **SpecialDate** - Fechas especiales
11. **Activity** - Actividades de pareja
12. **Moment** - Momentos especiales

### Relaciones
- Todos los modelos tienen relación `userId` → `User._id`
- Indexes en `userId` para consultas eficientes
- Cascading deletes (por implementar)

## 🚀 Tecnologías

### Frontend
- **React 18** - Library UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **React Query** - Server state
- **Zustand** - Client state
- **Axios** - HTTP client
- **FullCalendar** - Calendario interactivo
- **Recharts** - Gráficos
- **Lucide React** - Iconos

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🔌 API Design

### RESTful Endpoints

```
Auth:
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

Calendar:
GET    /api/calendar/events
POST   /api/calendar/events
PUT    /api/calendar/events/:id
DELETE /api/calendar/events/:id

Goals:
GET    /api/goals
POST   /api/goals
PUT    /api/goals/:id
DELETE /api/goals/:id

... (similar para otros módulos)
```

### Response Format
```typescript
{
  success: boolean
  data?: T
  message?: string
  error?: string
}
```

## 🎯 Patrones de Diseño

### Frontend
- **Component Composition** - Componentes pequeños y reutilizables
- **Custom Hooks** - Lógica reutilizable
- **Container/Presentational** - Separación de lógica y presentación
- **Context + Hooks** - State management

### Backend
- **MVC Pattern** - Separación de responsabilidades
- **Middleware Chain** - Procesamiento de requests
- **Repository Pattern** - Abstracción de datos (Mongoose)
- **Error-first Callbacks** - Manejo de errores

## 📈 Escalabilidad

### Optimizaciones Implementadas
- Indexes en MongoDB
- React Query caching
- Code splitting (Vite)
- Lazy loading de componentes

### Por Implementar
- Redis caching
- CDN para assets
- Image optimization
- Database sharding
- Microservicios (si es necesario)
- WebSockets para real-time (notificaciones)

## 🧪 Testing (Por Implementar)

```
Frontend:
- Vitest + React Testing Library
- E2E con Playwright

Backend:
- Jest
- Supertest para API testing
```

## 📱 Responsive Design

- **Mobile First** approach
- Breakpoints de Tailwind
- Touch-friendly UI
- PWA capabilities (por implementar)

## 🔄 CI/CD (Por Implementar)

```
GitHub Actions:
├── Lint y Type checking
├── Unit tests
├── Build
├── Deploy to production
```

## 🌐 Deployment

### Opciones Recomendadas

**Frontend:**
- Vercel
- Netlify
- AWS S3 + CloudFront

**Backend:**
- Railway
- Render
- AWS EC2
- DigitalOcean

**Database:**
- MongoDB Atlas

---

Esta arquitectura está diseñada para ser:
- ✅ Escalable
- ✅ Mantenible
- ✅ Testable
- ✅ Segura
- ✅ Performance-optimizada
