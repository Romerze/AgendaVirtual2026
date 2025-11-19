import mongoose, { Schema, Document } from 'mongoose'

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId
  type: TransactionType
  amount: number
  category: string
  description?: string
  date: Date
  createdAt: Date
  updatedAt: Date
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: Object.values(TransactionType),
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: String,
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<ITransaction>('Transaction', transactionSchema)
