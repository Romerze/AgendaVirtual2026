import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getGoals = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const goals = await prisma.goal.findMany({
      where: { userId: req.userId! },
      include: {
        steps: true,
        milestones: true,
      },
      orderBy: { createdAt: 'desc' },
    })
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
    const { steps, milestones, ...goalData } = req.body

    const goal = await prisma.goal.create({
      data: {
        ...goalData,
        userId: req.userId!,
        steps: steps ? { create: steps } : undefined,
        milestones: milestones ? { create: milestones } : undefined,
      },
      include: {
        steps: true,
        milestones: true,
      },
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
    const { steps, milestones, ...goalData } = req.body

    const existing = await prisma.goal.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (!existing) {
      throw new AppError('Goal not found', 404)
    }

    const goal = await prisma.goal.update({
      where: { id: req.params.id },
      data: goalData,
      include: {
        steps: true,
        milestones: true,
      },
    })

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
    const goal = await prisma.goal.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (goal.count === 0) {
      throw new AppError('Goal not found', 404)
    }

    res.json({ success: true, message: 'Goal deleted' })
  } catch (error) {
    next(error)
  }
}
