import { Module } from '@nestjs/common';
import { AttendanceService } from './services/attendance.service';
import { AttendanceController } from './controller/attendance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AttendanceSchema } from './schemas/attendance.schema';
import { LessonSchema } from '../lessons/schemas/lession.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Attendance',
      schema: AttendanceSchema // Assuming attendanceSchema is defined in the service
    },
      {name: 'Lesson', schema: LessonSchema}
    ])
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController]
})
export class AttendanceModule {}
