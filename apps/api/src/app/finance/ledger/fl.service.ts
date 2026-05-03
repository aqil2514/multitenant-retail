import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FinanceLedgerFilterDto } from './fl.dto';
import { getLedgerHelper } from 'src/helpers/finance/ledgers/get-ledger.helper';

@Injectable()
export class FinanceLedgersService {
  constructor(private readonly prisma: PrismaService) {}

  async getLedger(
    storeId: string,
    query: FinanceLedgerFilterDto,
    timezone: string,
  ) {
    return getLedgerHelper(this.prisma, storeId, query, timezone);
  }
}
