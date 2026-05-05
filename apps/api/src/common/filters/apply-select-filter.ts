import { Prisma } from '../../../prisma/generated/prisma/client';
import { ParsedFilter } from '../dto/filter.dto';

export function applySelectFilter(
  field: string,
  filter: ParsedFilter,
): Prisma.JsonObject {
  const { operator, value } = filter;

  switch (operator) {
    case 'eq':
      return { [field]: value };
    case 'neq':
      return { [field]: { not: value } };
    case 'is_null':
      return { [field]: null };
    case 'is_not_null':
      return { [field]: { not: null } };
    default:
      return {};
  }
}
