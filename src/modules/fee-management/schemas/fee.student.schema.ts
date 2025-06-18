import mongoose from 'mongoose';

export const FeeStudentSchema = new mongoose.Schema({
  fee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fee',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  academyYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademyYear',
    required: true,
  },
  dueDate: {
    type: Date,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})