import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkoutLogService } from './workout-log.service';
import { CreateWorkoutLogDto } from './dto/create-workout-log.dto';
import { UpdateWorkoutLogDto } from './dto/update-workout-log.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('workout-log')
export class WorkoutLogController {
  constructor(private readonly workoutLogService: WorkoutLogService) {}

  @Post()
  create(@Body() workoutId: string, @Request() req) {
    const userId = req.user.sub;

    return this.workoutLogService.create(workoutId, userId);
  }

  @Get('')
  findAll(
    @Request() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    const userId = req.user.sub;

    return this.workoutLogService.findUserWorkoutLogs(userId, page, limit);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.workoutLogService.findOne(+id);
  // }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkoutLogDto: UpdateWorkoutLogDto,
  ) {
    return this.workoutLogService.update(+id, updateWorkoutLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutLogService.remove(+id);
  }
}
