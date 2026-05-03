import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { StoreId } from 'src/decorator/storeId.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { StoreSettingsService } from './ss.service';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';
import { IdentityDto } from './dto/identity.dto';
import { ProductUnitDto } from './dto/product-unit.dto';
import { ConflictResolutionDto } from './dto/product-conflict-unit.dto';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/settings/store')
export class StoreSettingsController {
  constructor(private readonly service: StoreSettingsService) {}

  @Get()
  async getStoreSettings(@StoreId() storeId: string) {
    const data = await this.service.getSettingsService(storeId);

    return data;
  }

  @Patch('identity')
  async updateStoreSettings(
    @Body() body: IdentityDto,
    @StoreId() storeId: string,
    @User() user: UserJwtPayload,
  ) {
    const { newSlug: newSlugUrl } = await this.service.identityUpdateHandle(
      user.sub,
      storeId,
      body,
    );

    return { success: true, newSlugUrl };
  }

  @Patch('product-unit')
  async updateProductUnit(
    @Body() body: ProductUnitDto,
    @StoreId() storeId: string,
    @User() user: UserJwtPayload,
  ) {
    await this.service.productUnitUpdateHandle(user.sub, storeId, body);
    return { success: true };
  }

  @Patch('product-unit/handle-conflict')
  async handleProductUnitConflict(
    @Body() body: ConflictResolutionDto,
    @StoreId() storeId: string,
    @User() user: UserJwtPayload,
  ) {
    await this.service.productUnitUpdateConflictHandle(user.sub, storeId, body);
    return { success: true };
  }
}
