import { Module } from '@nestjs/common';
import { FinanceAccountsModule } from './accounts/fa.module';
import { FinanceJournalsModule } from './journals/fj.module';

@Module({
  imports: [FinanceAccountsModule, FinanceJournalsModule],
})
export class FinanceModule {}
