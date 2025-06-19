import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ required: true, type: String })
  @IsString()
  title: string; // Title of the lesson
  @ApiProperty({ required: false, type: String })
  @IsString()
  description?: string; // Optional description of the lesson
  @ApiProperty({ required: true, type: String })
  content: string; // Main content of the lesson, could be text, HTML, etc.
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  duration: number; // Duration of the lesson in minutes
  @ApiProperty({ required: true, type: String })
  @IsString()
  academyYearId: string; // Reference to the academy year
  @ApiProperty({ required: true, type: String })
  @IsString()
  classId: string; // Reference to the class this lesson belongs to
  @ApiProperty({ required: true, type: String })
  @IsString()
  teacherIds: string[]; // Reference to the teacher who created or is responsible for this lesson
}