import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class OnboardingListener {
  private readonly logger = new Logger(OnboardingListener.name);

  constructor(private readonly prisma: PrismaService) {}

  private async createProductCategoryInit(storeId: string) {
    this.logger.log(`Membuat produk kategori untuk ${storeId}...`);
    const result = await this.prisma.productCategory.createMany({
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
    this.logger.log(`Berhasil membuat ${result.count} kategori`);
  }

  private async createStoreUserInit(storeId: string, userId: string) {
    this.logger.log(`Membuat user untuk toko ${storeId}`);

    await this.prisma.storeUser.create({
      data: {
        role: 'owner',
        storeId,
        userId,
      },
    });

    this.logger.log(
      `User untuk toko ${storeId} berhasil dibuat dengan ${userId} sebagai ownernya`,
    );
  }

  @OnEvent('onboarding.created', { async: true })
  async handleCreateStore(payload: { storeId: string; userId: string }) {
    const { storeId, userId } = payload;
    this.logger.log(`Toko dengan id ${storeId} berhasil dibuat`);
    await this.createProductCategoryInit(storeId);

    await this.createStoreUserInit(storeId, userId);
  }
}
