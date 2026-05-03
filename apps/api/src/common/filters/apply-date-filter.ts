import { ParsedFilter } from '../dto/filter.dto';
import { fromZonedTime } from 'date-fns-tz';

function toUtcRange(dateStr: string, timezone: string) {
  const from = fromZonedTime(`${dateStr}T00:00:00`, timezone);
  const to = fromZonedTime(`${dateStr}T23:59:59.999`, timezone);
  return { from, to };
}

export function applyDateFilter(
  field: string,
  filter: ParsedFilter,
  timezone: string,
): Record<string, unknown> {
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
