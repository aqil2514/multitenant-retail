import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StoreId } from 'src/decorator/storeId.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { ProductListService } from './pl.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductListDto } from './pl.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller()
export class ProductListController {
  constructor(private readonly service: ProductListService) {}
  @Get('')
  async getProductList(
    @StoreId() storeId: string,
    @Query() pagination: PaginationQueryDto,
  ) {
    const data = await this.service.getProductList(storeId, pagination);

    return data;
  }

  @Get('rss')
  async getProductListResources(@StoreId() storeId: string) {
    return await this.service.getProductListResources(storeId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createNewProduct(
    @StoreId() storeId: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ProductListDto,
  ) {
    await this.service.createNewProductList(storeId, file, body);
    return { success: true };
  }

  @Get(':mode/:id')
  async getProductListById(
    @StoreId() storeId: string,
    @Param('id') productId: string,
    @Param('mode') mode: string,
  ) {
    const data = await this.service.getProductListMode(
      storeId,
      productId,
      mode,
    );

    return data;
  }

  @Patch(':mode/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProductList(
    @StoreId() storeId: string,
    @Param('id') productId: string,
    @Param('mode') mode: string,
    @Body() body: ProductListDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (mode !== 'edit') throw new BadRequestException('Mode tidak valid');

    await this.service.editProductListMode(storeId, productId, body, file);

    return { success: true };
  }

  @Delete(':mode/:id')
  async softDeleteProductList(
    @StoreId() storeId: string,
    @Param('id') productId: string,
    @Param('mode') mode: string,
  ) {
    if (mode !== 'delete') throw new BadRequestException('Mode tidak valid');

    await this.service.softDeleteProduct(storeId, productId);

    return { success: true };
  }
}
