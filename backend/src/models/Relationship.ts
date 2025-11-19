import mongoose, { Schema, Document } from 'mongoose'

// Special Date Model
export interface ISpecialDate extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  date: Date
  recurring: boolean
  type: 'anniversary' | 'birthday' | 'custom'
  createdAt: Date
  updatedAt: Date
}

const specialDateSchema = new Schema<ISpecialDate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    recurring: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      enum: ['anniversary', 'birthday', 'custom'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// Activity Model
export interface IActivity extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  date?: Date
  completed: boolean
  rating?: number
  createdAt: Date
  updatedAt: Date
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    date: Date,
    completed: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
)

// Moment Model
export interface IMoment extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description: string
  date: Date
  photos?: string[]
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const momentSchema = new Schema<IMoment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    photos: [String],
    tags: [String],
  },
  {
    timestamps: true,
  }
)

export const SpecialDate = mongoose.model<ISpecialDate>('SpecialDate', specialDateSchema)
export const Activity = mongoose.model<IActivity>('Activity', activitySchema)
export const Moment = mongoose.model<IMoment>('Moment', momentSchema)
