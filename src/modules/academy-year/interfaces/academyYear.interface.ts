import { Document } from 'mongoose';

export interface AcademyYear extends Document{
  name: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}