import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Attendance } from '../interface/attendance.interface';
import { Lesson } from '../../lessons/interfaces/lesson.interface';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel('Attendance') private readonly attendanceModel: Model<Attendance>,
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,

  ) {}

  async createAttendance(req: any, lessonId: string, attendanceData: any): Promise<Attendance> {
    // Find the lesson
    const lesson = await this.lessonModel.findById(lessonId).exec();
    if (!lesson) throw new NotFoundException('Lesson not found');

    // Check if user is assigned to the lesson
    if (!lesson.assignedTo || !lesson.assignedTo.includes(req.user._id.toString())) {
      throw new ForbiddenException('You are not assigned to this lesson');
    }

    // Create attendance
    const attendance = new this.attendanceModel({
      ...attendanceData,
      lesson: lessonId,
      takenBy: req.user._id,
      takenAt: new Date(),
    });
    return await attendance.save();
  }
}
