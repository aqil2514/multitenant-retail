import { IsOptional } from 'class-validator';
import { ParsedFilter, transformFilter } from 'src/common/dto/filter.dto';

export class FinanceLedgerFilterDto {
  @IsOptional()
  @transformFilter('date')
  date?: ParsedFilter;

  @IsOptional()
  @transformFilter('account')
  account?: ParsedFilter;
}
