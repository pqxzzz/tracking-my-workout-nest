import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import {
  ConfirmEmailDto,
  ResendConfirmationDto,
} from './dtos/email-confirmation.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return this.usersService.create(body.email, body.password);
  }

  @Post('confirm-email')
  async confirmEmail(@Body() body: ConfirmEmailDto) {
    if (!body.token || body.token === '' || !body) {
      throw new BadRequestException('Token is required');
    }
    await this.usersService.confirmEmail(body.token);
    return {
      message: 'Email confirmed successfully',
    };
  }

  @Post('resend-confirmation-email')
  async resendConfirmationEmail(@Body() body: ResendConfirmationDto) {
    await this.usersService.resendConfirmationEmail(body.email);
    return {
      message: 'Confirmation email sent successfully',
    };
  }
}
