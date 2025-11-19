import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getHabits = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId: req.userId! },
      include: { logs: true },
      orderBy: { createdAt: 'desc' },
    })
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
    const habit = await prisma.habit.create({
      data: {
        ...req.body,
        userId: req.userId!,
      },
      include: { logs: true },
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
    const existing = await prisma.habit.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (!existing) {
      throw new AppError('Habit not found', 404)
    }

    const habit = await prisma.habit.update({
      where: { id: req.params.id },
      data: req.body,
      include: { logs: true },
    })

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
    const habit = await prisma.habit.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (habit.count === 0) {
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

    const habit = await prisma.habit.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (!habit) {
      throw new AppError('Habit not found', 404)
    }

    await prisma.habitLog.upsert({
      where: {
        habitId_date: {
          habitId: req.params.id,
          date: new Date(date),
        },
      },
      update: { completed },
      create: {
        habitId: req.params.id,
        date: new Date(date),
        completed,
      },
    })

    const newStreak = completed ? habit.streak + 1 : 0
    const updatedHabit = await prisma.habit.update({
      where: { id: req.params.id },
      data: { streak: newStreak },
      include: { logs: true },
    })

    res.json({ success: true, data: updatedHabit })
  } catch (error) {
    next(error)
  }
}
