import { Router } from 'express'
import {
  getSpecialDates,
  createSpecialDate,
  getActivities,
  createActivity,
  getMoments,
  createMoment,
} from '../controllers/relationship.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/special-dates', getSpecialDates)
router.post('/special-dates', createSpecialDate)
router.get('/activities', getActivities)
router.post('/activities', createActivity)
router.get('/moments', getMoments)
router.post('/moments', createMoment)

export default router
