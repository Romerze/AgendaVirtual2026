import { Card } from '../components/ui/Card'
import { Plus, Heart } from 'lucide-react'
import Button from '../components/ui/Button'

export default function Relationship() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="w-8 h-8 text-pink-500" />
            Mi Relación
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Momentos especiales con Berni
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo Momento
        </Button>
      </div>

      <Card title="Fechas Especiales">
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Agrega fechas importantes
          </p>
        </div>
      </Card>
    </div>
  )
}
