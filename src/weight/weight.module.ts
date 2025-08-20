import { Module } from '@nestjs/common';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weight } from './entities/weight.entity';
import { User } from 'src/users/user.entity';

@Module({
  controllers: [WeightController],
  providers: [WeightService],
  imports: [TypeOrmModule.forFeature([Weight, User])],
})
export class WeightModule {}
