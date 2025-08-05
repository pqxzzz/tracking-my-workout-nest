import { IsDate, IsNumber, IsString, MinLength } from 'class-validator';

export class FinishRegistrationDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsNumber()
  height: number;

  @IsDate()
  birthDate: Date;
}
