import { Module } from '@nestjs/common';
import { WorkoutsetsService } from './workoutsets.service';

@Module({
  providers: [WorkoutsetsService],
})
export class WorkoutSetsModule {}
