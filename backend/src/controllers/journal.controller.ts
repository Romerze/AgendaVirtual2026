import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getEntries = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entries = await prisma.journalEntry.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'desc' },
    })

    const parsedEntries = entries.map((entry) => ({
      ...entry,
      aiAnalysis: entry.aiAnalysis ? JSON.parse(entry.aiAnalysis) : null,
    }))

    res.json({ success: true, data: parsedEntries })
  } catch (error) {
    next(error)
  }
}

export const createEntry = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { aiAnalysis, ...entryData } = req.body

    const entry = await prisma.journalEntry.create({
      data: {
        ...entryData,
        userId: req.userId!,
        aiAnalysis: aiAnalysis ? JSON.stringify(aiAnalysis) : null,
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...entry,
        aiAnalysis: entry.aiAnalysis ? JSON.parse(entry.aiAnalysis) : null,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const updateEntry = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { aiAnalysis, ...entryData } = req.body

    const existing = await prisma.journalEntry.findFirst({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (!existing) {
      throw new AppError('Journal entry not found', 404)
    }

    const entry = await prisma.journalEntry.update({
      where: { id: req.params.id },
      data: {
        ...entryData,
        aiAnalysis: aiAnalysis ? JSON.stringify(aiAnalysis) : undefined,
      },
    })

    res.json({
      success: true,
      data: {
        ...entry,
        aiAnalysis: entry.aiAnalysis ? JSON.parse(entry.aiAnalysis) : null,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const deleteEntry = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entry = await prisma.journalEntry.deleteMany({
      where: {
        id: req.params.id,
        userId: req.userId!,
      },
    })

    if (entry.count === 0) {
      throw new AppError('Journal entry not found', 404)
    }

    res.json({ success: true, message: 'Journal entry deleted' })
  } catch (error) {
    next(error)
  }
}
