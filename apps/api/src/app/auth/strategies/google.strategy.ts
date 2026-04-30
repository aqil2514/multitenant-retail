import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth2';
import { VerifiedCallback } from 'passport-jwt';
import { UserProfile, GoogleProfile } from 'src/@types/auth';
import { AuthProfileService } from '../services/auth-profile.service';
import { Prisma } from 'prisma/generated/prisma/client';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly service: AuthProfileService) {
    super({
      clientID: `${process.env.GOOGLE_AUTH_CLIENT_ID}`,
      callbackURL: `${process.env.GOOGLE_AUTH_CALLBACK_URL}`,
      clientSecret: `${process.env.GOOGLE_AUTH_CLIENT_SECRET}`,
      scope: ['profile', 'email'],
    });
  }

  async validate(
    _access_token: string,
    _refresh_token: string,
    profile: GoogleProfile,
    done: VerifiedCallback,
  ) {
    const user = await this.service.getGoogleUser(profile.sub);
    if (user) {
      return done(null, user);
    }

    const newUser = await this.service.handleCreateUser(profile);

    done(null, newUser);
  }
}
