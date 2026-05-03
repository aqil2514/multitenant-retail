import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getFinanceAccounts(
  prisma: PrismaService,
  storeId: string,
) {
  return await prisma.account.findMany({
    where: {
      storeId,
      deletedAt: null,
    },
    select: {
      id: true,
      code: true,
      name: true,
      category: true,
      normalBalance: true,
      isSystem: true,
      isHeader: true,
      parentId: true,
    },
    orderBy: {
      code: 'asc',
    },
  });
}
