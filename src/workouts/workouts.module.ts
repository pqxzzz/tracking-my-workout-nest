import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';

@Module({
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
  imports: [TypeOrmModule.forFeature([Workout])],
})
export class WorkoutsModule {}
