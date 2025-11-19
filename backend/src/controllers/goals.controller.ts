import { Response, NextFunction } from 'express'
import Goal from '../models/Goal'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getGoals = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goals = await Goal.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json({ success: true, data: goals })
  } catch (error) {
    next(error)
  }
}

export const createGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goal = await Goal.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: goal })
  } catch (error) {
    next(error)
  }
}

export const updateGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!goal) {
      throw new AppError('Goal not found', 404)
    }
    res.json({ success: true, data: goal })
  } catch (error) {
    next(error)
  }
}

export const deleteGoal = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!goal) {
      throw new AppError('Goal not found', 404)
    }
    res.json({ success: true, message: 'Goal deleted' })
  } catch (error) {
    next(error)
  }
}
