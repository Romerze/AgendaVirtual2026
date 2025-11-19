import { Router } from 'express'
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/calendar.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/events', getEvents)
router.post('/events', createEvent)
router.put('/events/:id', updateEvent)
router.delete('/events/:id', deleteEvent)

export default router
