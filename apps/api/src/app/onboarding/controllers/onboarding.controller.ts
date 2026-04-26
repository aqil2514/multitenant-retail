import {
  Body,
  Controller,
  Post,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OnBoardingService } from '../services/onboarding.service';
import { User } from 'src/decorator/user.decorator';
import type { UserJwtPayload } from 'src/@types/auth';
import { OnBoardingDto } from '../dto/onboarding.dto';

@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnBoardingController {
  constructor(private readonly service: OnBoardingService) {}

  @Post()
  async createNewStore(
    @User() user: UserJwtPayload,
    @Body() body: OnBoardingDto,
  ) {
    const storeId = await this.service.createNewStoreService(user.sub, body);

    return { storeId };
  }
}
