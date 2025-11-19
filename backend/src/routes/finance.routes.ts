import { Router } from 'express'
import { getTransactions, createTransaction, deleteTransaction, getSummary } from '../controllers/finance.controller'
import { auth } from '../middleware/auth'

const router = Router()

router.use(auth)

router.get('/transactions', getTransactions)
router.post('/transactions', createTransaction)
router.delete('/transactions/:id', deleteTransaction)
router.get('/summary', getSummary)

export default router
