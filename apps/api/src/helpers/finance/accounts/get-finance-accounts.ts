import { NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
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

export async function getFinanceAccountById(
  tx: Prisma.TransactionClient,
  storeId: string,
  accountId: string,
) {
  const account = await tx.account.findFirst({
    where: {
      id: accountId,
      storeId,
      deletedAt: null,
    },
  });

  if (!account) {
    throw new NotFoundException('Akun keuangan tidak ditemukan.');
  }

  // Return objek yang dipetakan khusus untuk FinanceAccountInput
  return {
    code: account.code,
    name: account.name,
    category: account.category,
    normalBalance: account.normalBalance,
    isHeader: account.isHeader,
    parentId: account.parentId ?? 'no-parent', // Transformasi agar sesuai default form
    isSystem: account.isSystem,
  };
}
