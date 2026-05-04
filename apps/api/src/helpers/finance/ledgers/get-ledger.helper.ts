import { PrismaService } from 'src/services/prisma/prisma.service';
import { FinanceLedgerFilterDto } from 'src/app/finance/ledger/fl.dto';
import { fromZonedTime } from 'date-fns-tz';
import { Prisma } from 'prisma/generated/prisma/client';

export async function getLedgerHelper(
  prisma: PrismaService,
  storeId: string,
  query: FinanceLedgerFilterDto,
  timezone: string,
) {
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;

  if (query.date?.value) {
    const [fromStr, toStr] = query.date.value.split('~');
    from = fromZonedTime(new Date(fromStr), timezone);
    to = fromZonedTime(new Date(toStr), timezone);
  }

  const baseItemWhere: Prisma.JournalItemWhereInput = {
    deletedAt: null,
    ...(query.account?.value && { accountId: query.account.value }),
  };

  return prisma.journalEntry.findMany({
    where: {
      storeId,
      deletedAt: null,
      ...(from && to && { date: { gte: from, lte: to } }),
      ...(query.account?.value && {
        items: { some: baseItemWhere },
      }),
    },
    include: {
      items: {
        where: baseItemWhere,
        include: { account: true },
      },
    },
    orderBy: { date: 'asc' },
  });
}

export async function getLedgerSummaryHelper(
  prisma: PrismaService,
  storeId: string,
  query: FinanceLedgerFilterDto,
  timezone: string,
) {
  let from: Date | undefined = undefined;
  let to: Date | undefined = undefined;

  if (query.date?.value) {
    const [fromStr, toStr] = query.date.value.split('~');
    from = fromZonedTime(new Date(fromStr), timezone);
    to = fromZonedTime(new Date(toStr), timezone);
  }

  const baseItemWhere: Prisma.JournalItemWhereInput = {
    deletedAt: null,
    ...(query.account?.value && { accountId: query.account.value }),
  };

  const [openingBalance, periodAggregate] = await Promise.all([
    prisma.journalItem.aggregate({
      where: {
        ...baseItemWhere,
        journalEntry: {
          storeId,
          deletedAt: null,
          ...(from && { date: { lt: from } }),
        },
      },
      _sum: { debit: true, credit: true },
    }),

    prisma.journalItem.aggregate({
      where: {
        ...baseItemWhere,
        journalEntry: {
          storeId,
          deletedAt: null,
          ...(from && to && { date: { gte: from, lte: to } }),
        },
      },
      _sum: { debit: true, credit: true },
    }),
  ]);

  const openingDebit = Number(openingBalance._sum.debit ?? 0);
  const openingCredit = Number(openingBalance._sum.credit ?? 0);
  const openingBalanceValue = openingDebit - openingCredit;

  const totalDebit = Number(periodAggregate._sum.debit ?? 0);
  const totalCredit = Number(periodAggregate._sum.credit ?? 0);
  const closingBalance = openingBalanceValue + totalDebit - totalCredit;

  return {
    openingBalance: openingBalanceValue,
    totalDebit,
    totalCredit,
    closingBalance,
  };
}

export async function getAccountStore(prisma: PrismaService, storeId: string) {
  return await prisma.account.findMany({
    where: {
      storeId,
      deletedAt: null,
    },
    select: {
      code: true,
      name: true,
      id: true,
    },
  });
}
