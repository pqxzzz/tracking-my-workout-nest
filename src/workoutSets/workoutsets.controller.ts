import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { WorkoutsetsService } from './workoutsets.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWorkoutSetDTO } from './dtos/create-workoutset.dto';

@Controller('workoutsets')
export class WorkoutsetsController {
  constructor(readonly workoutsetsService: WorkoutsetsService) {} // dependency injection

  // --- getUserWorkoutSets ---
  //   @UseGuards(JwtAuthGuard) // protected route
  //   @Get('/users/:userId/activeWorkoutSet')
  //   async getUserActiveWorkoutSet(@Param('userId') userID: string){
  //     return this.workoutsetsService.findActiveByUser(userId);
  //   }

  //   --- createUserWorkoutSet --- AND set as active workoutSetId as active on user
  @UseGuards(JwtAuthGuard)
  @Post('/createWorkoutSet')
  async createNewWorkoutSet(@Request() req, @Body() body: CreateWorkoutSetDTO) {
    const userId = req.user.sub;

    return await this.workoutsetsService.create(body, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/ActiveWorkoutSet')
  async getActiveWorkoutSet(@Request() req) {
    console.log('REQ: ', req.user);
    const userId = req.user.sub;

    const workoutSetInfo = await this.workoutsetsService.getWorkoutSet(userId);

    return workoutSetInfo;
  }
}
