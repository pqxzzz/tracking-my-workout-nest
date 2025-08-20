import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
import { ExercisesModule } from './exercises/exercises.module';
import { MusclesModule } from './muscles/muscles.module';
import { WorkoutsetsController } from './workoutSets/workoutsets.controller';
import { WorkoutSetsModule } from './workoutSets/workoutsets.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { WeightModule } from './weight/weight.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    ExercisesModule,
    MusclesModule,
    WorkoutSetsModule,
    WorkoutsModule,
    WeightModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule { // TODO: Continue on apply middleware
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddleware).forRoutes('*');
//   }
// }
export class AppModule {}
