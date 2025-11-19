import { Response, NextFunction } from 'express'
import { SpecialDate, Activity, Moment } from '../models/Relationship'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

// Special Dates
export const getSpecialDates = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const dates = await SpecialDate.find({ userId: req.userId }).sort({ date: 1 })
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
    const date = await SpecialDate.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: date })
  } catch (error) {
    next(error)
  }
}

// Activities
export const getActivities = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const activities = await Activity.find({ userId: req.userId }).sort({ createdAt: -1 })
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
    const activity = await Activity.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: activity })
  } catch (error) {
    next(error)
  }
}

// Moments
export const getMoments = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const moments = await Moment.find({ userId: req.userId }).sort({ date: -1 })
    res.json({ success: true, data: moments })
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
    const moment = await Moment.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: moment })
  } catch (error) {
    next(error)
  }
}
