import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
  @ApiProperty({ required: true, type: String })
  studentId: string; // Reference to the student
  @ApiProperty({ required: true, type: String })
  lessonId: string; // Reference to the lesson
  @ApiProperty({ required: true, type: String })
  academyYearId: string; // Reference to the academy year
  @ApiProperty({ required: true, enum: ['CLASS', 'OUTREACH', 'MISSION'] })
  type: 'CLASS' | 'OUTREACH' | 'MISSION'; // Type of attendance
  @ApiProperty({ required: true, type: Date })
  date: Date; // Date of the attendance
  @ApiProperty({ required: true, enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED'] })
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED'; // Attendance status
  @ApiProperty({ required: false, type: String })
  catchUpLink?: string; // Optional link for catch-up sessions
}