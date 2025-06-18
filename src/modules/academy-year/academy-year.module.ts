import { Module } from '@nestjs/common';
import { AcademyYearController } from './controller/academy-year.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AcademyYearSchema } from './schemas/academyYear.schema';
import { AcademyYearService } from './services/academy-year.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'AcademyYear', schema: AcademyYearSchema }])
  ],
  controllers: [AcademyYearController],
  providers: [AcademyYearService],
  exports: [AcademyYearService] // Exporting the service for use in other modules
})
export class AcademyYearModule {}
