import { Injectable } from '@nestjs/common';
import { getProductCategoryAsOptions } from 'src/helpers/db/product-category/base.helper';
import { getProductUnitsAsOptions } from 'src/helpers/db/product-units/base-helper';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductListDto } from './pl.dto';
import {
  getProductListForDelete,
  getProductListForEdit,
  getProductListForTable,
} from 'src/helpers/db/product-list/get-helper';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import { editProductList } from 'src/helpers/db/product-list/edit-helper';
import {
  softDeleteProductHelper,
  updateStockLog,
} from 'src/helpers/db/product-list/soft-delete.helper';

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
    createdById: string,
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
        image: `http://localhost:3001/uploads/${image.filename}`,
        createdById,
      },
    });
  }

  async getProductListMode(storeId: string, productId: string, mode: string) {
    let data: any;

    if (mode === 'delete') {
      data = await getProductListForDelete(this.prisma, storeId, productId);
    } else if (mode === 'edit') {
      data = await getProductListForEdit(this.prisma, storeId, productId);
    }

    if (!data) return null;

    return data;
  }

  async editProductListMode(
    storeId: string,
    productId: string,
    body: ProductListDto,
    file: Express.Multer.File,
  ) {
    await editProductList(this.prisma, storeId, productId, body, file);
  }

  async softDeleteProduct(userId: string, storeId: string, productId: string) {
    await this.prisma.$transaction(async (tx) => {
      await softDeleteProductHelper(tx, storeId, productId);
      await updateStockLog(tx, userId, productId, storeId);
    });
  }
}
