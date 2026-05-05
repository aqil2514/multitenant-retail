import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { SupplierDto, PurchaseSupplierFilterDto } from './ps.dto';
import { StoreId } from 'src/decorator/storeId.decorator';
import { User } from 'src/decorator/user.decorator';
import type { UserJwtPayload } from 'src/@types/auth';
import { PurchaseSupplierService } from './ps.service';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/purchase/suppliers')
export class PurchaseSupplierController {
  constructor(private readonly service: PurchaseSupplierService) {}

  @Get()
  async getPurchaseSupplier(
    @StoreId() storeId: string,
    @Query() query: PurchaseSupplierFilterDto,
  ) {
    return this.service.getSupplier(storeId, query);
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

  @Get(':id')
  async getPurchaseSupplierById(
    @StoreId() storeId: string,
    @Param('id') supplierId: string,
  ) {
    return this.service.getSupplierById(storeId, supplierId);
  }

  @Patch(':id')
  async updatePurchaseSupplier(
    @StoreId() storeId: string,
    @Param('id') supplierId: string,
    @Body() body: SupplierDto,
    @User() user: UserJwtPayload,
  ) {
    await this.service.updateSupplierService(storeId, supplierId, user, body);
    return { success: true };
  }

  @Delete(':id')
  async deletePurchaseSupplier(
    @StoreId() storeId: string,
    @Param('id') supplierId: string,
    @User() user: UserJwtPayload,
  ) {
    await this.service.deleteSupplier(storeId, supplierId, user);
    return { success: true };
  }
}
