import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsetsService } from './workoutsets.service';

describe('WorkoutsetsService', () => {
  let service: WorkoutsetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkoutsetsService],
    }).compile();

    service = module.get<WorkoutsetsService>(WorkoutsetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
