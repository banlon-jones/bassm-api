import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class RegisterFeePayment {
  @ApiProperty({ required: true })
  studentId: string; // ID of the student making the payment
  @ApiProperty({ required: true })
  feeId: string; // ID of the fee being paid
  @ApiProperty({ required: true })
  academyYearId: string; // ID of the academy year for which the fee is being paid
  @ApiProperty({ required: true })
  amountPaid: number; // Amount paid by the student
  @ApiProperty({ required: true, type: Date })
  @IsDate()
  paymentDate?: Date; // Date of the payment, optional
  @ApiProperty({ required: true, enum: ['CASH', 'BANK_TRANSFER', 'ONLINE', 'MOMO', 'OMO'] })
  @IsNotEmpty()
  paymentMethod: 'CASH' | 'BANK_TRANSFER' | 'ONLINE' | 'MOMO' | 'OMO'; // Method of payment
}