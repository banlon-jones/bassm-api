import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AcademyYear } from '../interfaces/academyYear.interface';
import { CreateAcademyYearDTO } from '../dto/createAcademyYearDTO';

@Injectable()
export class AcademyYearService {
  constructor(
    @InjectModel('AcademyYear')
    private readonly academyYearModel: Model<AcademyYear>,
  ) {}

  async createAcademyYear(
    createAcademyYearDTO: CreateAcademyYearDTO,
  ): Promise<AcademyYear> {
    const newAcademyYear = new this.academyYearModel(createAcademyYearDTO);
    return await newAcademyYear.save();
  }

  async getAllAcademyYears(): Promise<AcademyYear[]> {
    return await this.academyYearModel.find().exec();
  }

  async getAcademyYearById(id: string): Promise<AcademyYear | null> {
    return await this.academyYearModel.findById(id).exec();
  }

  async updateAcademyYear(
    id: string,
    updateData: Partial<CreateAcademyYearDTO>,
  ): Promise<AcademyYear | null> {
    return await this.academyYearModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async setAcademyYearActive(id: string): Promise<AcademyYear | null> {
    try {
      // Deactivate all academy years
      await this.academyYearModel.updateMany({}, { isActive: false }).exec();
      // Activate the selected academy year
      return await this.academyYearModel
        .findByIdAndUpdate(id, { isActive: true }, { new: true })
        .exec();
    }catch (e) {
      console.error(e)
      return null
    }
  }

  async getActiveAcademyYear(): Promise<AcademyYear | null> {
    try {
      return await this.academyYearModel.findOne({status: true}).exec();
    }catch (e) {
      console.error(e);
      return null;
    }
  }
}
