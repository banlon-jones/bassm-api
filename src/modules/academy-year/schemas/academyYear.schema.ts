import mongoose from 'mongoose';

export const AcademyYearSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})