import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivate = await super.canActivate(context);

    return canActivate as boolean;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw (
        err || new UnauthorizedException('Sesi habis, silakan login kembali')
      );
    }
    return user;
  }
}
