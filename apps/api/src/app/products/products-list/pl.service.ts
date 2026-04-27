import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

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
}
