import { IsEmail, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  token: string;
}

export class ResendConfirmationDto {
  @IsEmail()
  email: string;
}
