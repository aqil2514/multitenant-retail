import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'prisma/generated/prisma/client';
import { UserJwtPayload } from 'src/@types/auth';
import { createLogoutLog } from 'src/helpers/auth/logout.helper';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async signJwt(dbPayload: User) {
    const jwtPayload: UserJwtPayload = {
      email: dbPayload.email,
      sub: dbPayload.id,
    };
    return await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_AUTH_SECRET as string,
    });
  }

  async logoutService(user: UserJwtPayload, isFromOnBoarding: boolean) {
    await createLogoutLog(this.prisma, user, isFromOnBoarding);
  }
}
