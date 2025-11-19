import mongoose, { Schema, Document } from 'mongoose'

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

interface IRecurring {
  frequency: 'daily' | 'weekly' | 'monthly'
  interval: number
}

export interface ITask extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  priority: TaskPriority
  completed: boolean
  tags: string[]
  dueDate?: Date
  recurring?: IRecurring
  createdAt: Date
  updatedAt: Date
}

const taskSchema = new Schema<ITask>(
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
    priority: {
      type: String,
      enum: Object.values(TaskPriority),
      default: TaskPriority.MEDIUM,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    dueDate: Date,
    recurring: {
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly'],
      },
      interval: Number,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ITask>('Task', taskSchema)
