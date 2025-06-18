import { Document } from 'mongoose';

export interface User extends Document {
  uid: string;
  name: string;
  email: string;
  phone_number: string;
  city: string;
  street_address?: string;
  role: 'STAFF' | 'TEACHER' | 'STUDENT';
  permissions?: string[];
}
