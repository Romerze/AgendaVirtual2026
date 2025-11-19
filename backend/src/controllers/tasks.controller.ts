import { Response, NextFunction } from 'express'
import Task from '../models/Task'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json({ success: true, data: tasks })
  } catch (error) {
    next(error)
  }
}

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!task) {
      throw new AppError('Task not found', 404)
    }
    res.json({ success: true, data: task })
  } catch (error) {
    next(error)
  }
}

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!task) {
      throw new AppError('Task not found', 404)
    }
    res.json({ success: true, message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
}
