import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { SendGridModule } from 'src/common/providers/sendgrid/sendgrid.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SendGridModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
