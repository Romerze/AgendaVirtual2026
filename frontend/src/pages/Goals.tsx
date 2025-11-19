import { Card, CardGrid } from '../components/ui/Card'
import { Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import { GOAL_AREA_ICONS, GOAL_AREA_LABELS } from '../utils/constants'
import { GoalArea } from '../types'

export default function Goals() {
  const goalAreas = Object.values(GoalArea)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Metas 2026</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Define y alcanza tus objetivos
          </p>
        </div>
        <Button>
          <Plus className="w-5 h-5 mr-2" />
          Nueva Meta
        </Button>
      </div>

      <CardGrid>
        {goalAreas.map((area) => (
          <Card key={area} title={`${GOAL_AREA_ICONS[area]} ${GOAL_AREA_LABELS[area]}`}>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Aún no hay metas en esta área
              </p>
              <Button variant="ghost" size="sm">
                Agregar meta
              </Button>
            </div>
          </Card>
        ))}
      </CardGrid>
    </div>
  )
}
