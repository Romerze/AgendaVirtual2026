import mongoose, { Schema, Document } from 'mongoose'

interface IWorkoutExercise {
  name: string
  sets: number
  reps: number
  weight?: number
  notes?: string
}

export interface IWorkout extends Document {
  userId: mongoose.Types.ObjectId
  date: Date
  type: string
  exercises: IWorkoutExercise[]
  duration: number
  notes?: string
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: Number,
        notes: String,
      },
    ],
    duration: {
      type: Number,
      required: true,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IWorkout>('Workout', workoutSchema)
