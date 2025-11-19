import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await prisma.calendarEvent.findMany({
      where: { userId: req.userId! },
      orderBy: { start: 'asc' },
    })
    res.json({ success: true, data: events })
  } catch (error) {
    next(error)
  }
}

export const createEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event = await prisma.calendarEvent.create({
      data: {
        ...req.body,
        userId: req.userId!,
      },
    })
    res.status(201).json({ success: true, data: event })
  } catch (error) {
    next(error)
  }
}

export const updateEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existing = await prisma.calendarEvent.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (!existing) {
      throw new AppError('Event not found', 404)
    }

    const event = await prisma.calendarEvent.update({
      where: { id: req.params.id },
      data: req.body,
    })

    res.json({ success: true, data: event })
  } catch (error) {
    next(error)
  }
}

export const deleteEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const event = await prisma.calendarEvent.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (event.count === 0) {
      throw new AppError('Event not found', 404)
    }

    res.json({ success: true, message: 'Event deleted' })
  } catch (error) {
    next(error)
  }
}
