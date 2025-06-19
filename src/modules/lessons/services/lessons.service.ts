import { Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../interfaces/lesson.interface';
import { Model } from 'mongoose';
import { CreateLessonDto } from '../dtos/create.lesson.dto';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,
  ) {}

  async createLesson(
    req: any,
    createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    const lesson = new this.lessonModel({
      title: createLessonDto.title,
      description: createLessonDto.description,
      class: createLessonDto.classId,
      content: createLessonDto.content,
      createdBy: req.user._id,
      duration: createLessonDto.duration,
      assignedTo: createLessonDto.teacherIds,
    });
    return await lesson.save();
  }

  async updateLesson(
    id: string,
    updateLessonDto: Partial<CreateLessonDto>,
  ): Promise<Lesson> {
    const updated = await this.lessonModel
      .findByIdAndUpdate(id, updateLessonDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException('Lesson not found');
    return updated;
  }

  async getAllLessons(): Promise<Lesson[]> {
    return await this.lessonModel.find().exec();
  }

  async getLesson(id: string): Promise<Lesson> {
    const lesson = await this.lessonModel.findById(id).exec();
    if (!lesson) throw new NotFoundException('Lesson not found');
    return lesson;
  }

  async getLessonsByTeacher(teacherId: string): Promise<Lesson[]> {
    return await this.lessonModel
      .find({ teacherId: { $in: [teacherId] } })
      .exec();
  }
}
