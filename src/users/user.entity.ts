import { Weight } from 'src/weight/entities/weight.entity';
import { Workoutset } from 'src/workoutSets/entities/workoutset.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

// isso é um entity, é uma classe que representa uma tabela no banco de dados
// e cada propriedade é uma coluna da tabela
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ type: 'date', nullable: true })
  birthDate: Date;

  @Column({ type: 'int', nullable: true })
  height: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  confirmationToken: string;

  @Column({ type: 'timestamp', nullable: true })
  confirmationTokenExpiredAt: Date | null;

  @OneToMany(() => Workoutset, (workoutSet) => workoutSet.user)
  workoutSets: Workoutset[];

  @OneToMany(() => Weight, (weight) => weight.user)
  weights: Weight[];

  @OneToOne(() => Workoutset, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'activeWorkoutSetId' })
  activeWorkoutSet: Workoutset;

  @Column({ nullable: true, unique: true })
  activeWorkoutSetId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
