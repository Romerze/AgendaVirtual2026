import { Router } from 'express'
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goals.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/', getGoals)
router.post('/', createGoal)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

export default router
