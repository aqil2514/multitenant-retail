import { Injectable } from '@nestjs/common';
import { getProductCategoryAsOptions } from 'src/helpers/db/product-category/base.helper';
import { getProductUnitsAsOptions } from 'src/helpers/db/product-units/base-helper';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductListDto } from './pl.dto';
import { getProductListForTable } from 'src/helpers/db/product-list/get-helper';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ProductListService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductList(storeId: string, pagination: PaginationQueryDto) {
    const { limit, page } = pagination;
    return await getProductListForTable(this.prisma, storeId, page, limit);
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
    const { unit, ...rest } = payload;
    await this.prisma.product.create({
      data: {
        ...rest,
        unitId: unit,
        storeId,
        image: `/uploads/${image.filename}`,
      },
    });
  }
}
