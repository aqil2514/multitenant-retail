import { Injectable } from '@nestjs/common';
import { getFinanceAccounts } from 'src/helpers/finance/accounts/get-finance-accounts';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class FinanceAccountsService {
  constructor(private readonly prisma: PrismaService) {}
  async getFinanceAccountsService(storeId: string) {
    const data = await getFinanceAccounts(this.prisma, storeId);

    return data;
  }
}
