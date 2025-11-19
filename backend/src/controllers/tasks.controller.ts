import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
    })

    const parsedTasks = tasks.map((task) => ({
      ...task,
      tags: task.tags ? JSON.parse(task.tags) : [],
      recurring: task.recurring ? JSON.parse(task.recurring) : null,
    }))

    res.json({ success: true, data: parsedTasks })
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
    const { tags, recurring, ...taskData } = req.body

    const task = await prisma.task.create({
      data: {
        ...taskData,
        userId: req.userId!,
        tags: tags ? JSON.stringify(tags) : null,
        recurring: recurring ? JSON.stringify(recurring) : null,
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...task,
        tags: task.tags ? JSON.parse(task.tags) : [],
        recurring: task.recurring ? JSON.parse(task.recurring) : null,
      },
    })
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
    const { tags, recurring, ...taskData } = req.body

    const existing = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (!existing) {
      throw new AppError('Task not found', 404)
    }

    const task = await prisma.task.update({
      where: { id: req.params.id },
      data: {
        ...taskData,
        tags: tags ? JSON.stringify(tags) : undefined,
        recurring: recurring ? JSON.stringify(recurring) : undefined,
      },
    })

    res.json({
      success: true,
      data: {
        ...task,
        tags: task.tags ? JSON.parse(task.tags) : [],
        recurring: task.recurring ? JSON.parse(task.recurring) : null,
      },
    })
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
    const task = await prisma.task.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (task.count === 0) {
      throw new AppError('Task not found', 404)
    }

    res.json({ success: true, message: 'Task deleted' })
  } catch (error) {
    next(error)
  }
}
