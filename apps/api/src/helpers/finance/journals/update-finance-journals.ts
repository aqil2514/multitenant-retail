import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { JournalEntryDto } from 'src/app/finance/journals/fj.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';
import { Decimal } from '@prisma/client/runtime/client';

export async function executeUpdateJournal(
  tx: Prisma.TransactionClient,
  storeId: string,
  id: string,
  payload: JournalEntryDto,
) {
  const { items, ...header } = payload;

  // 1. Cek keberadaan jurnal
  const existing = await tx.journalEntry.findFirst({
    where: { id, storeId },
  });

  if (!existing) {
    throw new NotFoundException('Jurnal tidak ditemukan.');
  }

  // 2. Hapus semua items lama (Cleanup)
  await tx.journalItem.deleteMany({
    where: { journalEntryId: id },
  });

  // 3. Update Header dan buat Items baru
  return await tx.journalEntry.update({
    where: { id },
    data: {
      date: new Date(header.date),
      description: header.description,
      reference: header.reference,
      items: {
        create: items.map((item) => ({
          accountId: item.accountId,
          debit: new Decimal(item.debit),
          credit: new Decimal(item.credit),
          note: item.note,
        })),
      },
    },
    include: {
      items: {
        include: { account: true },
      },
    },
  });
}

export async function writeUpdateJournalLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  journal: Prisma.JournalEntryGetPayload<{
    include: { items: { include: { account: true } } };
  }>,
) {
  const totalAmount = journal.items.reduce(
    (sum, item) => sum + Number(item.debit),
    0,
  );

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Memperbarui Jurnal Umum',
    entity: LogEntityList.JOURNAL_ENTRY,
    entityId: journal.id,
    details: {
      Keterangan: journal.description,
      'Total Baru': totalAmount,
      'Jumlah Baris': journal.items.length,
      Status: 'Data diperbarui melalui form edit',
    },
  });
}
