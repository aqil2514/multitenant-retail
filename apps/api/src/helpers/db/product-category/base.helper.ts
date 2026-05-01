import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getProductCategoryAsOptions(
  prisma: PrismaService,
  storeId: string,
) {
  const result = await prisma.productCategory.findMany({
    where: {
      storeId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  const options = result.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  return options;
}

export async function getProductCategoryAsTable(
  prisma: PrismaService,
  storeId: string,
) {
  return await prisma.productCategory.findMany({
    where: {
      storeId,
    },
    select: {
      name: true,
      description: true,
      id: true,
      createdAt: true,
      children: true,
      parentId: true,
      createdBy: {
        select: {
          id: true,
          email: true,
        },
      },
      updatedBy: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
}

export async function getCategoryById(
  prisma: PrismaService,
  storeId: string,
  categoryId: string,
) {
  return await prisma.productCategory.findFirstOrThrow({
    where: {
      id: categoryId,
      storeId,
    },
  });
}
