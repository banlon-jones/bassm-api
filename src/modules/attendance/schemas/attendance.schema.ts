import mongoose from 'mongoose';

export const AttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  academyYear: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AcademyYear',
    required: true,
  },
  type: {
    type: String,
    enum: ['CLASS', 'OUTREACH', "MISSION"],
    default: 'CLASS',
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'],
    default: 'PRESENT',
  },
  catchUpLink: {
    type: String,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})

