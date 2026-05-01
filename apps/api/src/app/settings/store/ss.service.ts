import { BadRequestException, Injectable } from '@nestjs/common';
import {
  getProductUnits,
  getStoreIdentity,
} from 'src/helpers/db/settings-store/get-service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { IdentityDto } from './dto/identity.dto';
import { checkStoreSlug, getStoreById } from 'src/helpers/db/store/base-helper';
import {
  updateStoreIdentity,
  writeUpdateIdentityLog,
} from 'src/helpers/settings/store/identity-service';

@Injectable()
export class StoreSettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettingsService(storeId: string) {
    const [productUnits, storeIdentity] = await Promise.all([
      getProductUnits(this.prisma, storeId),
      getStoreIdentity(this.prisma, storeId),
    ]);

    return { productUnits, storeIdentity };
  }

  async identityUpdateHandle(
    userId: string,
    storeId: string,
    payload: IdentityDto,
  ) {
    const oldStore = await getStoreById(this.prisma, storeId);
    const isDupplicate = await checkStoreSlug(this.prisma, payload.slug);
    if (isDupplicate && !oldStore.slug)
      throw new BadRequestException(
        `Slug "${payload.slug}" sudah digunakan. Silahkan gunakan slug lain`,
      );

    const newStore = await updateStoreIdentity(this.prisma, storeId, payload);
    await writeUpdateIdentityLog(
      this.prisma,
      storeId,
      userId,
      oldStore,
      newStore,
    );

    const isNewSlug = oldStore.slug !== payload.slug;

    return { newSlug: isNewSlug ? newStore.slug : null };
  }
}
