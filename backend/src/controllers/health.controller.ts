import { Response, NextFunction } from 'express'
import { prisma } from '../config/database'
import { AuthRequest } from '../middleware/auth'
import { AppError } from '../middleware/errorHandler'

export const getWorkouts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const workouts = await prisma.workout.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'desc' },
    })

    const parsedWorkouts = workouts.map((workout) => ({
      ...workout,
      exercises: workout.exercises ? JSON.parse(workout.exercises) : [],
    }))

    res.json({ success: true, data: parsedWorkouts })
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
    const { exercises, ...workoutData } = req.body

    const workout = await prisma.workout.create({
      data: {
        ...workoutData,
        userId: req.userId!,
        exercises: exercises ? JSON.stringify(exercises) : '[]',
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...workout,
        exercises: workout.exercises ? JSON.parse(workout.exercises) : [],
      },
    })
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
    const measurements = await prisma.bodyMeasurement.findMany({
      where: { userId: req.userId! },
      orderBy: { date: 'desc' },
    })

    const parsedMeasurements = measurements.map((m) => ({
      ...m,
      measurements: m.measurements ? JSON.parse(m.measurements) : null,
      photos: m.photos ? JSON.parse(m.photos) : [],
    }))

    res.json({ success: true, data: parsedMeasurements })
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
    const { measurements, photos, ...measurementData } = req.body

    const measurement = await prisma.bodyMeasurement.create({
      data: {
        ...measurementData,
        userId: req.userId!,
        measurements: measurements ? JSON.stringify(measurements) : null,
        photos: photos ? JSON.stringify(photos) : null,
      },
    })

    res.status(201).json({
      success: true,
      data: {
        ...measurement,
        measurements: measurement.measurements ? JSON.parse(measurement.measurements) : null,
        photos: measurement.photos ? JSON.parse(measurement.photos) : [],
      },
    })
  } catch (error) {
    next(error)
  }
}
