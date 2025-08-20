import { Muscle } from 'src/muscles/entities/muscle.entity';
import { Workout } from 'src/workouts/entities/workout.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  information: string;

  @Column()
  series: number;

  @Column()
  repetitions: number;

  @Column()
  weight: string;

  @Column({ nullable: true })
  muscleGroup: string;

  @Column({ nullable: true })
  ptBrName: string;

  @Column({ nullable: true })
  videoReference: string;

  @Column({ nullable: true })
  imageReference: string;

  @ManyToOne(() => Workout, (workout) => workout.exercises)
  workout: Workout;

  @ManyToMany(() => Muscle, (muscle) => muscle.exercises)
  @JoinTable()
  muscles: Muscle[];

  // DATA DE CRIAÇÃO
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  // DATA DE ATUALIZAÇÃO
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
