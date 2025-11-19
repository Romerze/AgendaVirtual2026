import mongoose, { Schema, Document } from 'mongoose'

export enum EventType {
  GYM = 'gym',
  WORK = 'work',
  APPOINTMENT = 'appointment',
  FAMILY = 'family',
  LOVE = 'love',
  STUDY = 'study',
}

export interface ICalendarEvent extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description?: string
  start: Date
  end: Date
  type: EventType
  color?: string
  location?: string
  googleEventId?: string
  createdAt: Date
  updatedAt: Date
}

const calendarEventSchema = new Schema<ICalendarEvent>(
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
    start: {
      type: Date,
      required: [true, 'Start date is required'],
    },
    end: {
      type: Date,
      required: [true, 'End date is required'],
    },
    type: {
      type: String,
      enum: Object.values(EventType),
      required: true,
    },
    color: String,
    location: String,
    googleEventId: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ICalendarEvent>('CalendarEvent', calendarEventSchema)
