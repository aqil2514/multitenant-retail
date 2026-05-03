import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { FinanceAccountsService } from './fa.service';
import { StoreId } from 'src/decorator/storeId.decorator';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/finance/accounts')
export class FinanceAccountsController {
  constructor(private readonly service: FinanceAccountsService) {}
  @Get()
  async getFinanceAccounts(@StoreId() storeId: string) {
    const data = await this.service.getFinanceAccountsService(storeId);
    return data;
  }
}
