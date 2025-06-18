import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClassDTO {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @ApiProperty()
  name: string;
  @IsString({ message: 'Description must be a string' })
  @ApiProperty({ required: false })
  description?: string;
  @IsString({ message: 'Track must be a string' })
  @ApiProperty({ required: false })
  track?: string;
}