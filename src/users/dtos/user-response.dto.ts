import { Exclude, Expose } from 'class-transformer';

export class UserResponseDto {
  @Exclude()
  id: string;

  @Expose()
  username: string;

  @Expose()
  birthDate: Date;

  @Expose()
  height: number;

  @Expose()
  email: string;

  @Expose()
  isEmailConfirmed: boolean;

  @Expose()
  activeWorkoutSetId: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
