import { Card } from '../components/ui/Card'
import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'

export default function Journal() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Diario</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Reflexiona sobre tu día y tus emociones
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nueva Entrada
        </Button>
      </div>

      <Card title="Entradas Recientes">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Comienza a escribir tu diario
          </p>
        </div>
      </Card>
    </div>
  )
}
