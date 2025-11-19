import mongoose, { Schema, Document } from 'mongoose'

interface IMeasurements {
  chest?: number
  waist?: number
  hips?: number
  arms?: number
  thighs?: number
}

export interface IBodyMeasurement extends Document {
  userId: mongoose.Types.ObjectId
  date: Date
  weight?: number
  bodyFat?: number
  measurements?: IMeasurements
  photos?: string[]
  createdAt: Date
  updatedAt: Date
}

const bodyMeasurementSchema = new Schema<IBodyMeasurement>(
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
    weight: Number,
    bodyFat: Number,
    measurements: {
      chest: Number,
      waist: Number,
      hips: Number,
      arms: Number,
      thighs: Number,
    },
    photos: [String],
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<IBodyMeasurement>('BodyMeasurement', bodyMeasurementSchema)
