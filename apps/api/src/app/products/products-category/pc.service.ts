import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductsCategoryDto } from './pc.dto';
import {
  deleteCategory,
  updateProductCategoryToNull,
  writeDeleteProductCategoryLog,
} from '../../../helpers/db/product-category/delete-service';
import {
  getCategoryById,
  getProductCategoryAsTable,
} from 'src/helpers/db/product-category/base.helper';
import {
  createNewProductCategory,
  writeCreateProductCategoryLog,
} from 'src/helpers/db/product-category/create-service';
import {
  updateProductCategoryById,
  writeUpdateCategoryLog,
} from 'src/helpers/db/product-category/update-service';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductCategory(storeId: string) {
    return await getProductCategoryAsTable(this.prisma, storeId);
  }

  async createProductCategoryService(
    storeId: string,
    payload: ProductsCategoryDto,
    userId: string,
  ) {
    const category = await createNewProductCategory(
      this.prisma,
      storeId,
      payload,
      userId,
    );

    await writeCreateProductCategoryLog(
      this.prisma,
      category.id,
      storeId,
      userId,
      category,
    );
  }

  async getProductCategoryById(storeId: string, categoryId: string) {
    return await this.prisma.productCategory.findUnique({
      where: {
        id: categoryId,
        storeId,
      },
      select: {
        name: true,
        description: true,
        parentId: true,
      },
    });
  }

  async updateProductCategoryById(
    storeId: string,
    categoryId: string,
    body: ProductsCategoryDto,
    userId: string,
  ) {
    const oldProductCategory = await getCategoryById(
      this.prisma,
      storeId,
      categoryId,
    );
    const newProductCategory = await updateProductCategoryById(
      this.prisma,
      storeId,
      categoryId,
      body,
      userId,
    );

    await writeUpdateCategoryLog(
      this.prisma,
      categoryId,
      storeId,
      userId,
      oldProductCategory,
      newProductCategory,
    );
  }

  async deleteProductCategoryById(
    storeId: string,
    categoryId: string,
    userId: string,
  ) {
    const oldProductCategory = await getCategoryById(
      this.prisma,
      storeId,
      categoryId,
    );

    await this.prisma.$transaction(async (tx) => {
      await updateProductCategoryToNull(tx, storeId, categoryId);
      await deleteCategory(tx, storeId, categoryId);
      await writeDeleteProductCategoryLog(
        tx,
        categoryId,
        storeId,
        userId,
        oldProductCategory,
      );
    });
  }
}
