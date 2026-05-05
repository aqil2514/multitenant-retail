import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { SupplierDto } from 'src/app/purchase/supplier/ps.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function validateSupplierBeforeUpdate(
  tx: Prisma.TransactionClient,
  storeId: string,
  supplierId: string,
  payload: Partial<SupplierDto>,
) {
  const supplier = await tx.supplier.findFirst({
    where: { id: supplierId, storeId, deletedAt: null },
  });

  if (!supplier) {
    throw new NotFoundException('Supplier tidak ditemukan.');
  }

  if (payload.code && payload.code !== supplier.code) {
    const duplicate = await tx.supplier.findFirst({
      where: { storeId, code: payload.code, deletedAt: null },
    });
    if (duplicate) {
      throw new BadRequestException(
        `Kode supplier "${payload.code}" sudah digunakan.`,
      );
    }
  }

  return supplier;
}

export async function updateSupplier(
  tx: Prisma.TransactionClient,
  supplierId: string,
  userId: string,
  payload: SupplierDto,
) {
  return await tx.supplier.update({
    where: { id: supplierId },
    data: { ...payload, updatedById: userId },
  });
}

export async function writeUpdateSupplierLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  oldSupplier: any,
  newSupplier: any,
) {
  const details = {
    'Perubahan Nama': `${oldSupplier.name} → ${newSupplier.name}`,
    'Perubahan Kode': `${oldSupplier.code ?? '-'} → ${newSupplier.code ?? '-'}`,
    'Perubahan Status': `${oldSupplier.status} → ${newSupplier.status}`,
    'Waktu Update': new Date().toISOString(),
  };

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Memperbarui data supplier',
    entity: LogEntityList.SUPPLIER,
    entityId: newSupplier.id,
    details,
  });
}
