import { Module } from '@nestjs/common';
import { FinanceLedgersService } from './fl.service';
import { FinanceLedgersController } from './fl.controller';

@Module({
  providers: [FinanceLedgersService],
  controllers: [FinanceLedgersController],
})
export class FinanceLedgersModule {}
