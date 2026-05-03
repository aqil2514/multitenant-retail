import { Module } from '@nestjs/common';
import { FinanceAccountsModule } from './accounts/fa.module';
import { FinanceJournalsModule } from './journals/fj.module';
import { FinanceLedgersModule } from './ledger/fl.module';

@Module({
  imports: [FinanceAccountsModule, FinanceJournalsModule, FinanceLedgersModule],
})
export class FinanceModule {}
