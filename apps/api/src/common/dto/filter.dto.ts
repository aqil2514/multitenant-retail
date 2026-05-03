import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

const VALID_OPERATORS = [
  'eq',
  'neq',
  'gt',
  'gte',
  'lt',
  'lte',
  'ilike',
  'not_ilike',
  'is_null',
  'is_not_null',
  'between',
  'not_between',
];

const FILTER_REGEX = new RegExp(`^(${VALID_OPERATORS.join('|')}):(.*)$`);

export class ParsedFilter {
  operator: string;
  value: string;
}

export function parseFilterValue(key: string, raw: string): ParsedFilter {
  const match = raw.match(FILTER_REGEX);
  if (!match) {
    throw new BadRequestException(
      `Format filter tidak valid untuk field '${key}'. Format yang benar: operator:value`,
    );
  }
  return { operator: match[1], value: match[2] };
}

export function transformFilter(key: string) {
  return Transform(({ value }) => {
    if (value === undefined || value === null) return undefined;
    return parseFilterValue(key, value);
  });
}
