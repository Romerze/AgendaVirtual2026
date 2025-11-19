import { Card, CardGrid } from '../components/ui/Card'
import {
  Calendar,
  Target,
  CheckSquare,
  ListTodo,
  TrendingUp,
  Flame,
} from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ¡Bienvenido a tu Agenda 2026! 🚀
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Tu centro de comando para un año extraordinario
        </p>
      </div>

      {/* Stats Grid */}
      <CardGrid>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Eventos Hoy</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">5</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Metas Activas</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Racha de Hábitos</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">23 días</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Tareas Pendientes</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
              <ListTodo className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hábitos Completados</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">5/7</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progreso del Mes</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">78%</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
          </div>
        </Card>
      </CardGrid>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Eventos de Hoy">
          <div className="space-y-3">
            <EventItem
              title="Gym - Entrenamiento de piernas"
              time="07:00 AM"
              color="bg-red-500"
            />
            <EventItem
              title="Reunión de equipo"
              time="10:00 AM"
              color="bg-blue-500"
            />
            <EventItem
              title="Almuerzo con Berni"
              time="01:00 PM"
              color="bg-pink-500"
            />
          </div>
        </Card>

        <Card title="Tareas Prioritarias">
          <div className="space-y-3">
            <TaskItem
              title="Completar módulo de Salesforce"
              priority="high"
            />
            <TaskItem
              title="Revisar finanzas del mes"
              priority="medium"
            />
            <TaskItem
              title="Planificar contenido de TikTok"
              priority="medium"
            />
          </div>
        </Card>
      </div>

      {/* Progress Overview */}
      <Card title="Progreso de Metas 2026">
        <div className="space-y-4">
          <GoalProgress
            title="Carrera - Salesforce Certs"
            progress={65}
            color="bg-blue-500"
          />
          <GoalProgress
            title="Fitness - Perder 10kg"
            progress={42}
            color="bg-green-500"
          />
          <GoalProgress
            title="Finanzas - Ahorrar $10,000"
            progress={38}
            color="bg-yellow-500"
          />
          <GoalProgress
            title="Negocios - 10k seguidores"
            progress={55}
            color="bg-purple-500"
          />
        </div>
      </Card>
    </div>
  )
}

function EventItem({ title, time, color }: { title: string; time: string; color: string }) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{title}</p>
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">{time}</span>
    </div>
  )
}

function TaskItem({ title, priority }: { title: string; priority: 'high' | 'medium' | 'low' }) {
  const colors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    low: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  }

  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <input type="checkbox" className="w-5 h-5 rounded text-blue-600" />
      <p className="flex-1 text-sm font-medium text-gray-900 dark:text-white">{title}</p>
      <span className={`text-xs px-2 py-1 rounded ${colors[priority]}`}>
        {priority}
      </span>
    </div>
  )
}

function GoalProgress({ title, progress, color }: { title: string; progress: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
