import { Module } from '@nestjs/common';
import { WorkoutLogService } from './workout-log.service';
import { WorkoutLogController } from './workout-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutLog } from './entities/workout-log.entity';

@Module({
  controllers: [WorkoutLogController],
  providers: [WorkoutLogService],
  imports: [TypeOrmModule.forFeature([WorkoutLog])],
})
export class WorkoutLogModule {}
