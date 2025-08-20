import { Module } from '@nestjs/common';
import { WorkoutsetsService } from './workoutsets.service';
import { WorkoutsetsController } from './workoutsets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workoutset } from './entities/workoutset.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/users/user.entity';

@Module({
  providers: [WorkoutsetsService],
  controllers: [WorkoutsetsController],
  // exports: ['']
  imports: [TypeOrmModule.forFeature([Workoutset, Workout, Exercise, User])], // "cria uma base pro service"
})
export class WorkoutSetsModule {}
