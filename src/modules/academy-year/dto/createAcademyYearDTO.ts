import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAcademyYearDTO {
  @IsString()
  @ApiProperty({required: true, description: 'Name of the academy year'})
  @IsNotEmpty()
  name: string;
  @ApiProperty({required: true, description: 'Start date of the academy year'})
  @IsNotEmpty()
  startDate: Date;
  @ApiProperty({required: true, description: 'End date of the academy year'})
  @IsNotEmpty()
  endDate: Date;
  @ApiProperty({required: false, description: 'Is the academy year currently active'})
  isActive?: boolean;
}