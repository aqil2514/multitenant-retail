import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class OnboardingListener {
  private readonly logger = new Logger(OnboardingListener.name);

  constructor(private readonly prisma: PrismaService) {}

  private async createProductCategoryInit(storeId: string) {
    this.logger.log(`Membuat produk kategori untuk ${storeId}...`);
    await this.prisma.productCategory.createMany({
      data: [
        {
          name: 'Makanan',
          storeId,
        },
        {
          name: 'Minuman',
          storeId,
        },
        {
          name: 'Umum',
          storeId,
        },
      ],
    });
    this.logger.log(`Berhasil...`);
  }

  @OnEvent('onboarding.created')
  async handleCreateStore(storeId: string) {
    this.logger.log(`Toko dengan id ${storeId} berhasil dibuat`);
    await this.createProductCategoryInit(storeId);
  }
}
