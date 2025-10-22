import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException('Email not confirmed');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  login(user: User) {
    // TODO: type user
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const userResponse = {
      username: user.username,
      birthDate: user.birthDate,
      height: user.height,
      email: user.email,
      isEmailConfirmed: user.isEmailConfirmed,
      activeWorkoutSetId: user.activeWorkoutSetId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      // id e password não incluídos
    };

    return {
      user: userResponse,
      access_token: this.jwtService.sign(payload, { expiresIn: '72h' }),
    };
  }

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return this.usersService.findByEmail(payload.email);
    } catch (e) {
      throw new UnauthorizedException('Invalid Token', e.message);
    }
  }
}
