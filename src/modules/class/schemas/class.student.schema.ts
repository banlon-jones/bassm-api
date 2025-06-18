import mongoose from 'mongoose';

export const ClassStudentSchema = new mongoose.Schema({
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['enrolled', 'completed', 'dropped'],
    default: 'enrolled',
  },
  academyYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademyYear',
    required: true,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})
