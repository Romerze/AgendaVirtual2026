import { Router } from 'express'
import { getWorkouts, createWorkout, getMeasurements, createMeasurement } from '../controllers/health.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/workouts', getWorkouts)
router.post('/workouts', createWorkout)
router.get('/measurements', getMeasurements)
router.post('/measurements', createMeasurement)

export default router
