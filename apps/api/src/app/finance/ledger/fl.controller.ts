import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { StoreId } from 'src/decorator/storeId.decorator';
import { FinanceLedgersService } from './fl.service';
import { FinanceLedgerFilterDto } from './fl.dto';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/finance/ledgers')
export class FinanceLedgersController {
  constructor(private readonly service: FinanceLedgersService) {}

  @Get()
  findAll(@StoreId() storeId: string, @Query() query: FinanceLedgerFilterDto) {
    return this.service.getLedger(storeId, query);
  }
}
