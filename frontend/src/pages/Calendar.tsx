import { Card } from '../components/ui/Card'

export default function Calendar() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Calendario 2026</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Organiza tus eventos y citas
        </p>
      </div>

      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            Calendario interactivo - En desarrollo
          </p>
        </div>
      </Card>
    </div>
  )
}
