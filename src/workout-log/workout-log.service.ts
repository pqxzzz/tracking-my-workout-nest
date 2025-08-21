import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { UpdateWorkoutLogDto } from './dto/update-workout-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutLog } from './entities/workout-log.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class WorkoutLogService {
  constructor(
    @InjectRepository(WorkoutLog)
    private workoutLogRepo: Repository<WorkoutLog>,
  ) {}
  private readonly logger = new Logger(WorkoutLogService.name);

  async create(workoutId: string, userId: string) {
    this.logger.log(`🚨 CRIANDO UM NOVO WORKOUTLOG: ${workoutId} - ${userId}`);

    // Start and end of current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    //

    const userLastWorkoutLog = await this.workoutLogRepo.findOne({
      where: {
        userId: userId,
        date: Between(startOfDay, endOfDay),
      },
    });

    if (userLastWorkoutLog) {
      // Logica para caso ja tenha um workoutLog no dia.
      this.logger.warn(
        `⚠️ Usuário ${userId} já possui um workout log hoje (${userLastWorkoutLog.date})`,
      );
      throw new HttpException(
        'User already has a Workout Log today!',
        HttpStatus.CONFLICT, // 409
      );
    } else {
      const workoutLog = this.workoutLogRepo.create({
        workoutId: workoutId,
        userId: userId,
      });
      const savedWorkoutLog = await this.workoutLogRepo.save(workoutLog);
      return {
        message: 'Workout Log created!',
        workoutLogDate: savedWorkoutLog.date,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} workoutLog`;
  }

  update(id: number, updateWorkoutLogDto: UpdateWorkoutLogDto) {
    return `This action updates a #${id} workoutLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} workoutLog`;
  }

  async findUserWorkoutLogs(
    userId: string,
    page: number = 1,
    limit: number = 20,
  ) {
    const [logs, total] = await this.workoutLogRepo.findAndCount({
      where: { userId: userId },
      order: { date: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: logs,
      total, // total de logs do usuário
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
