import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';
import { FinanceAccountsService } from './fa.service';
import { StoreId } from 'src/decorator/storeId.decorator';
import { FinanceAccountDto } from './fa.dto';
import type { UserJwtPayload } from 'src/@types/auth';
import { User } from 'src/decorator/user.decorator';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/finance/accounts')
export class FinanceAccountsController {
  constructor(private readonly service: FinanceAccountsService) {}

  @Get()
  async getFinanceAccounts(@StoreId() storeId: string) {
    const data = await this.service.getFinanceAccountsService(storeId);
    return data;
  }

  @Post()
  async createFinanceAccounts(
    @StoreId() storeId: string,
    @Body() body: FinanceAccountDto,
    @User() user: UserJwtPayload,
  ) {
    await this.service.createNewFinanceAccountsService(storeId, body, user.sub);
    return { success: true };
  }

  @Patch(':id')
  async updateFinanceAccount(
    @StoreId() storeId: string,
    @Param('id') accountId: string,
    @Body() body: FinanceAccountDto,
    @User() user: UserJwtPayload,
  ) {
    await this.service.updateFinanceAccountService(
      storeId,
      accountId,
      body,
      user.sub,
    );
    return { success: true };
  }

  @Delete(':id')
  async deleteFinanceAccount(
    @StoreId() storeId: string,
    @Param('id') accountId: string,
    @User() user: UserJwtPayload,
  ) {
    await this.service.deleteFinanceAccountService(
      storeId,
      accountId,
      user.sub,
    );
    return { success: true };
  }

  @Get(':id')
  async getAccountDetail(
    @StoreId() storeId: string,
    @Param('id') accountId: string,
  ) {
    const data = await this.service.getFinanceAccountDetailService(
      storeId,
      accountId,
    );
    return data;
  }
}
