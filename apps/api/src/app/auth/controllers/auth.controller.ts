import { Controller, Get, Req, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';
import type { CookieOptions, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import type { UserJwtPayload } from 'src/@types/auth';
import { User as UserDb } from 'prisma/generated/prisma/client';
import { User } from 'src/decorator/user.decorator';
import { WEB_URL } from 'src/constants/url';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private cookiesConfig: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

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
  async signIn(@Req() req, @Res() res: Response) {
    const token = await this.service.signJwt(req.user as UserDb);

    res.cookie('access_token', token, this.cookiesConfig);

    res.send(`
    <script>
      window.opener.postMessage({ status: 'success' }, '*');
      window.close();
    </script>
  `);
  }

  @Get('/logout')
  signOut(@Res() res: Response) {
    const webUrl = this.configService.get<string>('WEB_URL');
    res.clearCookie('access_token', this.cookiesConfig);
    const url = `${webUrl}/login?logout=success`;

    return res.redirect(url);
  }
}
