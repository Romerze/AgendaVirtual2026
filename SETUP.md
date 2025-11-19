# Guía de Instalación - Agenda Virtual 2026

## 📋 Requisitos Previos

- **Node.js** v18 o superior
- **npm** o **yarn**

¡No necesitas instalar ninguna base de datos! El proyecto usa **SQLite** que viene incluido.

## 🚀 Instalación Rápida

### 1. Clonar el repositorio
```bash
git clone <tu-repo-url>
cd AgendaVirtual2026
```

### 2. Instalar dependencias

Opción A - Instalar todo de una vez:
```bash
npm run install:all
```

Opción B - Instalar manualmente:
```bash
# Instalar dependencias raíz
npm install

# Instalar frontend
cd frontend
npm install

# Instalar backend
cd ../backend
npm install
```

### 3. Configurar la Base de Datos

¡No necesitas hacer nada! SQLite se configura automáticamente.

El archivo de base de datos se creará automáticamente en `backend/dev.db` cuando inicies el servidor por primera vez.

### 4. Configurar Variables de Entorno

**Backend** - Crea `/backend/.env`:
```bash
cd backend
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
PORT=5000
NODE_ENV=development

# Database (SQLite) - No necesitas cambiar esto
DATABASE_URL="file:./dev.db"

# JWT - IMPORTANTE: Cambia esto por un secreto único
JWT_SECRET=tu_secreto_super_seguro_cambialo_en_produccion
JWT_EXPIRES_IN=30d

# Google Calendar (Opcional - para integración)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:5000/api/auth/google/callback

# OpenAI (Opcional - para análisis del diario)
OPENAI_API_KEY=

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Frontend** - Crea `/frontend/.env`:
```bash
cd ../frontend
```

Crea archivo `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_GOOGLE_CLIENT_ID=
```

### 5. Generar la Base de Datos

**Importante:** Antes de ejecutar el proyecto por primera vez, genera la base de datos:

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

Esto creará el archivo `dev.db` con todas las tablas necesarias.

### 6. Ejecutar el Proyecto

**Opción A - Ejecutar todo simultáneamente (Recomendado):**
```bash
# Desde la raíz del proyecto
npm run dev
```

**Opción B - Ejecutar por separado:**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 7. Acceder a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health
- **Prisma Studio** (Ver/editar base de datos): `cd backend && npx prisma studio`

## 📦 Construir para Producción

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 🔧 Comandos Útiles

### Proyecto Raíz
```bash
npm run dev              # Ejecutar frontend y backend
npm run build            # Construir todo
npm run install:all      # Instalar todas las dependencias
```

### Frontend
```bash
npm run dev              # Modo desarrollo
npm run build            # Construir para producción
npm run preview          # Vista previa de producción
npm run lint             # Ejecutar linter
```

### Backend
```bash
npm run dev              # Modo desarrollo con nodemon
npm run build            # Compilar TypeScript
npm start                # Ejecutar versión compilada
npm run lint             # Ejecutar linter
```

## 🐛 Solución de Problemas

### Error: "Database connection failed"
- Verifica que ejecutaste `npx prisma migrate dev`
- Asegúrate de que `DATABASE_URL` esté configurado en `.env`
- El archivo `dev.db` debe existir en la carpeta `backend/`

### Error: "Prisma Client did not initialize yet"
- Ejecuta `npx prisma generate` en la carpeta backend
- Reinicia el servidor

### Error: "Port already in use"
- Cambia el puerto en `backend/.env`
- Mata el proceso que usa el puerto:
  ```bash
  # Linux/macOS
  lsof -ti:5000 | xargs kill

  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### Error: "CORS policy"
- Verifica que `CORS_ORIGIN` en backend `.env` coincida con tu frontend URL
- Asegúrate de que el backend esté corriendo

### Problemas con dependencias
```bash
# Limpiar caché e reinstalar
rm -rf node_modules package-lock.json
npm install

# O para todo el monorepo
npm run clean:all  # Si tienes este script
npm run install:all
```

## 📱 Próximos Pasos

1. **Crear tu primera cuenta** - Regístrate en la aplicación
2. **Configura tus metas 2026** - Define objetivos en cada área
3. **Agrega hábitos diarios** - Construye rutinas saludables
4. **Planifica tu calendario** - Organiza tus eventos
5. **Opcional**: Integra Google Calendar y OpenAI

## 🔐 Seguridad

⚠️ **IMPORTANTE**:
- Nunca compartas tu archivo `.env`
- Cambia `JWT_SECRET` en producción
- Usa HTTPS en producción
- Mantén tus API keys seguras

## 📚 Documentación Adicional

- [README.md](./README.md) - Visión general del proyecto
- [Backend API](./backend/README.md) - Documentación del API
- [Frontend Components](./frontend/README.md) - Guía de componentes

## 💬 Soporte

Si encuentras problemas, verifica:
1. Versiones de Node.js y MongoDB
2. Variables de entorno configuradas correctamente
3. Todos los servicios corriendo (MongoDB, Backend, Frontend)
4. Logs en la consola para errores específicos

---

¡Listo! Tu Agenda Virtual 2026 está configurada. 🚀

**Haz de 2026 tu mejor año** 💪
