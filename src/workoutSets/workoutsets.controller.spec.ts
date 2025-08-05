import { Test, TestingModule } from '@nestjs/testing';
import { WorkoutsetsController } from './workoutsets.controller';

describe('WorkoutsetsController', () => {
  let controller: WorkoutsetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkoutsetsController],
    }).compile();

    controller = module.get<WorkoutsetsController>(WorkoutsetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
