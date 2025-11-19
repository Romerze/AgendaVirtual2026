import mongoose, { Schema, Document } from 'mongoose'

export enum Mood {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  OKAY = 'okay',
  BAD = 'bad',
  TERRIBLE = 'terrible',
}

interface IAIAnalysis {
  sentiment: number
  keywords: string[]
  suggestions: string[]
}

export interface IJournalEntry extends Document {
  userId: mongoose.Types.ObjectId
  date: Date
  mood: Mood
  feeling: string
  learned: string
  gratitude: string
  reflection: string
  aiAnalysis?: IAIAnalysis
  createdAt: Date
  updatedAt: Date
}

const journalEntrySchema = new Schema<IJournalEntry>(
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
    mood: {
      type: String,
      enum: Object.values(Mood),
      required: true,
    },
    feeling: {
      type: String,
      required: true,
    },
    learned: {
      type: String,
      required: true,
    },
    gratitude: {
      type: String,
      required: true,
    },
    reflection: {
      type: String,
      required: true,
    },
    aiAnalysis: {
      sentiment: Number,
      keywords: [String],
      suggestions: [String],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IJournalEntry>('JournalEntry', journalEntrySchema)
