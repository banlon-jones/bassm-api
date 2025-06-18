import mongoose from 'mongoose';

export const FeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  feeType: {
    type: String,
    enum: ['TUITION', 'OTHER'],
    default: 'TUITION',
    required: true,
  },
  isOptional: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})
