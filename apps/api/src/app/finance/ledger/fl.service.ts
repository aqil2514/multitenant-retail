import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FinanceLedgerFilterDto } from './fl.dto';
import {
  getAccountStore,
  getLedgerHelper,
  getLedgerSummaryHelper,
} from 'src/helpers/finance/ledgers/get-ledger.helper';

@Injectable()
export class FinanceLedgersService {
  constructor(private readonly prisma: PrismaService) {}

  async getLedger(storeId: string, query: FinanceLedgerFilterDto) {
    const [data, accounts, summary] = await Promise.all([
      getLedgerHelper(this.prisma, storeId, query),
      getAccountStore(this.prisma, storeId),
      getLedgerSummaryHelper(this.prisma, storeId, query),
    ]);
    return { data, accounts, summary };
  }
}
