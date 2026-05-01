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
import { User } from 'src/decorator/user.decorator';
import type { UserJwtPayload } from 'src/@types/auth';

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
    @User() user: UserJwtPayload,
  ) {
    await this.service.createProductCategoryService(storeId, body, user.sub);
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
    @User() user: UserJwtPayload,
  ) {
    return await this.service.updateProductCategoryById(
      storeId,
      id,
      body,
      user.sub,
    );
  }

  @Delete(':id')
  async deleteProductCategoryById(
    @StoreId() storeId: string,
    @Param('id') id: string,
    @User() user: UserJwtPayload,
  ) {
    await this.service.deleteProductCategoryById(storeId, id, user.sub);
    return { success: true };
  }
}
