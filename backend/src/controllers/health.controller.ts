import { Response, NextFunction } from 'express'
import Workout from '../models/Workout'
import BodyMeasurement from '../models/BodyMeasurement'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getWorkouts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workouts = await Workout.find({ userId: req.userId }).sort({ date: -1 })
    res.json({ success: true, data: workouts })
  } catch (error) {
    next(error)
  }
}

export const createWorkout = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workout = await Workout.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: workout })
  } catch (error) {
    next(error)
  }
}

export const getMeasurements = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const measurements = await BodyMeasurement.find({ userId: req.userId }).sort({ date: -1 })
    res.json({ success: true, data: measurements })
  } catch (error) {
    next(error)
  }
}

export const createMeasurement = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const measurement = await BodyMeasurement.create({
      ...req.body,
      userId: req.userId,
    })
    res.status(201).json({ success: true, data: measurement })
  } catch (error) {
    next(error)
  }
}
