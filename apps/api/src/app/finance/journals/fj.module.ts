import { Module } from '@nestjs/common';
import { FinanceJournalsController } from './fj.controller';
import { FinanceJournalsService } from './fj.service';

@Module({
  controllers: [FinanceJournalsController],
  providers: [FinanceJournalsService],
})
export class FinanceJournalsModule {}
