import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Class } from '../intefaces/class.interface';
import { Model } from 'mongoose';
import { ClassStudent } from '../intefaces/studentClass.interface';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel('Class') private readonly classModel: Model<Class>,
    @InjectModel('ClassStudent') private readonly classStudentModel: Model<ClassStudent>
  ) {}

  async createClass(createClassDTO: any) {
    const newClass = new this.classModel(createClassDTO);
    return await newClass.save();
  }

  async getAllClasses(query: any) {
    const { page = 1, limit = 10, search } = query;
    const skip = (page - 1) * limit;

    let filterCondition: any = {};
    if (search) {
      filterCondition.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { track: { $regex: search, $options: 'i' } },
      ];
    }

    const [classes, total] = await Promise.all([
      this.classModel
        .find(filterCondition)
        .skip(skip)
        .limit(limit)
        .sort('createdAt')
        .exec(),
      this.classModel.countDocuments(filterCondition).exec(),
    ]);

    return {
      classes,
      total,
      page,
      limit,
    };
  }

  async getClassById(id: string) {
    return await this.classModel.findById(id).exec();
  }

  async updateClass(id: string, updateClassDTO: any) {
    try{
      return await this.classModel.findByIdAndUpdate(id, updateClassDTO, { new: true }).exec();
    }catch (e) {
      console.error(e)
      return null
    }
  }

  async assignStudentToClass(classId: string, studentId: string, academyYearId: string) {
    try {
      const assignment = new this.classStudentModel({
        class: classId,
        student: studentId,
        academyYear: academyYearId,
        status: 'enrolled',
      });
      return await assignment.save();
    }catch (e) {
      console.log(e);
      return null;
    }
  }

  async getStudentsInClassAndAcademyYear(classId: string, academyYearId: string) {
    // Find all class-student assignments for the given class and academy year
    return await this.classStudentModel.find({ class: classId, academyYear: academyYearId, status: 'enrolled' }).populate('student').exec();
  }

  async updateStudentClassStatus(
    classId: string,
    studentId: string,
    academyYearId: string,
    status: 'enrolled' | 'completed' | 'dropped'
  ) {
    return await this.classStudentModel.findOneAndUpdate(
      { class: classId, student: studentId, academyYear: academyYearId },
      { status },
      { new: true }
    ).exec();
  }

  async updateStudentClass( studentId: string, academyYearId: string, classId: string) {
    return await this.classStudentModel.findOneAndUpdate(
      { student: studentId, academyYear: academyYearId },
      { class: classId },
      { new: true }
    ).exec();
  }

  async getStudentClassByStudentIdAndAcademyYearId(studentId: string, academyYearId: string) {
    return await this.classStudentModel.findOne({ student: studentId, academyYear: academyYearId }).populate('class').exec();
  }

  async getStudentClasses(studentId: string) {
    return await this.classStudentModel.find({student: studentId}).populate('class').populate('academyYear').exec();
  }

}
