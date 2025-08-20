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
    logger.log('CREATING NEW WORKOUTSET: ', userId);

    const user = await this.userRepo.findOne({ where: { id: userId } });

    logger.log(user);

    if (!user) {
      throw new NotFoundException('User not found!', userId);
    }

    user.activeWorkoutSetId = workoutSet.id;

    await this.userRepo.save(user);

    logger.warn(user);

    return this.workoutSetsRepo.save(workoutSet); // salva tudo com cascade!

    //   const workoutSet = this.workoutSetsRepo.create({
    //     name: body.name,
    //     user: { id: userId },
    //   });

    //   const workouts: Workout[] = [];

    //   for (const workoutDto of body.workouts) {
    //     const workout = this.workoutsRepo.create({
    //       name: workoutDto.name,
    //       workoutSet, // relação inversa
    //     });

    //     const exercises = workoutDto.exercises.map((exDto) =>
    //       this.exercisesRepo.create({
    //         // name: exDto.name,
    //         // series: exDto.series,
    //         // repetitions: exDto.repetitions,
    //         // weight: exDto.weight,
    //         // information: exDto.information,
    //         // muscleGroup: exDto.muscleGroup,
    //         // workout, // relação inversa

    //         ...exDto,
    //         workout, // <- isso precisa estar aqui e ser válido
    //       }),
    //     );

    //     workout.exercises = await this.exercisesRepo.save(exercises);
    //     workouts.push(workout);
    //   }

    //   workoutSet.workouts = await this.workoutsRepo.save(workouts);
    //   return this.workoutSetsRepo.save(workoutSet);
  }

  async getWorkoutSet(userId: string): Promise<Workoutset> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('USER NOT FOUND!');
    }

    const workoutSet = await this.workoutSetsRepo.findOne({
      where: { id: user?.activeWorkoutSetId },
      relations: ['workouts', 'workouts.exercises'],
    });

    if (!workoutSet) {
      throw new NotFoundException('WorkoutSet not found!');
    }

    return workoutSet;
  }
}
