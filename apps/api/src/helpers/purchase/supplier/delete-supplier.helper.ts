import { NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function validateSupplierBeforeDelete(
  tx: Prisma.TransactionClient,
  storeId: string,
  supplierId: string,
) {
  const supplier = await tx.supplier.findFirst({
    where: { id: supplierId, storeId, deletedAt: null },
  });

  if (!supplier) {
    throw new NotFoundException('Supplier tidak ditemukan.');
  }

  return supplier;
}

export async function softDeleteSupplier(
  tx: Prisma.TransactionClient,
  supplierId: string,
) {
  return await tx.supplier.update({
    where: { id: supplierId },
    data: { deletedAt: new Date() },
  });
}

export async function writeDeleteSupplierLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  supplier: Prisma.SupplierGetPayload<{
    select: { id: true; code: true; name: true };
  }>,
) {
  const details = {
    'Kode Supplier': supplier.code ?? '-',
    'Nama Supplier': supplier.name,
    Status: 'Dihapus (Soft Delete)',
    'Waktu Penghapusan': new Date().toISOString(),
  };

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Menghapus data supplier',
    entity: LogEntityList.SUPPLIER,
    entityId: supplier.id,
    details,
  });
}
