import { PrismaClient } from '@prisma/client'

// Singleton instance of Prisma Client
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

export const connectDB = async (): Promise<void> => {
  try {
    await prisma.$connect()
    console.log('✅ SQLite database connected successfully')
    console.log(`📦 Database: ${process.env.DATABASE_URL || 'file:./dev.db'}`)
  } catch (error) {
    console.error('❌ Database connection error:', error)
    throw error
  }
}

export const disconnectDB = async (): Promise<void> => {
  await prisma.$disconnect()
  console.log('⚠️  SQLite database disconnected')
}

// Handle cleanup on app termination
process.on('beforeExit', async () => {
  await disconnectDB()
})
