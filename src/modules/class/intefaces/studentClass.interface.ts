import { Document } from 'mongoose';

export interface ClassStudent extends Document{
  classId: string;
  studentId: string;
  status: 'enrolled' | 'completed' | 'dropped';
  academyYearId: string;
}
