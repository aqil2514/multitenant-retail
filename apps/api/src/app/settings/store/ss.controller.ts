import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StoreId } from 'src/decorator/storeId.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { StoreSettingsService } from './ss.service';
import type { StoreSettingsDto } from './dto/ss.dto';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/settings/store')
export class StoreSettingsController {
  constructor(private readonly service: StoreSettingsService) {}

  @Get()
  async getStoreSettings(@StoreId() storeId: string) {
    const data = await this.service.getSettingsService(storeId);

    return data;
  }

  @Patch()
  async updateStoreSettings(
    @Body() body: StoreSettingsDto,
    @StoreId() storeId: string,
    @User() user: UserJwtPayload,
  ) {
    let newSlugUrl: string | null = null;
    switch (body.section) {
      case 'identity': {
        const { newSlug } = await this.service.identityUpdateHandle(
          user.sub,
          storeId,
          body,
        );
        newSlugUrl = newSlug;
        break;
      }
      default:
        throw new BadRequestException('Identitas tidak valid');
    }

    return { success: true, newSlugUrl };
  }
}
