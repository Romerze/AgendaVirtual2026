import { Response, NextFunction } from 'express'
import JournalEntry from '../models/JournalEntry'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getEntries = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const entries = await JournalEntry.find({ userId: req.userId }).sort({ date: -1 })
    res.json({ success: true, data: entries })
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
    const entry = await JournalEntry.create({
      ...req.body,
      userId: req.userId,
    })

    // TODO: Add AI analysis using OpenAI API
    // This would analyze sentiment, extract keywords, and provide suggestions

    res.status(201).json({ success: true, data: entry })
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
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!entry) {
      throw new AppError('Journal entry not found', 404)
    }
    res.json({ success: true, data: entry })
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
    const entry = await JournalEntry.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!entry) {
      throw new AppError('Journal entry not found', 404)
    }
    res.json({ success: true, message: 'Journal entry deleted' })
  } catch (error) {
    next(error)
  }
}
