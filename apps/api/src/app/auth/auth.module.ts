import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtService } from '@nestjs/jwt';
import { AuthProfileService } from './services/auth-profile.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthUserController } from './controllers/auth-user.controller';
import { AuthStoreController } from './controllers/auth-store.controller';
import { AuthStoreService } from './services/auth-store.service';

@Module({
  controllers: [AuthController, AuthUserController, AuthStoreController],
  providers: [
    AuthService,
    GoogleStrategy,
    JwtStrategy,
    JwtService,
    AuthProfileService,
    AuthStoreService,
  ],
})
export class AuthModule {}
