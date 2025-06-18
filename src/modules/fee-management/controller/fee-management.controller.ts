import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { FeeManagementService } from '../services/fee-management.service';
import { CreateFeeDto } from '../dtos/create.fee.dto';
import { RegisterFeePayment } from '../dtos/register.fee.payment';
import { AssignFeeStudentDto } from '../dtos/assign.fee.student.dto';

@Controller('api/private/fee-management')
export class FeeManagementController {
  constructor(private readonly feeManagementService: FeeManagementService) {}

  @Post('/fee')
  async createFee(@Res() res, @Body() createFeeDto: CreateFeeDto) {
    try {
      const fee = await this.feeManagementService.createFee(createFeeDto);
      return res.status(HttpStatus.CREATED).json({ message: 'Fee created', fee });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error creating fee', error: error.message });
    }
  }

  @Get('/fee')
  async getAllFees(@Res() res) {
    try {
      const fees = await this.feeManagementService.getAllFees();
      return res.status(HttpStatus.OK).json({ message: 'Fees retrieved', fees });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error retrieving fees', error: error.message });
    }
  }

  @Get('/fee/:id')
  async getFeeById(@Res() res, @Param('id') id: string) {
    try {
      const fee = await this.feeManagementService.getFeeById(id);
      return res.status(HttpStatus.OK).json({ message: 'Fee retrieved', fee });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Put('/fee/:id')
  async updateFee(@Res() res, @Param('id') id: string, @Body() updateFeeDto: CreateFeeDto) {
    try {
      const updated = await this.feeManagementService.updateFee(id, updateFeeDto);
      return res.status(HttpStatus.OK).json({ message: 'Fee updated', fee: updated });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  // Get all payment records for a student in a specific academy year
  @Get('student/:studentId/payments')
  async getStudentPaymentRecordsForYear(
    @Res() res,
    @Param('studentId') studentId: string,
    @Query('academyYearId') academyYearId: string,
  ) {
    try {
      const records = await this.feeManagementService.getStudentPaymentRecordsForYear(studentId, academyYearId);
      return res.status(HttpStatus.OK).json({ message: 'Payment records retrieved', records });
    } catch (e) {
      return res.status(e.status || HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: e.message || 'Error retrieving payment records',
      })
    }
  }

  @Get('/fee/:feeId/assigned-students')
  async getStudentsAssignedToFeeAndYear(
    @Res() res,
    @Param('feeId') feeId: string,
    @Query('academyYear') academyYear: string,
  ) {
    try {
      const students = await this.feeManagementService.getStudentsAssignedToFeeAndYear(feeId, academyYear);
      return res.status(HttpStatus.OK).json({ message: 'Assigned students retrieved', students });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('/student/:studentId/assigned-fees')
  async getFeesAssignedToStudent(
    @Res() res,
    @Param('studentId') studentId: string,
    @Query('academyYear') academyYear?: string,
  ) {
    try {
      const fees = await this.feeManagementService.getFeesAssignedToStudent(studentId, academyYear);
      return res.status(HttpStatus.OK).json({ message: 'Assigned fees retrieved', fees });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Post('/fee/:feeId/assign')
  async assignFeeToStudentsOrClasses(
    @Res() res,
    @Param('feeId') feeId: string,
    @Query('academyYear') academyYear: string,
    @Body() body: AssignFeeStudentDto,
  ) {
    try {
      const result = await this.feeManagementService.assignFeeToStudentsOrClasses(
        feeId,
        academyYear,
        body.classIds,
        body.studentIds,
      );
      return res.status(HttpStatus.OK).json({ message: 'Fee assigned', result });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Post('/student/fee-payment')
  async registerStudentFeePayment(
    @Res() res,
    @Body() paymentDto: RegisterFeePayment,
  ) {
    try {
      const payment = await this.feeManagementService.registerStudentFeePayment(paymentDto);
      return res.status(HttpStatus.CREATED).json({ message: 'Payment registered', payment });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Error registering payment', error: error.message });
    }
  }

  @Get('/student/:studentId/completed-fees')
  async getStudentCompletedFees(
    @Res() res,
    @Param('studentId') studentId: string,
    @Query('academyYearId') academyYearId: string,
  ) {
    try {
      const completedFees = await this.feeManagementService.getStudentCompletedFees(studentId, academyYearId);
      return res.status(HttpStatus.OK).json({ message: 'Completed fees retrieved', completedFees });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('/fee/:feeId/completed-students')
  async getStudentsWhoCompletedFee(
    @Res() res,
    @Param('feeId') feeId: string,
    @Query('academyYearId') academyYearId: string,
  ) {
    try {
      const students = await this.feeManagementService.getStudentsWhoCompletedFee(feeId, academyYearId);
      return res.status(HttpStatus.OK).json({ message: 'Students who completed fee retrieved', students });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('/student/:studentId/fee/:feeId/payments')
  async getStudentPaymentRecordsForFeeAndYear(
    @Res() res,
    @Param('studentId') studentId: string,
    @Param('feeId') feeId: string,
    @Query('academyYearId') academyYearId: string,
  ) {
    try {
      const records = await this.feeManagementService.getStudentPaymentRecordsForFeeAndYear(studentId, feeId, academyYearId);
      return res.status(HttpStatus.OK).json({ message: 'Payment records retrieved', records });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Get('/student/:studentId/payments/all')
  async getFeePaymentsByStudentAndYear(
    @Res() res,
    @Param('studentId') studentId: string,
    @Query('academyYearId') academyYearId: string,
  ) {
    try {
      const records = await this.feeManagementService.getFeePaymentsByStudentAndYear(studentId, academyYearId);
      return res.status(HttpStatus.OK).json({ message: 'All payment records retrieved', records });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  @Put('/payment/:paymentId')
  async updateFeePayment(
    @Res() res,
    @Param('paymentId') paymentId: string,
    @Body() updateDto: Partial<RegisterFeePayment>,
  ) {
    try {
      const updated = await this.feeManagementService.updateFeePayment(paymentId, updateDto);
      return res.status(HttpStatus.OK).json({ message: 'Payment updated', payment: updated });
    } catch (error) {
      return res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
