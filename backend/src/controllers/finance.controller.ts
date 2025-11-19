import { Response, NextFunction } from 'express'
import Transaction, { TransactionType } from '../models/Transaction'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getTransactions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transactions = await Transaction.find({ userId: req.userId }).sort({ date: -1 })
    res.json({ success: true, data: transactions })
  } catch (error) {
    next(error)
  }
}

export const createTransaction = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: transaction })
  } catch (error) {
    next(error)
  }
}

export const deleteTransaction = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!transaction) {
      throw new AppError('Transaction not found', 404)
    }
    res.json({ success: true, message: 'Transaction deleted' })
  } catch (error) {
    next(error)
  }
}

export const getSummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const transactions = await Transaction.find({ userId: req.userId })

    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === TransactionType.INCOME) {
          acc.totalIncome += transaction.amount
        } else {
          acc.totalExpenses += transaction.amount
          acc.categoryBreakdown[transaction.category] =
            (acc.categoryBreakdown[transaction.category] || 0) + transaction.amount
        }
        return acc
      },
      {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0,
        categoryBreakdown: {} as Record<string, number>,
      }
    )

    summary.balance = summary.totalIncome - summary.totalExpenses

    res.json({ success: true, data: summary })
  } catch (error) {
    next(error)
  }
}
