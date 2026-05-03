import { PrismaService } from 'src/services/prisma/prisma.service';
import { ParsedFilter } from 'src/common/dto/filter.dto';
import { FinanceLedgerFilterDto } from 'src/app/finance/ledger/fl.dto';
import { Prisma } from 'prisma/generated/prisma/client';
import { fromZonedTime } from 'date-fns-tz';

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

  if (query.date)
    Object.assign(where, applyDateFilter('date', query.date, timezone));
  if (query.description)
    Object.assign(where, applyTextFilter('description', query.description));
  if (query.reference)
    Object.assign(where, applyTextFilter('reference', query.reference));

  return where;
}

function toUtcRange(dateStr: string, timezone: string) {
  const from = fromZonedTime(`${dateStr}T00:00:00`, timezone);
  const to = fromZonedTime(`${dateStr}T23:59:59.999`, timezone);
  return { from, to };
}

function applyTextFilter(
  field: string,
  filter: ParsedFilter,
): Prisma.JournalEntryWhereInput {
  const { operator, value } = filter;

  switch (operator) {
    case 'ilike':
      return { [field]: { contains: value, mode: 'insensitive' } };
    case 'not_ilike':
      return { [field]: { not: { contains: value, mode: 'insensitive' } } };
    case 'is_null':
      return { [field]: null };
    case 'is_not_null':
      return { [field]: { not: null } };
    default:
      return {};
  }
}

function applyDateFilter(
  field: string,
  filter: ParsedFilter,
  timezone: string,
): Prisma.JournalEntryWhereInput {
  const { operator, value } = filter;

  switch (operator) {
    case 'eq': {
      const { from, to } = toUtcRange(value, timezone);
      return { [field]: { gte: from, lte: to } };
    }
    case 'neq': {
      const { from, to } = toUtcRange(value, timezone);
      return { OR: [{ [field]: { lt: from } }, { [field]: { gt: to } }] };
    }
    case 'gt':
      return {
        [field]: { gt: fromZonedTime(`${value}T23:59:59.999`, timezone) },
      };
    case 'gte':
      return { [field]: { gte: fromZonedTime(`${value}T00:00:00`, timezone) } };
    case 'lt':
      return { [field]: { lt: fromZonedTime(`${value}T00:00:00`, timezone) } };
    case 'lte':
      return {
        [field]: { lte: fromZonedTime(`${value}T23:59:59.999`, timezone) },
      };
    case 'is_null':
      return { [field]: null };
    case 'is_not_null':
      return { [field]: { not: null } };
    case 'between': {
      const [from, to] = value.split('~');
      return {
        [field]: {
          gte: fromZonedTime(`${from}T00:00:00`, timezone),
          lte: fromZonedTime(`${to}T23:59:59.999`, timezone),
        },
      };
    }
    case 'not_between': {
      const [from, to] = value.split('~');
      return {
        OR: [
          { [field]: { lt: fromZonedTime(`${from}T00:00:00`, timezone) } },
          { [field]: { gt: fromZonedTime(`${to}T23:59:59.999`, timezone) } },
        ],
      };
    }
    default:
      return {};
  }
}
