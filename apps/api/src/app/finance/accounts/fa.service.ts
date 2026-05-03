import { Injectable } from '@nestjs/common';
import {
  getFinanceAccountById,
  getFinanceAccounts,
} from 'src/helpers/finance/accounts/get-finance-accounts';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { FinanceAccountDto } from './fa.dto';
import {
  createNewFinanceAccount,
  validateAccountBeforeCreate,
  writeCreateAccountLog,
} from 'src/helpers/finance/accounts/create-finance-accounts';
import {
  updateFinanceAccount,
  validateAccountBeforeUpdate,
  writeUpdateAccountLog,
} from 'src/helpers/finance/accounts/update-finance-accounts';
import {
  softDeleteFinanceAccount,
  validateAccountBeforeDelete,
  writeDeleteAccountLog,
} from 'src/helpers/finance/accounts/delete-finance-accounts';

@Injectable()
export class FinanceAccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFinanceAccountsService(storeId: string) {
    const data = await getFinanceAccounts(this.prisma, storeId);

    return data;
  }

  async getFinanceAccountDetailService(storeId: string, accountId: string) {
    return await this.prisma.$transaction(async (tx) => {
      return await getFinanceAccountById(tx, storeId, accountId);
    });
  }

  async createNewFinanceAccountsService(
    storeId: string,
    body: FinanceAccountDto,
    userId: string,
  ) {
    await this.prisma.$transaction(async (tx) => {
      await validateAccountBeforeCreate(tx, storeId, body.code, body.parentId);

      const created = await createNewFinanceAccount(tx, storeId, body);

      await writeCreateAccountLog(tx, userId, storeId, created);
    });
  }

  async updateFinanceAccountService(
    storeId: string,
    accountId: string,
    body: FinanceAccountDto,
    userId: string,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const oldData = await validateAccountBeforeUpdate(
        tx,
        storeId,
        accountId,
        body,
      );
      const updated = await updateFinanceAccount(tx, accountId, body);
      await writeUpdateAccountLog(tx, userId, storeId, oldData, updated);
    });
  }

  async deleteFinanceAccountService(
    storeId: string,
    accountId: string,
    userId: string,
  ) {
    await this.prisma.$transaction(async (tx) => {
      // 1. Validasi keberadaan, tipe sistem, sub-akun, dan histori transaksi
      const account = await validateAccountBeforeDelete(tx, storeId, accountId);

      // 2. Eksekusi Soft Delete
      await softDeleteFinanceAccount(tx, accountId);

      // 3. Catat ke Activity Log
      await writeDeleteAccountLog(tx, userId, storeId, account);
    });
  }
}
