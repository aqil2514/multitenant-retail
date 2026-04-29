import { ResponseMeta } from 'src/@types/server';
import { getResponsePagination } from 'src/helpers/meta-response/pagination';
import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getActivityLogForTable(
  prisma: PrismaService,
  storeId: string,
  page: number = 1,
  limit: number = 10,
) {
  const skip = (page - 1) * limit;

  const whereCondition = {
    storeId,
  };

  const getData = prisma.activityLog.findMany({
    skip,
    take: limit,
    select: {
      id: true,
      action: true,
      entity: true,
      entityId: true,
      details: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const getPagination = prisma.activityLog.count({
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
