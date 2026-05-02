import { Prisma } from 'prisma/generated/prisma/client';
import { ReplacementItemDto } from 'src/app/settings/store/dto/product-conflict-unit.dto';
import { UnitDto } from 'src/app/settings/store/dto/product-unit.dto';
import { ConflictResolutionDto } from 'src/app/settings/store/dto/product-conflict-unit.dto';
import { formatDate } from 'src/utils/format-date';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function softDeleteProduct(
  tx: Prisma.TransactionClient,
  storeId: string,
  item: ReplacementItemDto,
) {
  await tx.product.update({
    where: {
      id: item.productId,
      storeId,
    },
    data: {
      deletedAt: new Date().toISOString(),
    },
  });
}

export async function updateProductUnit(
  tx: Prisma.TransactionClient,
  storeId: string,
  item: ReplacementItemDto,
) {
  await tx.product.update({
    where: {
      id: item.productId,
      storeId,
    },
    data: {
      unitId: item.unitId,
    },
  });
}

export async function deleteProductUnitConflict(
  tx: Prisma.TransactionClient,
  storeId: string,
  availableProduct: UnitDto[],
) {
  const availableUnitIds = availableProduct
    .map((unit) => unit.id)
    .filter((id): id is string => Boolean(id));

  await tx.productUnit.deleteMany({
    where: {
      storeId,
      id: {
        notIn: availableUnitIds,
      },
    },
  });
}

export async function updateProductUnitConflict(
  tx: Prisma.TransactionClient,
  storeId: string,
  toUpdate: UnitDto[],
) {
  for (const item of toUpdate) {
    if (!item.id) {
      continue;
    }

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

export async function createProductUnitConflict(
  tx: Prisma.TransactionClient,
  storeId: string,
  toCreate: UnitDto[],
) {
  for (const item of toCreate) {
    await tx.productUnit.create({
      data: {
        storeId,
        name: item.name,
        value: item.value,
      },
    });
  }
}

export async function writeConflictResolutionLog(
  tx: Prisma.TransactionClient,
  storeId: string,
  userId: string,
  payload: ConflictResolutionDto,
) {
  const deleted = payload.replacements.filter((r) => r.action === 'delete');
  const replaced = payload.replacements.filter((r) => r.action === 'replace');
  const productIds = payload.replacements.map((r) => r.productId);
  const nextUnitIds = replaced
    .map((r) => r.unitId)
    .filter((unitId): unitId is string => Boolean(unitId));

  const [products, nextUnits] = await Promise.all([
    tx.product.findMany({
      where: {
        storeId,
        id: { in: productIds },
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
    }),
    tx.productUnit.findMany({
      where: {
        storeId,
        id: { in: nextUnitIds },
      },
      select: {
        id: true,
        name: true,
        value: true,
      },
    }),
  ]);

  const productMap = new Map(products.map((product) => [product.id, product]));
  const nextUnitMap = new Map(nextUnits.map((unit) => [unit.id, unit]));
  const formatUnitLabel = (unit?: { name: string; value: string } | null) =>
    unit ? `${unit.name} (${unit.value})` : '-';

  const details = {
    'Diperbarui Pada': formatDate(new Date(), 'Senin, 29 Desember 2025, 09:21'),
    'Produk Dihapus':
      deleted.length > 0
        ? deleted
            .map(
              (item) => productMap.get(item.productId)?.name ?? item.productId,
            )
            .join(', ')
        : '-',
    'Produk Dipindah Satuan':
      replaced.length > 0
        ? replaced
            .map((item) => {
              const product = productMap.get(item.productId);
              const nextUnit = item.unitId
                ? nextUnitMap.get(item.unitId)
                : undefined;

              return `${product?.name ?? item.productId}: ${formatUnitLabel(product?.unit)} → ${formatUnitLabel(nextUnit)}`;
            })
            .join(', ')
        : '-',
    'Total Produk Dihapus': deleted.length,
    'Total Produk Dipindah Satuan': replaced.length,
    'Unit Tersisa':
      payload.availableUnits.length > 0
        ? payload.availableUnits.map((u) => `${u.name} (${u.value})`).join(', ')
        : '-',
    'Unit Diperbarui':
      payload.toUpdate.length > 0
        ? payload.toUpdate.map((u) => `${u.name} (${u.value})`).join(', ')
        : '-',
    'Unit Ditambahkan':
      payload.toCreate.length > 0
        ? payload.toCreate.map((u) => `${u.name} (${u.value})`).join(', ')
        : '-',
  };

  await createLog({
    prisma: tx,
    action: 'Resolusi konflik produk unit',
    entity: LogEntityList.PRODUCT_UNIT,
    entityId: 'BULK',
    storeId,
    userId,
    details,
  });
}
