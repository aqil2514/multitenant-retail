import { Prisma } from 'prisma/generated/prisma/client';

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
