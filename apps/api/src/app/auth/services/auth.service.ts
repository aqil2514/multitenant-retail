import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { User } from 'prisma/generated/prisma/client';
import { UserJwtPayload } from 'src/@types/auth';
import {
  createLogoutLog,
  deleteSessionByJti,
  getSessionByJti,
  updateSessionByJti,
} from 'src/helpers/auth/logout.helper';
import { generateRefreshTokenPayload } from 'src/helpers/auth/refresh-token';
import { getUserById } from 'src/helpers/db/user/get-helper';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateAccessToken(dbPayload: User) {
    const jwtPayload: UserJwtPayload = {
      email: dbPayload.email,
      sub: dbPayload.id,
    };
    return await this.jwtService.signAsync(jwtPayload, {
      secret: process.env.JWT_AUTH_SECRET as string,
      expiresIn: '15m',
    });
  }

  async generateRefreshToken(payload: User, req: Request) {
    const REFRESH_TOKEN_EXPIRES = 7 * 24 * 60 * 60;
    const refreshToken = await generateRefreshTokenPayload(
      this.prisma,
      payload,
      req,
      REFRESH_TOKEN_EXPIRES,
    );

    return await this.jwtService.signAsync(
      {
        sub: refreshToken.userId,
        jti: refreshToken.jti,
      },
      {
        secret: process.env.JWT_AUTH_SECRET as string,
        expiresIn: REFRESH_TOKEN_EXPIRES,
      },
    );
  }

  async logoutService(
    user: UserJwtPayload,
    isFromOnBoarding: boolean,
    refreshToken: string,
  ) {
    const decoded = this.jwtService.decode(refreshToken);
    await Promise.all([
      deleteSessionByJti(this.prisma, decoded.jti),
      createLogoutLog(this.prisma, user, isFromOnBoarding),
    ]);
  }

  async refreshTokenService(refreshToken: string) {
    if (!refreshToken) return { status: 'no-token', token: null } as const;

    let decoded: { sub: string; jti: string };

    try {
      decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_AUTH_SECRET as string,
      });
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        return { status: 'refresh-token-expired', token: null } as const;
      }
      return { status: 'token-invalid', token: null } as const;
    }

    const sessionDb = await getSessionByJti(
      this.prisma,
      decoded.jti,
      decoded.sub,
    );

    if (!sessionDb)
      return { status: 'no-existing-session', token: null } as const;
    if (sessionDb.expiresAt < new Date())
      return { status: 'refresh-token-expired', token: null } as const;

    await updateSessionByJti(this.prisma, decoded.jti);
    const token = await this.generateAccessToken(sessionDb.user);
    return { status: 'success', token } as const;
  }
}
