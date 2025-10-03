import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// import { SendGridModule } from 'src/common/providers/sendgrid/sendgrid.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { ResendModule } from 'src/common/providers/resend/resend.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // SendGridModule,
    ResendModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
