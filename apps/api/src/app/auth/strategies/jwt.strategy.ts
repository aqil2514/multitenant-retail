import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserJwtPayload } from 'src/@types/auth';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const extractJwtFromCookie = (req: Request) => {
      let token = null;
      if (req && req.cookies) {
        token = req.cookies['access_token'];
      }

      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };
    super({
      ignoreExpiration: false,
      secretOrKey: `${process.env.JWT_AUTH_SECRET}`,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  validate(payload: UserJwtPayload) {
    const user: UserJwtPayload = {
      email: payload.email,
      sub: payload.sub,
    };

    return user;
  }
}
