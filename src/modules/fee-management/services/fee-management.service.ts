import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Fee } from '../interfaces/fee.interface';
import { CreateFeeDto } from '../dtos/create.fee.dto';
import { FeeStudent } from '../interfaces/fee.student.interface';
import { FeePayment } from '../interfaces/fee.payment.interface';
import { ClassStudent } from '../../class/intefaces/studentClass.interface';
import { RegisterFeePayment } from '../dtos/register.fee.payment';

@Injectable()
export class FeeManagementService {
  constructor(
    @InjectModel('Fee') private readonly feeModel: Model<Fee>,
    @InjectModel('FeeStudent')
    private readonly feeStudentModel: Model<FeeStudent>,
    @InjectModel('FeePayment')
    private readonly feePaymentModel: Model<FeePayment>,
    @InjectModel('ClassStudent')
    private readonly studentClassModel: Model<ClassStudent>,
  ) {}

  async createFee(createFeeDto: CreateFeeDto): Promise<Fee> {
    const fee = new this.feeModel(createFeeDto);
    return await fee.save();
  }

  async getAllFees(): Promise<Fee[]> {
    return await this.feeModel.find().exec();
  }

  async getFeeById(id: string): Promise<Fee> {
    const fee = await this.feeModel.findById(id).exec();
    if (!fee) throw new NotFoundException('Fee not found');
    return fee;
  }

  async updateFee(id: string, updateFeeDto: CreateFeeDto): Promise<Fee> {
    const updated = await this.feeModel
      .findByIdAndUpdate(id, updateFeeDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Fee not found');
    return updated;
  }

  async assignFeeToStudentsOrClasses(
    feeId: string,
    academyYear: string,
    classIds?: string[],
    studentIds?: string[],
  ): Promise<{ assigned: number }> {
    let studentsToAssign: string[] = [];

    // If classIds are provided, get all students in those classes for the academy year
    if (classIds && classIds.length > 0) {
      // Assuming you have a StudentClass model or similar to fetch students by class and academy year
      const studentClassModel = this.studentClassModel;
      const studentClassDocs = await studentClassModel
        .find({
          class: { $in: classIds },
          academyYear,
        })
        .exec();
      studentsToAssign = studentClassDocs.map((doc: any) =>
        doc.student.toString(),
      );
    }

    // If studentIds are provided, add them (avoid duplicates)
    if (studentIds && studentIds.length > 0) {
      studentsToAssign = [...new Set([...studentsToAssign, ...studentIds])];
    }

    // Create FeeStudent records
    const feeStudentDocs = studentsToAssign.map((studentId) => ({
      fee: feeId,
      student: studentId,
      academyYear,
    }));

    if (feeStudentDocs.length === 0) {
      return { assigned: 0 };
    }

    await this.feeStudentModel.insertMany(feeStudentDocs);
    return { assigned: feeStudentDocs.length };
  }

  async getStudentsAssignedToFeeAndYear(
    feeId: string,
    academyYear: string,
  ): Promise<any[]> {
    return await this.feeStudentModel
      .find({ fee: feeId, academyYear })
      .populate('student')
      .exec();
  }

  async getFeesAssignedToStudent(
    studentId: string,
    academyYear?: string,
  ): Promise<any[]> {
    const query: any = { student: studentId };
    if (academyYear) {
      query.academyYear = academyYear;
    }
    return await this.feeStudentModel.find(query).populate('fee').exec();
  }

  async registerStudentFeePayment(
    paymentDto: RegisterFeePayment,
  ): Promise<FeePayment> {
    const payment = new this.feePaymentModel(paymentDto);
    return await payment.save();
  }

  async getStudentPaymentRecordsForFeeAndYear(
    studentId: string,
    feeId: string,
    academyYearId: string,
  ): Promise<FeePayment[]> {
    return await this.feePaymentModel
      .find({
        studentId,
        feeId,
        academyYearId,
      })
      .populate('fee')
      .exec();
  }

  async getFeePaymentsByStudentAndYear(
    studentId: string,
    academyYearId: string,
  ): Promise<FeePayment[]> {
    return await this.feePaymentModel
      .find({
        studentId,
        academyYearId,
      })
      .populate('fee')
      .exec();
  }

  async getStudentCompletedFees(
    studentId: string,
    academyYearId: string,
  ): Promise<any[]> {
    // Get all payments for the student and year
    const payments = await this.feePaymentModel.find({ studentId, academyYearId }).exec();

    // Sum payments per fee
    const feeTotals: Record<string, number> = {};
    payments.forEach(payment => {
      feeTotals[payment.fee] = (feeTotals[payment.fee] || 0) + payment.amountPaid;
    });

    // Fetch all relevant fees
    const feeIds = Object.keys(feeTotals);
    if (feeIds.length === 0) return [];

    const fees = await this.feeModel.find({ _id: { $in: feeIds } }).exec();

    // Filter fees where total paid >= fee amount
    const completedFees = fees
      .filter(fee => feeTotals[fee._id.toString()] >= fee.amount)
      .map(fee => ({
        fee,
        totalPaid: feeTotals[fee._id.toString()],
      }));

    return completedFees;
  }

  async getStudentsWhoCompletedFee(
    feeId: string,
    academyYearId: string,
  ): Promise<any[]> {
    // Get the fee amount
    const fee = await this.feeModel.findById(feeId).exec();
    if (!fee) throw new NotFoundException('Fee not found');

    // Get all payments for this fee and year
    const payments = await this.feePaymentModel
      .find({ feeId, academyYearId })
      .exec();

    // Sum payments per student
    const studentTotals: Record<string, number> = {};
    payments.forEach((payment) => {
      studentTotals[payment.student] =
        (studentTotals[payment.student] || 0) + payment.amountPaid;
    });

    // Filter students who have paid enough
    const completedStudentIds = Object.entries(studentTotals)
      .filter(([_, total]) => total >= fee.amount)
      .map(([studentId]) => studentId);

    // Fetch student details (optional)
    return await this.studentClassModel
      .find({ studentId: { $in: completedStudentIds }, academyYearId })
      .populate('student')
      .exec();
  }

  async getStudentPaymentRecordsForYear(
    studentId: string,
    academyYearId: string,
  ): Promise<FeePayment[]> {
    return await this.feePaymentModel
      .find({ studentId, academyYearId })
      .populate('fee')
      .exec();
  }

  async updateFeePayment(
    paymentId: string,
    updateDto: Partial<RegisterFeePayment>,
  ): Promise<FeePayment> {
    const updated = await this.feePaymentModel
      .findByIdAndUpdate(paymentId, updateDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Payment record not found');
    return updated;
  }

}
