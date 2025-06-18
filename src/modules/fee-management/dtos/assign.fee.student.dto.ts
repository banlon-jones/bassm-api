import { ApiProperty } from '@nestjs/swagger';

export class AssignFeeStudentDto {
  @ApiProperty({ required: false })
  classIds?: string[]; // Reference to the academy year
  @ApiProperty({ required: false })
  studentIds?: string[]; // Due date for the fee payment
}
