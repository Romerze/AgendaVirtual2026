import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@agenda2026.com' },
    update: {},
    create: {
      email: 'admin@agenda2026.com',
      name: 'Admin User',
      password: hashedPassword,
    },
  })

  console.log('✅ Admin user created:')
  console.log('   📧 Email: admin@agenda2026.com')
  console.log('   🔑 Password: admin123')
  console.log('   👤 Name:', admin.name)
  console.log('   🆔 ID:', admin.id)

  // Create some demo data for the admin user
  console.log('\n🎯 Creating demo data...')

  // Create a sample goal
  await prisma.goal.create({
    data: {
      userId: admin.id,
      title: 'Obtener certificación Salesforce Admin',
      description: 'Estudiar y aprobar el examen de Salesforce Administrator',
      area: 'career',
      progress: 35,
      deadline: new Date('2026-06-30'),
      steps: {
        create: [
          { title: 'Completar Trailhead modules', completed: true, order: 1 },
          { title: 'Hacer exámenes de práctica', completed: false, order: 2 },
          { title: 'Agendar y tomar examen', completed: false, order: 3 },
        ],
      },
      milestones: {
        create: [
          { title: '50% Trailhead completado', completed: true },
          { title: 'Aprobar examen de práctica', completed: false },
          { title: 'Certificación obtenida', completed: false },
        ],
      },
    },
  })

  // Create sample habits
  await prisma.habit.createMany({
    data: [
      {
        userId: admin.id,
        title: 'Gym',
        description: 'Entrenar 5 veces por semana',
        icon: '💪',
        color: '#FF6B6B',
        streak: 7,
      },
      {
        userId: admin.id,
        title: 'Leer',
        description: 'Leer 30 minutos diarios',
        icon: '📚',
        color: '#4ECDC4',
        streak: 12,
      },
      {
        userId: admin.id,
        title: 'Meditar',
        description: 'Meditar 10 minutos por la mañana',
        icon: '🧘',
        color: '#95E1D3',
        streak: 5,
      },
    ],
  })

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        userId: admin.id,
        title: 'Revisar finanzas del mes',
        priority: 'high',
        completed: false,
        tags: JSON.stringify(['finanzas', 'mensual']),
        dueDate: new Date('2026-01-31'),
      },
      {
        userId: admin.id,
        title: 'Planificar contenido TikTok',
        priority: 'medium',
        completed: false,
        tags: JSON.stringify(['negocios', 'contenido']),
      },
      {
        userId: admin.id,
        title: 'Comprar suplementos',
        priority: 'low',
        completed: true,
        tags: JSON.stringify(['salud', 'compras']),
      },
    ],
  })

  // Create a calendar event
  await prisma.calendarEvent.create({
    data: {
      userId: admin.id,
      title: 'Entrenamiento de piernas',
      description: 'Rutina de piernas y glúteos',
      start: new Date('2026-01-20T07:00:00'),
      end: new Date('2026-01-20T08:30:00'),
      type: 'gym',
      color: '#FF6B6B',
      location: 'Gym Central',
    },
  })

  // Create a journal entry
  await prisma.journalEntry.create({
    data: {
      userId: admin.id,
      date: new Date(),
      mood: 'good',
      feeling: 'Me siento motivado para alcanzar mis metas este año',
      learned: 'Aprendí sobre Prisma y SQLite, muy interesante',
      gratitude: 'Agradecido por la salud y las oportunidades',
      reflection: 'Necesito mantener la consistencia en mis hábitos',
    },
  })

  // Create financial transactions
  await prisma.transaction.createMany({
    data: [
      {
        userId: admin.id,
        type: 'income',
        amount: 3500,
        category: 'Salario',
        description: 'Salario mensual',
        date: new Date('2026-01-01'),
      },
      {
        userId: admin.id,
        type: 'expense',
        amount: 50,
        category: 'Gym',
        description: 'Membresía gym',
        date: new Date('2026-01-05'),
      },
      {
        userId: admin.id,
        type: 'expense',
        amount: 200,
        category: 'Alimentación',
        description: 'Supermercado',
        date: new Date('2026-01-10'),
      },
    ],
  })

  console.log('✅ Demo data created successfully!')
  console.log('\n🚀 You can now login with:')
  console.log('   Email: admin@agenda2026.com')
  console.log('   Password: admin123')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
