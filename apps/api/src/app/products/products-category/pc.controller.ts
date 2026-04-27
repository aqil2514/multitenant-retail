import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { ProductCategoryService } from './pc.service';
import { StoreId } from 'src/decorator/storeId.decorator';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller()
export class ProductCategoryController {
  constructor(private readonly service: ProductCategoryService) {}

  @Get()
  async getProductCategory(@StoreId() storeId: string) {
    const data = await this.service.getProductCategory(storeId);

    return data;
  }
}
