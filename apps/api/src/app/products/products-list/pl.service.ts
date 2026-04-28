import { Injectable } from '@nestjs/common';
import { getProductCategoryAsOptions } from 'src/helpers/db/product-category/base.helper';
import { getProductUnitsAsOptions } from 'src/helpers/db/product-units/base-helper';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductListDto } from './pl.dto';

@Injectable()
export class ProductListService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductList(storeId: string) {
    return await this.prisma.product.findMany({
      where: {
        storeId,
      },
    });
  }

  async getProductListResources(storeId: string) {
    const [productUnits, productCategories] = await Promise.all([
      getProductUnitsAsOptions(this.prisma, storeId),
      getProductCategoryAsOptions(this.prisma, storeId),
    ]);

    return { productUnits, productCategories };
  }

  async createNewProductList(
    storeId: string,
    image: Express.Multer.File,
    payload: ProductListDto,
  ) {
    await this.prisma.product.create({
      data: {
        name: payload.name,
        categoryId: payload.categoryId,
        unitId: payload.unit,
        storeId,
        image: `/uploads/${image.filename}`,
        minStock: payload.minStock,
        description: payload.description,
        sku: payload.sku,
        stock: payload.stock,
      },
    });
  }
}
