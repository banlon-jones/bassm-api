import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  name: {type: String, required: true, trim: true},
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  phone_number: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  street_address: {
    type: String,
    required: false,
    trim: true,
  },
  role: {
    type: String,
    enum: ['STAFF', 'STUDENT'],
    default: 'STUDENT',
  },
  permissions: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})