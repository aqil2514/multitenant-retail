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
