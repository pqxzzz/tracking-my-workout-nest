import { Type } from 'class-transformer';
import { IsArray, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateWorkoutDTO } from 'src/workouts/dtos/create-workout.dto';

export class CreateWorkoutSetDTO {
  @IsString()
  @MinLength(4)
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutDTO)
  workouts: CreateWorkoutDTO[];
}

// {
//     "workoutSet": {
//         "name": "WORKOUTSET NAME",
//         "workouts": [
//             {
//                 "name": "WORKOUT 1 NAME",
//                 "exercises": [
//                     {
//                         "name": "EXERCISE FROM WORKOUT 1 NAME",
//                         "series": 5,
//                         "repetitions": 12,
//                         "weight": "100kg",
//                         "information": "info",
//                         "muscleGroup": "Biceps"
//                     },
//                     {
//                         "name": "EXERCISE FROM WORKOUT 1 NAME",
//                         "series": 20,
//                         "repetitions": 3,
//                         "weight": "30",
//                         "information": "",
//                         "muscleGroup": ""
//                     }
//                 ]
//             },
//             {
//                 "name": "WORKOUT 2 NAME",
//                 "exercises": [
//                     {
//                         "name": "EXERCISE FROM WORKOUT 2 NAME",
//                         "series": 10,
//                         "repetitions": 23,
//                         "weight": "43",
//                         "information": "",
//                         "muscleGroup": "HELLO!"
//                     }
//                 ]
//             }
//         ]
//     }
// }
