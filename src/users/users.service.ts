import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hashPassword } from '../common/helpers/hash.helper';
import { v4 as uuidv4 } from 'uuid';
import { SendGridService } from '../common/providers/sendgrid/sendgrid.service';
import { AuthService } from 'src/auth/auth.service';
import { FinishRegistrationDto } from './dtos/finish-registration.dto';

@Injectable()
export class UsersService {
  // constructor é uma função que é chamada quando a classe é instanciada
  // e é usada para injetar dependências
  // @InjectRepository é um decorator que injeta o repositório do TypeORM
  // Repository é uma classe que representa um repositório de entidades
  // User é a entidade que representa o usuário
  // private usersRepo é uma propriedade que representa o repositório de usuários
  // e é usada para fazer operações no banco de dados
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private sendGridService: SendGridService,
    private authService: AuthService,
  ) {}

  async create(email: string, plainPassword: string): Promise<User> {
    // 1. generate token and expiration date
    const token = uuidv4(); // create token
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); //24h

    // 2. create user with confirmation fields and hash password
    const user = this.usersRepo.create({
      //create user
      email,
      password: await hashPassword(plainPassword),
      confirmationToken: token,
      confirmationTokenExpiredAt: expires,
    });

    // 3. save user
    await this.usersRepo.save(user);

    // 4. send confirmation email
    await this.sendGridService.sendAccountConfirmationEmail(
      email,
      token,
      'NOME DO USUARIO',
    );

    return user;
  }

  async confirmEmail(token: string): Promise<User> {
    if (!token) throw new BadRequestException('Token is required');

    // 1. Find user by token
    const user = await this.usersRepo.findOne({
      where: {
        confirmationToken: token,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    // 2. Check if the token is expired
    if (
      !user.confirmationTokenExpiredAt ||
      user.confirmationTokenExpiredAt < new Date()
    ) {
      throw new BadRequestException('Token expired');
    }

    // 3. Mark email as confirmed and clear token fields
    user.isEmailConfirmed = true;
    user.confirmationToken = '';
    user.confirmationTokenExpiredAt = null;

    // 4. Save user
    await this.usersRepo.save(user);

    return user;
  }

  async resendConfirmationEmail(email: string): Promise<void> {
    const user = await this.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isEmailConfirmed) {
      throw new BadRequestException('Email already confirmed');
    }

    // 1. generate token and expiration date
    const token = uuidv4();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // 2. update user with new token and expiration date
    user.confirmationToken = token;
    user.confirmationTokenExpiredAt = expires;

    // 3. save user
    await this.usersRepo.save(user);

    // 4. send confirmation email
    await this.sendGridService.sendAccountConfirmationEmail(
      email,
      token,
      'NOME DO USUARIO - RESEND',
    );
  }

  async finishAccRegistration(body: FinishRegistrationDto, userId: string) {
    if (!userId) {
      throw new Error('User ID is required to update user data.');
    }

    await this.usersRepo.update(userId, {
      username: body.username,
      height: body.height,
      birthDate: body.birthDate,
    });

    return this.usersRepo.findOne({ where: { id: userId } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepo.findOne({ where: { id } });
  }

  async findUserByAccessToken(token: string) {
    return this.authService.getUserFromToken(token);
  }
}
