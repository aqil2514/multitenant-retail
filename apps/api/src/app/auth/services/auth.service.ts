import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'prisma/generated/prisma/client';
import { UserJwtPayload } from 'src/@types/auth';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signJwt(dbPayload: User) {
    const jwtPayload: UserJwtPayload = {
      email: dbPayload.email,
      sub: dbPayload.id,
    };
    return await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_AUTH_SECRET as string,
    });
  }
}
