import { Controller, Get, UseGuards } from '@nestjs/common';
import { StoreId } from 'src/decorator/storeId.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { ProductListService } from './pl.service';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller()
export class ProductListController {
  constructor(private readonly service: ProductListService) {}
  @Get('')
  async getProductList(@StoreId() storeId: string) {
    const data = await this.service.getProductList(storeId);

    return data;
  }
}
