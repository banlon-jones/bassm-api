import mongoose from 'mongoose';

export const FeePaymentSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fee',
    required: true,
  },
  academyYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademyYear',
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentMethod: {
    type: String,
    enum: ['CASH', 'BANK_TRANSFER', 'ONLINE', 'MOMO', 'OMO'],
    required: true,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})