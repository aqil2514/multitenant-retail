import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductsCategoryDto } from './pc.dto';

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
}
