import { Exercise } from 'src/exercises/entities/exercise.entity';
import { Workoutset } from 'src/workoutSets/entities/workoutset.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Workoutset, (workoutSet) => workoutSet.workouts)
  workoutSet: Workoutset;

  @OneToMany(() => Exercise, (exercise) => exercise.workout, { cascade: true })
  exercises: Exercise[];
}
