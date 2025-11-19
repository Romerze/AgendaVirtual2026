import mongoose, { Schema, Document } from 'mongoose'

export enum GoalArea {
  CAREER = 'career',
  FINANCE = 'finance',
  FITNESS = 'fitness',
  PERSONAL = 'personal',
  LOVE = 'love',
  BUSINESS = 'business',
}

interface IStep {
  title: string
  completed: boolean
  order: number
}

interface IMilestone {
  title: string
  completed: boolean
  deadline?: Date
}

export interface IGoal extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  area: GoalArea
  steps: IStep[]
  milestones: IMilestone[]
  deadline?: Date
  progress: number
  createdAt: Date
  updatedAt: Date
}

const goalSchema = new Schema<IGoal>(
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
    area: {
      type: String,
      enum: Object.values(GoalArea),
      required: true,
    },
    steps: [
      {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        order: { type: Number, required: true },
      },
    ],
    milestones: [
      {
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
        deadline: Date,
      },
    ],
    deadline: Date,
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IGoal>('Goal', goalSchema)
