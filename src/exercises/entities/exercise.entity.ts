import { Muscle } from 'src/muscles/entities/muscle.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  muscleGroup: string;

  @Column({ nullable: true })
  ptBrName: string;

  @Column({ nullable: true })
  videoReference: string;

  @Column({ nullable: true })
  imageReference: string;

  @ManyToMany(() => Muscle, (muscle) => muscle.exercises)
  @JoinTable()
  muscles: Muscle[];
}
