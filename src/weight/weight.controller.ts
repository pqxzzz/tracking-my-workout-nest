import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WeightService } from './weight.service';
import { CreateWeightDto } from './dto/create-weight.dto';
import { UpdateWeightDto } from './dto/update-weight.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('weight')
export class WeightController {
  constructor(private readonly weightService: WeightService) {}

  @Post()
  create(@Body() createWeightDto: CreateWeightDto, @Request() req) {
    const userId = req.user.sub;

    return this.weightService.create(createWeightDto, userId);
  }

  @Get()
  getUsersWeights(@Request() req) {
    const userId = req.user.sub;

    return this.weightService.findUserWeights(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightDto: UpdateWeightDto) {
    return this.weightService.update(+id, updateWeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightService.remove(+id);
  }
}
