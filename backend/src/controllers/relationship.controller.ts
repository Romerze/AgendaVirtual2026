import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getSpecialDates = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dates = await prisma.specialDate.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'asc' },
    })
    res.json({ success: true, data: dates })
  } catch (error) {
    next(error)
  }
}

export const createSpecialDate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const date = await prisma.specialDate.create({
      data: {
        ...req.body,
        userId: req.userId!,
      },
    })
    res.status(201).json({ success: true, data: date })
  } catch (error) {
    next(error)
  }
}

export const getActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activities = await prisma.activity.findMany({
      where: { userId: req.userId! },
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: activities })
  } catch (error) {
    next(error)
  }
}

export const createActivity = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activity = await prisma.activity.create({
      data: {
        ...req.body,
        userId: req.userId!,
      },
    })
    res.status(201).json({ success: true, data: activity })
  } catch (error) {
    next(error)
  }
}

export const getMoments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const moments = await prisma.moment.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'desc' },
    })

    const parsedMoments = moments.map((m) => ({
      ...m,
      photos: m.photos ? JSON.parse(m.photos) : [],
      tags: m.tags ? JSON.parse(m.tags) : [],
    }))

    res.json({ success: true, data: parsedMoments })
  } catch (error) {
    next(error)
  }
}

export const createMoment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { photos, tags, ...momentData } = req.body

    const moment = await prisma.moment.create({
      data: {
        ...momentData,
        userId: req.userId!,
        photos: photos ? JSON.stringify(photos) : null,
        tags: tags ? JSON.stringify(tags) : null,
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...moment,
        photos: moment.photos ? JSON.parse(moment.photos) : [],
        tags: moment.tags ? JSON.parse(moment.tags) : [],
      },
    })
  } catch (error) {
    next(error)
  }
}
