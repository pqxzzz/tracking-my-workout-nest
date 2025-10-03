import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Workoutset } from './entities/workoutset.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWorkoutSetDTO } from './dtos/create-workoutset.dto';
import { Workout } from 'src/workouts/entities/workout.entity';
import { Exercise } from 'src/exercises/entities/exercise.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class WorkoutsetsService {
  constructor(
    @InjectRepository(Workoutset)
    private readonly workoutSetsRepo: Repository<Workoutset>,

    @InjectRepository(Workout)
    private readonly workoutsRepo: Repository<Workout>,

    @InjectRepository(Exercise)
    private readonly exercisesRepo: Repository<Exercise>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(body: CreateWorkoutSetDTO, userId: string): Promise<Workoutset> {
    const workoutSet = this.workoutSetsRepo.create({
      ...body,
      user: { id: userId },
    }); // o body já tem tudo

    // atualizar o workoutsetActive do user
    const logger = new Logger(userId);

    const savedWorkoutSet = await this.workoutSetsRepo.save(workoutSet);

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    user.activeWorkoutSetId = savedWorkoutSet.id;
    await this.userRepo.save(user);

    return savedWorkoutSet;
  }

  async getWorkoutSet(userId: string): Promise<Workoutset | null> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('USER NOT FOUND!');
    }

    if (!user.activeWorkoutSetId) {
      return null;
    }

    const workoutSet = await this.workoutSetsRepo.findOne({
      where: { id: user.activeWorkoutSetId },
      relations: ['workouts', 'workouts.exercises'],
    });

    if (!workoutSet) {
      return null;
    }

    return workoutSet;
  }
}
