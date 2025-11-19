import { Response, NextFunction } from 'express'
import CalendarEvent from '../models/CalendarEvent'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const events = await CalendarEvent.find({ userId: req.userId }).sort({ start: 1 })
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
    const event = await CalendarEvent.create({
      ...req.body,
      userId: req.userId,
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
    const event = await CalendarEvent.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    )
    if (!event) {
      throw new AppError('Event not found', 404)
    }
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
    const event = await CalendarEvent.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    })
    if (!event) {
      throw new AppError('Event not found', 404)
    }
    res.json({ success: true, message: 'Event deleted' })
  } catch (error) {
    next(error)
  }
}
