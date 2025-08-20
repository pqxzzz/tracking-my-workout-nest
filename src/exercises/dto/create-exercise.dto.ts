import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  workoutId: string;

  @IsString()
  @MinLength(4)
  name: string;

  @IsInt()
  @Max(10)
  series: number;

  @IsInt()
  @Max(100)
  repetitions: number;

  @IsString()
  @MaxLength(12)
  weight: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  information?: string;

  @IsString()
  @IsOptional()
  @MaxLength(80)
  muscleGroup?: string;
}
