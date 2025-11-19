import mongoose, { Schema, Document } from 'mongoose'

interface IHabitLog {
  date: Date
  completed: boolean
}

export interface IHabit extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  icon?: string
  color?: string
  streak: number
  logs: IHabitLog[]
  createdAt: Date
  updatedAt: Date
}

const habitSchema = new Schema<IHabit>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: String,
    icon: String,
    color: String,
    streak: {
      type: Number,
      default: 0,
    },
    logs: [
      {
        date: { type: Date, required: true },
        completed: { type: Boolean, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IHabit>('Habit', habitSchema)
