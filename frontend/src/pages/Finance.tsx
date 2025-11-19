import { Card, CardGrid } from '../components/ui/Card'
import { Plus, TrendingUp, TrendingDown } from 'lucide-react'
import Button from '../components/ui/Button'

export default function Finance() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Finanzas</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Controla tus ingresos y gastos
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nueva Transacción
        </Button>
      </div>

      <CardGrid>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Ingresos del mes</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">$0</p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Gastos del mes</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">$0</p>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Balance</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">$0</p>
            </div>
          </div>
        </Card>
      </CardGrid>
    </div>
  )
}
