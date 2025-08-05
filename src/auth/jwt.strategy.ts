// this file implements strategy in authentication based on JWT using packages passport e passport-jwt
// extract token from Header -> validate token -> decode token's payload -> search user...
// everytime a PROTECTED route is requested, the NestJS "run" this strategy

import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    // return this.usersService.findByEmail(payload.email);

    new Logger(payload);
    console.log(payload);
    return payload;
  }
}
