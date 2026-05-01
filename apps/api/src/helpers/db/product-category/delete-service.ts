import { Prisma, ProductCategory } from 'prisma/generated/prisma/client';
import { createLog, LogEntityList } from '../activity-log/create-log';
import { formatDate } from 'src/utils/format-date';

export async function deleteCategory(
  prisma: Prisma.TransactionClient,
  storeId: string,
  categoryId: string,
) {
  return await prisma.productCategory.delete({
    where: {
      storeId,
      id: categoryId,
    },
    select: {
      id: true,
    },
  });
}

export async function updateProductCategoryToNull(
  prisma: Prisma.TransactionClient,
  storeId: string,
  categoryId: string,
) {
  return await prisma.product.updateMany({
    data: {
      categoryId: null,
    },
    where: {
      storeId,
      categoryId,
    },
  });
}

export async function writeDeleteProductCategoryLog(
  prisma: Prisma.TransactionClient,
  categoryId: string,
  storeId: string,
  userId: string,
  oldCategory: ProductCategory,
) {
  const details = {
    'Nama Kategori': oldCategory.name,
    'Deskripsi Kategori': oldCategory.description,
    'Dihapus Pada': formatDate(new Date(), 'Senin, 29 Desember 2025, 09:21'),
  };
  await createLog({
    prisma,
    action: 'Menghapus kategori produk',
    entity: LogEntityList.PRODUCT_CATEGORY,
    entityId: categoryId,
    storeId,
    userId,
    details,
  });
}
