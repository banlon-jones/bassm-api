import { Test, TestingModule } from '@nestjs/testing';
import { AcademyYearService } from './academy-year.service';

describe('AcademyYearService', () => {
  let service: AcademyYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcademyYearService],
    }).compile();

    service = module.get<AcademyYearService>(AcademyYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
