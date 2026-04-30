import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { UserJwtPayload } from 'src/@types/auth';
import { createLogoutSessionExpired } from 'src/helpers/auth/logout.helper';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    return canActivate as boolean;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (info?.name === 'TokenExpiredError') {
      const request = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();

      const token = request.cookies['access_token'] as string;

      if (token) {
        const decoded: UserJwtPayload = this.jwtService.decode(token);

        createLogoutSessionExpired(this.prisma, decoded).catch(console.error);
      }
    }
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Sesi habis, silakan login kembali')
      );
    }
    return user;
  }
}
