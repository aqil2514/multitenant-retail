import { Module } from '@nestjs/common';
import { FinanceAccountsService } from './fa.service';
import { FinanceAccountsController } from './fa.controller';

@Module({
  providers: [FinanceAccountsService],
  controllers: [FinanceAccountsController],
})
export class FinanceAccountsModule {}
