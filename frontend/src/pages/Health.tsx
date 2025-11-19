import { Card } from '../components/ui/Card'
import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'

export default function Health() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Salud & Fitness</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sigue tu progreso físico y entrenamientos
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Entrenamiento
        </Button>
      </div>

      <Card title="Entrenamientos Recientes">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Registra tus entrenamientos
          </p>
        </div>
      </Card>
    </div>
  )
}
