import { Injectable } from '@nestjs/common';
import { getProductCategoryAsOptions } from 'src/helpers/db/product-category/base.helper';
import { getProductUnitsAsOptions } from 'src/helpers/db/product-units/base-helper';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductListDto } from './pl.dto';
import {
  getProductListById,
  getProductListForDelete,
  getProductListForEdit,
  getProductListForTable,
} from 'src/helpers/db/product-list/get-helper';
import { PaginationQueryDto } from 'src/common/dto/pagination.dto';
import {
  editProductList,
  writeEditProductList,
} from 'src/helpers/db/product-list/edit-service';
import {
  softDeleteProductHelper,
  updateStockLog,
  writeDeleteProductLog,
} from 'src/helpers/db/product-list/soft-delete-service';
import {
  createNewProductList,
  writeCreateProductList,
} from 'src/helpers/db/product-list/create-service';

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

  async createProductListService(
    createdById: string,
    storeId: string,
    image: Express.Multer.File,
    payload: ProductListDto,
  ) {
    const product = await createNewProductList(
      this.prisma,
      createdById,
      storeId,
      image,
      payload,
    );

    await writeCreateProductList(this.prisma, createdById, storeId, product);
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

  async editProductService(
    storeId: string,
    productId: string,
    body: ProductListDto,
    file: Express.Multer.File,
    userId: string,
  ) {
    const oldProduct = await getProductListById(
      this.prisma,
      storeId,
      productId,
    );
    const newProduct = await editProductList(
      this.prisma,
      storeId,
      productId,
      body,
      file,
      userId,
    );

    await writeEditProductList(
      this.prisma,
      storeId,
      productId,
      userId,
      oldProduct,
      newProduct,
    );
  }

  async softDeleteProduct(userId: string, storeId: string, productId: string) {
    const oldProduct = await getProductListById(
      this.prisma,
      storeId,
      productId,
    );
    await this.prisma.$transaction(async (tx) => {
      await softDeleteProductHelper(tx, storeId, productId, userId);
      await updateStockLog(tx, userId, productId, storeId);

      await writeDeleteProductLog(tx, storeId, productId, userId, oldProduct);
    });
  }
}
