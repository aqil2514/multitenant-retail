import { Injectable } from '@nestjs/common';
import {
  getJournalEntryWithItems,
  getJournalsHelper,
} from 'src/helpers/finance/journals/get-journals-service';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { JournalEntryDto } from './fj.dto';
import {
  executeCreateJournal,
  validateJournalBeforeCreate,
  writeCreateJournalLog,
} from 'src/helpers/finance/journals/create-finance-journals';
import {
  executeUpdateJournal,
  writeUpdateJournalLog,
} from 'src/helpers/finance/journals/update-finance-journals';
import {
  executeDeleteJournal,
  writeDeleteJournalLog,
} from 'src/helpers/finance/journals/delete-finance-journals';

@Injectable()
export class FinanceJournalsService {
  constructor(private readonly prisma: PrismaService) {}

  async getJournals(storeId: string) {
    const data = await getJournalsHelper(this.prisma, storeId);
    return data;
  }

  async getJournalById(storeId: string, id: string) {
    const data = await getJournalEntryWithItems(this.prisma, storeId, id);

    return data;
  }

  async createNewJournalService(
    storeId: string,
    body: JournalEntryDto,
    userId: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Validasi kelayakan jurnal (Balance & Leaf Account)
      await validateJournalBeforeCreate(tx, storeId, body);

      // 2. Simpan ke database
      const created = await executeCreateJournal(tx, storeId, body);

      // 3. Tulis log aktivitas
      await writeCreateJournalLog(tx, userId, storeId, created);

      return created;
    });
  }

  async updateJournalService(
    storeId: string,
    id: string,
    body: JournalEntryDto,
    userId: string,
  ) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Gunakan validator yang sama dengan saat create (Reusability)
      await validateJournalBeforeCreate(tx, storeId, body);

      // 2. Eksekusi update (Delete-then-Insert)
      const updated = await executeUpdateJournal(tx, storeId, id, body);

      // 3. Tulis log
      await writeUpdateJournalLog(tx, userId, storeId, updated);

      return updated;
    });
  }

  async deleteJournalService(storeId: string, id: string, userId: string) {
    return await this.prisma.$transaction(async (tx) => {
      // 1. Eksekusi penghapusan
      const deletedData = await executeDeleteJournal(tx, storeId, id);

      // 2. Catat siapa yang menghapus dan apa yang dihapus
      await writeDeleteJournalLog(tx, userId, storeId, deletedData);

      return { success: true };
    });
  }
}
