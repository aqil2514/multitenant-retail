import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  createProductCategoryInit,
  createProductUnitInit,
  createStoreUserInit,
} from 'src/helpers/onboarding/onboarding.helper';
import { createProductDevInit } from 'src/helpers/test-dev/onboarding.dev';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class OnboardingListener {
  private readonly logger = new Logger(OnboardingListener.name);

  constructor(private readonly prisma: PrismaService) {}

  @OnEvent('onboarding.created', { async: true })
  async handleCreateStore(payload: { storeId: string; userId: string }) {
    const { storeId, userId } = payload;
    this.logger.log(`Toko dengan id ${storeId} berhasil dibuat`);

    await Promise.all([
      createProductCategoryInit(storeId, this.logger, this.prisma),
      createProductUnitInit(storeId, this.logger, this.prisma),
      createStoreUserInit(storeId, userId, this.logger, this.prisma),
    ]);

    // DEV AJAH. NANTI HAPUS DI PROD
    await createProductDevInit(storeId, this.logger, this.prisma);
  }
}
