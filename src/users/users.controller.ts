import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Logger,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import {
  ConfirmEmailDto,
  ResendConfirmationDto,
} from './dtos/email-confirmation.dto';
import { FinishRegistrationDto } from './dtos/finish-registration.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // TODO: mudar para auth????
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

  @UseGuards(JwtAuthGuard)
  @Patch('finish-registration')
  async finishRegistration(
    @Body() body: FinishRegistrationDto,
    @Request() req,
  ) {
    Logger.log('REQUISICAO---->', req.user);
    const updatedUser = await this.usersService.finishAccRegistration(
      body,
      req.user.sub,
    );
    return {
      message: 'Your registration is fully completed!',
      user: updatedUser,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    // async getMe(@Headers('authorization') authHeader: string) {
    // O header normalmente vem como: "Bearer <token>"
    // TODO: ver isso aqui
    // const token = authHeader?.split(' ')[1];
    // const user = await this.usersService.findUserByAccessToken(token);
    // return user;

    // PARA BUSCAR TODOS DADOS DO USER
    const userId = req.user.sub;
    const user = await this.usersService.findById(userId);
    return user;
  }
}
