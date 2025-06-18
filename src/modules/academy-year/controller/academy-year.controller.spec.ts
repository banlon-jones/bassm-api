import { Test, TestingModule } from '@nestjs/testing';
import { AcademyYearController } from './academy-year.controller';

describe('AcademyYearController', () => {
  let controller: AcademyYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademyYearController],
    }).compile();

    controller = module.get<AcademyYearController>(AcademyYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
