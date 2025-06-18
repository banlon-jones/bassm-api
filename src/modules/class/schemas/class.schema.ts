import * as mongoose from 'mongoose';

export const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  track: {
    type: String,
    trim: true,
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
})