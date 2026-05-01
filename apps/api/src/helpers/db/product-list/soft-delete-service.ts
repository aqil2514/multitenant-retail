import { Prisma } from 'prisma/generated/prisma/client';
import { createLog, LogEntityList } from '../activity-log/create-log';
import { formatDate } from 'src/utils/format-date';

export async function softDeleteProductHelper(
  prisma: Prisma.TransactionClient,
  storeId: string,
  productId: string,
  updatedById: string,
) {
  await prisma.product.update({
    data: {
      deletedAt: new Date().toISOString(),
      updatedById,
      stock: 0,
    },
    where: {
      storeId,
      id: productId,
    },
  });
}

export async function updateStockLog(
  prisma: Prisma.TransactionClient,
  userId: string,
  productId: string,
  storeId: string,
) {
  await prisma.stockLog.create({
    data: {
      type: 'ARCHIVED',
      quantity: 0,
      notes: 'Produk dipindahkan ke arsip',
      productId,
      storeId,
      resultStock: 0,
      userId,
    },
  });
}

export async function writeDeleteProductLog(
  prisma: Prisma.TransactionClient,
  storeId: string,
  productId: string,
  userId: string,
  product: Prisma.ProductGetPayload<{
    include: {
      category: true;
      unit: true;
    };
  }>,
) {
  const details = {
    'Dihapus Pada': formatDate(new Date(), 'Senin, 29 Desember 2025, 09:21'),
    'Nama Produk': product.name,
    Satuan: product.unit?.name ?? '-',
    SKU: product?.sku ?? '-',
    Kategori: product.category?.name ?? '-',
    'Stok Awal': product.stock,
    'Stok Minimal': product.minStock,
  };

  await createLog({
    prisma,
    action: 'Menghapus data produk',
    entity: LogEntityList.PRODUCT,
    entityId: productId,
    storeId,
    userId,
    details,
  });
}
