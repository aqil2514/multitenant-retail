import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
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
import { ProductUnitDto } from './dto/product-unit.dto';
import {
  createProductUnit,
  deleteProductUnit,
  getAffectedProduct,
  getAllProductUnit,
  updateProductUnit as updateProductUnitBulk,
  writeDeleteProductUnitLog,
} from 'src/helpers/settings/store/product-unit-service';
import { ConflictResolutionDto } from './dto/product-conflict-unit.dto';
import {
  createProductUnitConflict,
  deleteProductUnitConflict,
  softDeleteProduct,
  updateProductUnit,
  updateProductUnitConflict,
  writeConflictResolutionLog,
} from 'src/helpers/settings/store/product-unit-handle-conflict-service';

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

  async productUnitUpdateHandle(
    userId: string,
    storeId: string,
    payload: ProductUnitDto,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const existing = await getAllProductUnit(tx, storeId);
      const existingIds = existing.map((u) => u.id);
      const existingMap = new Map(existing.map((unit) => [unit.id, unit]));
      const incomingIds = payload.unit.filter((u) => u.id).map((u) => u.id);
      const deletedUnits = existing.filter((u) => !incomingIds.includes(u.id));

      const toDelete = existingIds.filter((id) => !incomingIds.includes(id));
      const toUpdate = payload.unit.filter((unit) => {
        if (!unit.id) {
          return false;
        }

        const currentUnit = existingMap.get(unit.id);

        if (!currentUnit) {
          return false;
        }

        return currentUnit.name !== unit.name || currentUnit.value !== unit.value;
      });
      const toCreate = payload.unit.filter((u) => !u.id);

      const affectedProducts = await getAffectedProduct(tx, storeId, toDelete);

      if (affectedProducts.length > 0)
        throw new UnprocessableEntityException({
          message: 'Beberapa unit masih digunakan oleh produk',
          affectedProducts,
          availableUnits: payload.unit,
          toUpdate,
          toCreate,
        });

      await Promise.all([
        deleteProductUnit(tx, storeId, toDelete),
        updateProductUnitBulk(tx, storeId, toUpdate),
        createProductUnit(tx, storeId, toCreate),
        writeDeleteProductUnitLog(
          tx,
          storeId,
          userId,
          deletedUnits,
          toUpdate,
          toCreate,
        ),
      ]);
    });
  }

  async productUnitUpdateConflictHandle(
    userId: string,
    storeId: string,
    payload: ConflictResolutionDto,
  ) {
    await this.prisma.$transaction(async (tx) => {
      for (const item of payload.replacements) {
        if (item.action === 'delete') {
          await softDeleteProduct(tx, storeId, item);
        } else {
          await updateProductUnit(tx, storeId, item);
        }
      }
      await Promise.all([
        deleteProductUnitConflict(tx, storeId, payload.availableUnits),
        updateProductUnitConflict(tx, storeId, payload.toUpdate),
        createProductUnitConflict(tx, storeId, payload.toCreate),
        writeConflictResolutionLog(tx, storeId, userId, payload),
      ]);
    });
  }
}
