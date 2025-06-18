import { ApiProperty } from '@nestjs/swagger';

export class AssignStudentToClassDTO {
  @ApiProperty({required: true, type: String})
  classId: string;
  @ApiProperty({required: true, type: String})
  studentId: string;
  @ApiProperty({required: false, enum: ['enrolled', 'completed', 'dropped']})
  status?: 'enrolled' | 'completed' | 'dropped';
  @ApiProperty({required: true, type: String})
  academyYearId: string;
}
