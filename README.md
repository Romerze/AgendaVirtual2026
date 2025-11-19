# Agenda Virtual 2026 🚀

Sistema completo de gestión personal integrado para 2026.

## 📋 Módulos

### 🔵 1. Calendario
- Vista mensual / semanal / diaria
- Eventos con código de colores por tipo (gym, trabajo, citas, familia, amor, estudio)
- Integración con Google Calendar

### 🟢 2. Metas 2026
Metas organizadas por áreas:
- 💼 Carrera (Salesforce Certs)
- 💰 Finanzas
- 💪 Fitness / Salud
- 🎯 Proyectos personales
- ❤️ Amor / Pareja
- 🚀 Negocios (Glint, TikTok, YouTube)

Cada meta incluye: pasos → hitos → plazos

### 🟣 3. Hábitos Diarios
- Lista de hábitos personalizables
- Progreso diario y semanal
- Sistema de rachas (streaks) estilo Duolingo

### 🔴 4. Tareas
- Prioridades (alta, media, baja)
- Tareas recurrentes
- Sistema de etiquetas

### 🟡 5. Diario / Journal
- Entradas diarias con:
  - Estado emocional
  - Aprendizajes del día
  - Gratitud
  - Reflexiones
- IA que analiza emociones y patrones

### 🟠 6. Finanzas
- Registro de ingresos y gastos
- Gráficos automáticos
- Alertas de gasto excesivo
- Estado financiero mensual

### ⚫ 7. Salud y Fitness
- Rutinas de entrenamiento
- Seguimiento de peso y mediciones
- Fotos de progreso
- Bitácora del gym
- Control de suplementación

### 🟤 8. Módulo de Relación
- Fechas especiales
- Planificación de actividades
- Ideas románticas automáticas
- Seguimiento de momentos especiales

## 🛠️ Stack Tecnológico

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui components
- FullCalendar
- Recharts / Chart.js
- React Query
- Zustand (state management)

### Backend
- Node.js + Express
- TypeScript
- **SQLite + Prisma** (no requiere instalación de base de datos)
- JWT Authentication
- OpenAI API (análisis de diario)
- Google Calendar API

## 📁 Estructura del Proyecto

```
AgendaVirtual2026/
├── frontend/          # Aplicación React
├── backend/           # API Node.js
├── shared/            # Tipos y utilidades compartidas
└── docs/              # Documentación
```

## 🚀 Instalación

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## 🔑 Variables de Entorno

### Backend (.env)
```
PORT=5000
DATABASE_URL="file:./dev.db"
JWT_SECRET=tu_secreto_jwt
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
OPENAI_API_KEY=tu_openai_api_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=tu_google_client_id
```

## 📝 Características Principales

- ✅ Autenticación segura con JWT
- ✅ Sincronización con Google Calendar
- ✅ Análisis de emociones con IA
- ✅ Dashboard personalizable
- ✅ Notificaciones y recordatorios
- ✅ Modo oscuro / claro
- ✅ Responsive design
- ✅ PWA (Progressive Web App)
- ✅ Exportación de datos

## 🎯 Roadmap 2026

- [ ] Fase 1: Estructura base y autenticación (Enero)
- [ ] Fase 2: Módulos de Calendario y Tareas (Febrero)
- [ ] Fase 3: Metas y Hábitos (Marzo)
- [ ] Fase 4: Diario y Finanzas (Abril)
- [ ] Fase 5: Salud y Relación (Mayo)
- [ ] Fase 6: Integraciones y IA (Junio)
- [ ] Fase 7: Optimización y PWA (Julio)

## 📄 Licencia

MIT

## 👨‍💻 Desarrollado con ❤️ para un 2026 extraordinario
