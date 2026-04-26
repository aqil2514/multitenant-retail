import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthProfileService } from '../services/auth-profile.service';
import { User } from 'src/decorator/user.decorator';
import type { UserJwtPayload } from 'src/@types/auth';

@UseGuards(JwtAuthGuard)
@Controller('auth/user')
export class AuthUserController {
  constructor(private readonly service: AuthProfileService) {}

  @Get('')
  async getUserHeader(@User() user: UserJwtPayload) {
    return await this.service.getUserProfile(user.sub);
  }
}
