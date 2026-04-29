import { ResponseMeta } from 'src/@types/server';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { getResponsePagination } from 'src/utils/query';

export async function getProductListForTable(
  prisma: PrismaService,
  storeId: string,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const whereCondition = {
    storeId,
    deletedAt: null,
  };

  const getData = prisma.product.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      name: true,
      sku: true,
      image: true,
      stock: true,
      minStock: true,
      category: { select: { name: true } },
      unit: { select: { name: true } },
      updatedAt: true,
    },
    where: {
      deletedAt: null,
    },
    orderBy: { updatedAt: 'desc' },
  });

  const getPagination = prisma.product.count({
    where: whereCondition,
  });

  const [data, total] = await Promise.all([getData, getPagination]);

  const meta: ResponseMeta = {
    pagination: getResponsePagination(total, page, limit),
  };

  return {
    data,
    meta,
  };
}

export async function getProductListForDelete(
  prisma: PrismaService,
  storeId: string,
  productId: string,
) {
  const dbData = await prisma.product.findFirst({
    where: {
      id: productId,
      storeId,
    },
    select: {
      name: true,
      sku: true,
      stock: true,
      category: {
        select: {
          name: true,
        },
      },
      unit: {
        select: {
          name: true,
        },
      },
    },
  });

  const data = {
    ...dbData,
    category: dbData?.category?.name || null,
    unit: dbData?.unit?.name || null,
  };
  return data;
}

export async function getProductListForEdit(
  prisma: PrismaService,
  storeId: string,
  productId: string,
) {
  const dbData = await prisma.product.findFirst({
    where: {
      storeId,
      id: productId,
    },
    select: {
      name: true,
      categoryId: true,
      description: true,
      image: true,
      minStock: true,
      sku: true,
      stock: true,
      unitId: true,
    },
  });

  const data = {
    ...dbData,
    unit: dbData?.unitId,
  };

  return data;
}
