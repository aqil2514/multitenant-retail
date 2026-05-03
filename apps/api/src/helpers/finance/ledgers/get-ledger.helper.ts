import { PrismaService } from 'src/services/prisma/prisma.service';
import { ParsedFilter } from 'src/common/dto/filter.dto';
import { FinanceLedgerFilterDto } from 'src/app/finance/ledger/fl.dto';
import { Prisma } from 'prisma/generated/prisma/client';
import { fromZonedTime } from 'date-fns-tz';
import { applyDateFilter, applyTextFilter } from 'src/common/filters';

export async function getLedgerHelper(
  prisma: PrismaService,
  storeId: string,
  query: FinanceLedgerFilterDto,
  timezone: string,
) {
  const where = buildLedgerWhere(storeId, query, timezone);
  return prisma.journalEntry.findMany({
    where,
    include: {
      items: {
        where: { deletedAt: null },
        include: { account: true },
      },
    },
    orderBy: { date: 'desc' },
  });
}

function buildLedgerWhere(
  storeId: string,
  query: FinanceLedgerFilterDto,
  timezone: string,
): Prisma.JournalEntryWhereInput {
  const where: Prisma.JournalEntryWhereInput = {
    storeId,
    deletedAt: null,
  };

  console.log(query);

  if (query.date)
    Object.assign(where, applyDateFilter('date', query.date, timezone));
  if (query.description)
    Object.assign(where, applyTextFilter('description', query.description));
  if (query.reference)
    Object.assign(where, applyTextFilter('reference', query.reference));

  return where;
}
