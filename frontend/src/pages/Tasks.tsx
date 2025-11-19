import { Card } from '../components/ui/Card'
import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'

export default function Tasks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tareas</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Gestiona tus pendientes de manera efectiva
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      <Card title="Tareas Pendientes">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No tienes tareas pendientes
          </p>
        </div>
      </Card>
    </div>
  )
}
