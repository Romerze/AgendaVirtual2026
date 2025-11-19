import { Router } from 'express'
import { getEntries, createEntry, updateEntry, deleteEntry } from '../controllers/journal.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/', getEntries)
router.post('/', createEntry)
router.put('/:id', updateEntry)
router.delete('/:id', deleteEntry)

export default router
