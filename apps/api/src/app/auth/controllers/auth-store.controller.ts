import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthStoreService } from '../services/auth-store.service';
import { User } from 'src/decorator/user.decorator';
import type { UserJwtPayload } from 'src/@types/auth';

@UseGuards(JwtAuthGuard)
@Controller('auth/store')
export class AuthStoreController {
  constructor(private readonly service: AuthStoreService) {}

  @Get()
  async getUserStore(@User() user: UserJwtPayload) {
    const data = await this.service.getUserStores(user.sub);

    return data;
  }
}
