import { Module } from '@nestjs/common';
import { LessonsService } from './services/lessons.service';
import { LessonController } from './controller/lesson.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LessonSchema } from './schemas/lession.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Lesson', schema: LessonSchema }])
  ],
  controllers: [LessonController],
  providers: [LessonsService]
})
export class LessionsModule {}
