import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { SupplierDto } from './ps.dto';
import { StoreId } from 'src/decorator/storeId.decorator';
import { User } from 'src/decorator/user.decorator';
import type { UserJwtPayload } from 'src/@types/auth';
import { PurchaseSupplierService } from './ps.service';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/purchase/suppliers')
export class PurchaseSupplierController {
  constructor(private readonly service: PurchaseSupplierService) {}
  @Get()
  async getPurchaseSupplier() {
    console.log('OK');
    return { success: true };
  }

  @Post()
  async createNewPurchase(
    @StoreId() storeId: string,
    @User() user: UserJwtPayload,
    @Body() body: SupplierDto,
  ) {
    await this.service.createPurchaseSupplierService(storeId, user, body);
    return { success: true };
  }
}
