import { Module } from '@nestjs/common';
import { FinanceAccountsModule } from './accounts/fa.module';

@Module({
  imports: [FinanceAccountsModule],
})
export class FinanceModule {}
