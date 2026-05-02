import { Prisma } from 'prisma/generated/prisma/client';
import {
  ProductUnitDto,
  UnitDto,
} from 'src/app/settings/store/dto/product-unit.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';
import { formatDate } from 'src/utils/format-date';

export async function getAllProductUnit(
  tx: Prisma.TransactionClient,
  storeId: string,
) {
  return tx.productUnit.findMany({
    where: { storeId },
    select: { id: true, name: true, value: true },
  });
}

export async function getAffectedProduct(
  tx: Prisma.TransactionClient,
  storeId: string,
  toDelete: string[],
) {
  return await tx.product.findMany({
    where: {
      storeId,
      unitId: { in: toDelete },
    },
    select: {
      id: true,
      name: true,
      unit: {
        select: {
          id: true,
          name: true,
          value: true,
        },
      },
    },
  });
}

export async function deleteProductUnit(
  tx: Prisma.TransactionClient,
  storeId: string,
  toDeleted: string[],
) {
  await tx.productUnit.deleteMany({
    where: {
      storeId,
      id: {
        in: toDeleted,
      },
    },
  });
}

export async function updateProductUnit(
  tx: Prisma.TransactionClient,
  storeId: string,
  toUpdate: UnitDto[],
) {
  for (const item of toUpdate) {
    await tx.productUnit.update({
      where: {
        storeId,
        id: item.id,
      },
      data: {
        name: item.name,
        value: item.value,
        updatedAt: new Date().toISOString(),
      },
    });
  }
}

export async function createProductUnit(
  tx: Prisma.TransactionClient,
  storeId: string,
  toCreate: UnitDto[],
) {
  for (const item of toCreate) {
    await tx.productUnit.create({
      data: {
        name: item.name,
        value: item.value,
        storeId,
      },
    });
  }
}

// TODO : Di sini ada yang ga rapih juga.
export async function writeDeleteProductUnitLog(
  tx: Prisma.TransactionClient,
  storeId: string,
  userId: string,
  deletedUnits: UnitDto[],
  updatedUnits: UnitDto[],
  createdUnits: UnitDto[],
) {
  const details = {
    'Diperbarui Pada': formatDate(new Date(), 'Senin, 29 Desember 2025, 09:21'),
    'Unit Dihapus':
      deletedUnits.length > 0
        ? deletedUnits.map((u) => u.name).join(', ')
        : '-',
    'Unit Diperbarui':
      updatedUnits.length > 0
        ? updatedUnits.map((u) => `${u.name} (${u.value})`).join(', ')
        : '-',
    'Unit Ditambahkan':
      createdUnits.length > 0
        ? createdUnits.map((u) => `${u.name} (${u.value})`).join(', ')
        : '-',
    'Total Unit Dihapus': deletedUnits.length,
    'Total Unit Diperbarui': updatedUnits.length,
    'Total Unit Ditambahkan': createdUnits.length,
  };

  await createLog({
    prisma: tx,
    action: 'Memperbarui produk unit',
    entity: LogEntityList.PRODUCT_UNIT,
    entityId: 'BULK',
    storeId,
    userId,
    details,
  });
}
