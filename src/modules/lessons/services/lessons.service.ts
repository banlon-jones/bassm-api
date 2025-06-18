import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from '../interfaces/lesson.interface';
import { Model } from 'mongoose';

@Injectable()
export class LessonsService {
  constructor(
    @InjectModel('Lesson') private readonly lessonModel: Model<Lesson>,
  ) {
  }
}
