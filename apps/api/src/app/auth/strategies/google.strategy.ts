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
    const { id, name, emails, photos } = profile;
    const user = await this.service.getUserByProviderId(profile.sub);
    if (user) {
      return done(null, user);
    }

    const googlePayload: UserProfile = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      picture: photos[0].value,
    };

    const dbPayload: Prisma.UserCreateInput = {
      email: googlePayload.email,
      name: googlePayload.name,
      picture: googlePayload.picture,
      provider: googlePayload.provider,
      providerId: profile.sub,
    };

    const newUser = await this.service.createNewUser(dbPayload);

    done(null, newUser);
  }
}
