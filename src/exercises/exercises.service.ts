import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exercise } from './entities/exercise.entity';
import { Repository } from 'typeorm';
import { Workout } from 'src/workouts/entities/workout.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepo: Repository<Exercise>,

    @InjectRepository(Workout)
    private workoutsRepo: Repository<Workout>,
  ) {}

  async create(createExerciseDto: CreateExerciseDto) {
    if (!createExerciseDto) {
      throw new Error('No body found');
    }

    const workout = await this.workoutsRepo.findOneBy({
      id: createExerciseDto.workoutId,
    });

    if (!workout) {
      throw new NotFoundException('Workout not found!');
    }

    const newExercise = this.exerciseRepo.create({
      ...createExerciseDto,
      workout, // passa entidade completa para manter relation
    });

    return await this.exerciseRepo.save(newExercise);
  }

  findAll() {
    return `This action returns all exercises`;
  }

  async findOne(id: string) {
    const exercise = await this.exerciseRepo.findOneBy({ id });

    if (!exercise) {
      throw new NotFoundException('Exercise not found!');
    }
    return exercise;
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    // const exercise = await this.exerciseRepo.findOneBy({ id }); // no need to search!!!

    const response = await this.exerciseRepo.update(
      { id },
      { ...updateExerciseDto },
    );

    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} exercise`;
  }
}
