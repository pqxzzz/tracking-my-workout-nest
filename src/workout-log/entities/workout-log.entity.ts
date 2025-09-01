import { Workout } from 'src/workouts/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workout_logs')
export class WorkoutLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  workoutId: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Workout)
  @JoinColumn({ name: 'workoutId' })
  workout: Workout;
}
