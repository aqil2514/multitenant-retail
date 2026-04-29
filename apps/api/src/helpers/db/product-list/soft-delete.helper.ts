import { Prisma } from 'prisma/generated/prisma/client';

export async function softDeleteProductHelper(
  prisma: Prisma.TransactionClient,
  storeId: string,
  productId: string,
) {
  await prisma.product.update({
    data: {
      deletedAt: new Date().toISOString(),
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
