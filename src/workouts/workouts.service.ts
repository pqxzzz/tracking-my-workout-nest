import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workout } from './entities/workout.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private workoutRepo: Repository<Workout>,
  ) {}

  async findOne(id: string) {
    const workout = await this.workoutRepo.findOne({
      where: { id },
      relations: ['exercises'],
    });

    return workout;
  }
}
