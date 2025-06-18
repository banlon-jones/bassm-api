import { Module } from '@nestjs/common';
import { FeeManagementController } from './controller/fee-management.controller';
import { FeeManagementService } from './services/fee-management.service';
import { FeeSchema } from './schemas/fee.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FeeStudentSchema } from './schemas/fee.student.schema';
import { FeePaymentSchema } from './schemas/fee.payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Fee', schema: FeeSchema },
      { name: 'FeeStudent', schema: FeeStudentSchema },
      { name: 'FeePayment', schema: FeePaymentSchema }
    ])
  ],
  controllers: [FeeManagementController],
  providers: [FeeManagementService]
})
export class FeeManagementModule {}
