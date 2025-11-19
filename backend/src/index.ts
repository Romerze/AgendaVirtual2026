import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/database'
import authRoutes from './routes/auth.routes'
import calendarRoutes from './routes/calendar.routes'
import goalsRoutes from './routes/goals.routes'
import habitsRoutes from './routes/habits.routes'
import tasksRoutes from './routes/tasks.routes'
import journalRoutes from './routes/journal.routes'
import financeRoutes from './routes/finance.routes'
import healthRoutes from './routes/health.routes'
import relationshipRoutes from './routes/relationship.routes'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/goals', goalsRoutes)
app.use('/api/habits', habitsRoutes)
app.use('/api/tasks', tasksRoutes)
app.use('/api/journal', journalRoutes)
app.use('/api/finance', financeRoutes)
app.use('/api/health', healthRoutes)
app.use('/api/relationship', relationshipRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Agenda Virtual 2026 API is running' })
})

// Error handler
app.use(errorHandler)

// Database connection and server start
const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
      console.log(`📅 Agenda Virtual 2026 API`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
