import { Router } from 'express'
import { getHabits, createHabit, updateHabit, deleteHabit, logHabit } from '../controllers/habits.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/', getHabits)
router.post('/', createHabit)
router.put('/:id', updateHabit)
router.delete('/:id', deleteHabit)
router.post('/:id/log', logHabit)

export default router
