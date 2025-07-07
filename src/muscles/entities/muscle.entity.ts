import { Exercise } from 'src/exercises/entities/exercise.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('muscles')
export class Muscle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageReference: string;

  @Column({ nullable: true })
  svgReference: string;

  @Column({ nullable: true })
  ptBrName: string;

  @ManyToMany(() => Exercise, (exercise) => exercise.muscles)
  exercises: Exercise[];
}
