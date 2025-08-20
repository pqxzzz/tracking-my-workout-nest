import { Type } from 'class-transformer';
import { IsArray, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateExerciseDto } from 'src/exercises/dto/create-exercise.dto';

export class CreateWorkoutDTO {
  @IsString()
  @MinLength(4)
  name: string;

  //   ADC EXERCISE ARR
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseDto)
  exercises: CreateExerciseDto[];
}
