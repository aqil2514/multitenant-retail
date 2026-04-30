import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';
import type { CookieOptions, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { UserJwtPayload } from 'src/@types/auth';
import { User as UserDb } from 'prisma/generated/prisma/client';
import { User } from 'src/decorator/user.decorator';
import { ConfigService } from '@nestjs/config';
import {
  accessTokenCookieConfig,
  refreshTokenCookieConfig,
} from 'src/helpers/auth/auth.constant';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user: UserJwtPayload): Promise<UserJwtPayload> {
    return user;
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async auth() {}

  @Get('callback/google')
  @UseGuards(GoogleOauthGuard)
  async signIn(@Req() req: any, @Res() res: Response) {
    const accessToken = await this.service.generateAccessToken(
      req.user as UserDb,
    );
    const refreshToken = await this.service.generateRefreshToken(req.user, req);

    res.cookie('access_token', accessToken, accessTokenCookieConfig);
    res.cookie('refresh_token', refreshToken, refreshTokenCookieConfig);

    res.send(`
    <script>
      window.opener.postMessage({ status: 'success' }, '*');
      window.close();
    </script>
  `);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async signOut(
    @Req() req: any,
    @Res() res: Response,
    @User() user: UserJwtPayload,
    @Query('from') from: string,
  ) {
    const refreshToken = req.cookies['refresh_token'];
    await this.service.logoutService(user, from === 'onboarding', refreshToken);
    const webUrl = this.configService.get<string>('WEB_URL');
    const url = `${webUrl}/login?logout=success`;

    res.clearCookie('access_token', accessTokenCookieConfig);

    return res.redirect(url);
  }

  @Post('refresh')
  async refreshToken(@Req() req: any, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    const { status, token } =
      await this.service.refreshTokenService(refreshToken);

    switch (status) {
      case 'no-token':
        throw new UnauthorizedException('Refresh token tidak ditemukan');
      case 'token-invalid':
        throw new UnauthorizedException('Refresh token tidak valid');
      case 'refresh-token-expired':
      case 'no-existing-session':
        res.clearCookie('access_token');
        res.clearCookie('refresh_token', { path: '/auth' });
        throw new UnauthorizedException('Sesi habis, silakan login kembali');
      case 'success':
        res.cookie('access_token', token, accessTokenCookieConfig);
        return res.json({ message: 'Token diperbarui' });
      default:
        throw new Error('Status refresh token tidak valid');
    }
  }
}
