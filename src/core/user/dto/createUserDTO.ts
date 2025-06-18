import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  name: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString({ message: 'Phone number must be a string' })
  phone_number: string;
  @ApiProperty()
  @IsString({ message: 'City must be a string' })
  city: string;
  @ApiProperty({ required: false })
  street_address?: string;
  @ApiProperty({ enum: ['STAFF', 'STUDENT'], default: 'STUDENT' })
  @IsString({ message: 'Role must be a string' })
  role: 'STAFF' | 'STUDENT';
}