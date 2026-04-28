import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  @Patch(':id')
  async updateProductCategoryById(
    @StoreId() storeId: string,
    @Param('id') id: string,
    @Body() body: ProductsCategoryDto,
  ) {
    return await this.service.updateProductCategoryById(storeId, id, body);
  }

  @Delete(':id')
  async deleteProductCategoryById(
    @StoreId() storeId: string,
    @Param('id') id: string,
  ) {
    await this.service.deleteProductCategoryById(storeId, id);
    return { success: true };
  }
}
