import { IsNumber, Min } from 'class-validator';

export class CreateWeightDto {
  @IsNumber()
  @Min(30)
  weight: number;
}
