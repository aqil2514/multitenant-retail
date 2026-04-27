import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { ProductCategoryService } from './pc.service';
import { StoreId } from 'src/decorator/storeId.decorator';
import { ProductsCategoryDto } from './pc.dto';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller()
export class ProductCategoryController {
  constructor(private readonly service: ProductCategoryService) {}

  @Get()
  async getProductCategory(@StoreId() storeId: string) {
    const data = await this.service.getProductCategory(storeId);

    return data;
  }

  @Post()
  async createProductCategory(
    @StoreId() storeId: string,
    @Body() body: ProductsCategoryDto,
  ) {
    await this.service.createNewProductCategory(storeId, body);
    return { success: true };
  }

  @Get(':id')
  async getProductCategoryById(
    @StoreId() StoreId: string,
    @Param('id') id: string,
  ) {
    return await this.service.getProductCategoryById(StoreId, id);
  }

  // TODO : EDIT & HAPUS DATA
}
