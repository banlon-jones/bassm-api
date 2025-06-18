import mongoose from 'mongoose';

export const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  class:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  duration: {
    type: Number, // Duration in minutes
    required: true,
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }]
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})
