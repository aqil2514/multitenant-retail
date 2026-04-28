import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductsCategoryDto } from './pc.dto';
import {
  deleteCategory,
  updateProductCategoryToNull,
} from './pc-delete.helper';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductCategory(storeId: string) {
    return await this.prisma.productCategory.findMany({
      where: {
        storeId,
      },
      select: {
        name: true,
        description: true,
        id: true,
        createdAt: true,
        children: true,
        parentId: true,
      },
    });
  }

  async createNewProductCategory(
    storeId: string,
    payload: ProductsCategoryDto,
  ) {
    await this.prisma.productCategory.create({
      data: {
        name: payload.name,
        parentId: payload.parentId,
        description: payload.description,
        storeId,
      },
    });
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
  ) {
    return await this.prisma.productCategory.update({
      data: {
        updatedAt: new Date().toISOString(),
        name: body.name,
        parentId: body.parentId,
        description: body.description,
      },
      where: {
        storeId,
        id: categoryId,
      },
    });
  }

  async deleteProductCategoryById(storeId: string, categoryId: string) {
    await this.prisma.$transaction(async (tx) => {
      await updateProductCategoryToNull(tx, storeId, categoryId);
      await deleteCategory(tx, storeId, categoryId);
    });
  }
}
