import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getProductCategory(storeId: string) {
    return await this.prisma.productCategory.findMany({
      where: {
        storeId,
      },
    });
  }
}
