import { Response, NextFunction } from 'express'
import Habit from '../models/Habit'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getHabits = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habits = await Habit.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json({ success: true, data: habits })
  } catch (error) {
    next(error)
  }
}

export const createHabit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habit = await Habit.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: habit })
  } catch (error) {
    next(error)
  }
}

export const updateHabit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!habit) {
      throw new AppError('Habit not found', 404)
    }
    res.json({ success: true, data: habit })
  } catch (error) {
    next(error)
  }
}

export const deleteHabit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!habit) {
      throw new AppError('Habit not found', 404)
    }
    res.json({ success: true, message: 'Habit deleted' })
  } catch (error) {
    next(error)
  }
}

export const logHabit = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { date, completed } = req.body
    const habit = await Habit.findOne({ _id: req.params.id, userId: req.userId })

    if (!habit) {
      throw new AppError('Habit not found', 404)
    }

    // Add or update log
    const existingLogIndex = habit.logs.findIndex(
      (log) => log.date.toDateString() === new Date(date).toDateString()
    )

    if (existingLogIndex > -1) {
      habit.logs[existingLogIndex].completed = completed
    } else {
      habit.logs.push({ date, completed })
    }

    // Update streak
    // Simple streak calculation - can be improved
    if (completed) {
      habit.streak += 1
    } else {
      habit.streak = 0
    }

    await habit.save()

    res.json({ success: true, data: habit })
  } catch (error) {
    next(error)
  }
}
