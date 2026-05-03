import { BadRequestException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/client';
import { Prisma } from 'prisma/generated/prisma/client';
import { JournalEntryDto } from 'src/app/finance/journals/fj.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';
import { formatDate } from 'src/utils/format-date';

/**
 * Validasi aturan akuntansi sebelum jurnal disimpan
 */
export async function validateJournalBeforeCreate(
  tx: Prisma.TransactionClient,
  storeId: string,
  payload: JournalEntryDto,
) {
  const { items } = payload;

  // 1. Validasi Keseimbangan (Double-Entry)
  const totalDebit = items.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = items.reduce((sum, item) => sum + item.credit, 0);

  if (Math.abs(totalDebit - totalCredit) > 0.01) {
    throw new BadRequestException(
      `Jurnal tidak seimbang. Total Debit: ${totalDebit}, Total Kredit: ${totalCredit}`,
    );
  }

  // 2. Validasi Akun: Pastikan akun ada dan bukan tipe "Header"
  const accountIds = [...new Set(items.map((i) => i.accountId))];
  const accounts = await tx.account.findMany({
    where: {
      id: { in: accountIds },
      storeId,
      deletedAt: null,
    },
    select: { id: true, name: true, isHeader: true },
  });

  if (accounts.length !== accountIds.length) {
    throw new BadRequestException('Satu atau lebih akun tidak ditemukan.');
  }

  const headerAccount = accounts.find((a) => a.isHeader);
  if (headerAccount) {
    throw new BadRequestException(
      `Akun "${headerAccount.name}" adalah tipe Header dan tidak boleh digunakan untuk transaksi.`,
    );
  }
}

/**
 * Eksekusi penyimpanan Jurnal Entry dan Items
 */
export async function executeCreateJournal(
  tx: Prisma.TransactionClient,
  storeId: string,
  payload: JournalEntryDto,
) {
  const { items, ...header } = payload;

  return await tx.journalEntry.create({
    data: {
      storeId,
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

/**
 * Pencatatan Log Aktivitas Jurnal
 */
export async function writeCreateJournalLog(
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

  const details = {
    Tanggal: formatDate(journal.createdAt, 'Senin, 29 Desember 2025, 09:21'),
    Referensi: journal.reference ?? '-',
    Keterangan: journal.description,
    'Total Transaksi': totalAmount,
    'Jumlah Baris': journal.items.length,
    'Rincian Akun': journal.items
      .map((i) => `${i.account.name} (${i.debit.gt(0) ? 'D' : 'K'})`)
      .join(', '),
  };

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Mencatat Jurnal Umum baru',
    entity: LogEntityList.JOURNAL_ENTRY, // Pastikan entitas ini ada di Enum LogEntityList
    entityId: journal.id,
    details,
  });
}
