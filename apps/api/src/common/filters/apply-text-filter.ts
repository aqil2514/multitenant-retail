import { Prisma } from '../../../prisma/generated/prisma/client';
import { ParsedFilter } from '../dto/filter.dto';

export function applyTextFilter(
  field: string,
  filter: ParsedFilter,
): Prisma.JsonObject {
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
