import { Card } from '../components/ui/Card'
import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'

export default function Habits() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hábitos Diarios</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Construye rutinas que transformen tu vida
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Hábito
        </Button>
      </div>

      <Card title="Mis Hábitos">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Comienza a crear tus hábitos diarios
          </p>
        </div>
      </Card>
    </div>
  )
}
