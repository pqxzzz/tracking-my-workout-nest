import { Module } from '@nestjs/common';
import { WorkoutLogService } from './workout-log.service';
import { WorkoutLogController } from './workout-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutLog } from './entities/workout-log.entity';
import { Workout } from 'src/workouts/entities/workout.entity';

@Module({
  controllers: [WorkoutLogController],
  providers: [WorkoutLogService],
  imports: [TypeOrmModule.forFeature([WorkoutLog, Workout])],
})
export class WorkoutLogModule {}
