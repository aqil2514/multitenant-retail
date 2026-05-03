import { NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function executeDeleteJournal(
  tx: Prisma.TransactionClient,
  storeId: string,
  id: string,
) {
  // 1. Pastikan jurnal ada
  const existing = await tx.journalEntry.findFirst({
    where: { id, storeId, deletedAt: null },
    include: { items: { include: { account: true } } },
  });

  if (!existing) {
    throw new NotFoundException('Data jurnal tidak ditemukan.');
  }

  // 2. Lakukan Soft Delete pada Header
  await tx.journalEntry.update({
    where: { id },
    data: { deletedAt: new Date().toISOString() },
  });

  // 3. Lakukan Soft Delete pada Items
  await tx.journalItem.updateMany({
    where: { journalEntryId: id },
    data: { deletedAt: new Date() },
  });

  return existing; // Kembalikan data lama untuk kebutuhan logging
}

export async function writeDeleteJournalLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  journal: Prisma.JournalEntryGetPayload<{
    include: { items: { include: { account: true } } };
  }>,
) {
  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Menghapus (Void) Jurnal Umum',
    entity: LogEntityList.JOURNAL_ENTRY,
    entityId: journal.id,
    details: {
      Tanggal: journal.date.toISOString().split('T')[0],
      Referensi: journal.reference ?? '-',
      Keterangan: journal.description,
      Pesan: 'Jurnal ini telah di-void/soft-delete dari sistem.',
    },
  });
}
