import { Module } from '@nestjs/common';
import { ClassController } from './controller/class.controller';
import { ClassService } from './service/class.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassSchema } from './schemas/class.schema';
import { ClassStudentSchema } from './schemas/class.student.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Class', schema: ClassSchema},
      { name: 'ClassStudent', schema: ClassStudentSchema },
    ])
  ],
  controllers: [ClassController],
  providers: [ClassService]
})
export class ClassModule {}
