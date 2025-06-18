import { ApiProperty } from '@nestjs/swagger';

export class CreateFeeDto {
  @ApiProperty({required: true})
  name: string;
  @ApiProperty({required: false})
  description?: string;
  @ApiProperty({required: true})
  amount: number;
  @ApiProperty({required: true, enum: ['TUITION', 'OTHER']})
  feeType: 'TUITION' | 'OTHER';
  @ApiProperty({required: false, default: false})
  isOptional?: boolean;
}