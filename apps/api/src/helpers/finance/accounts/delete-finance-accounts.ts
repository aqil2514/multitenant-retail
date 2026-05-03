import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function validateAccountBeforeDelete(
  tx: Prisma.TransactionClient,
  storeId: string,
  accountId: string,
) {
  // 1. Cek keberadaan akun
  const account = await tx.account.findFirst({
    where: { id: accountId, storeId, deletedAt: null },
  });

  if (!account) {
    throw new NotFoundException('Akun tidak ditemukan.');
  }

  // 2. Proteksi akun sistem
  if (account.isSystem) {
    throw new BadRequestException(
      'Akun sistem tidak dapat dihapus karena krusial bagi operasional otomatis.',
    );
  }

  // 3. Cek apakah memiliki sub-akun (Anak)
  const hasChildren = await tx.account.findFirst({
    where: { parentId: accountId, deletedAt: null },
  });

  if (hasChildren) {
    throw new BadRequestException(
      'Akun ini tidak dapat dihapus karena masih memiliki sub-akun. Hapus atau pindahkan sub-akun terlebih dahulu.',
    );
  }

  // 4. Cek keterkaitan dengan transaksi (JournalItem)
  // Ini penting agar tidak merusak laporan keuangan yang sudah ada
  const hasTransactions = await tx.journalItem.findFirst({
    where: { accountId },
  });

  if (hasTransactions) {
    throw new BadRequestException(
      'Akun tidak dapat dihapus karena sudah memiliki histori transaksi. Gunakan opsi non-aktifkan jika tidak ingin digunakan lagi.',
    );
  }

  return account;
}

export async function softDeleteFinanceAccount(
  tx: Prisma.TransactionClient,
  accountId: string,
) {
  return await tx.account.update({
    where: { id: accountId },
    data: { deletedAt: new Date() },
  });
}

export async function writeDeleteAccountLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  account: Prisma.AccountGetPayload<{
    select: { code: true; name: true; id: true };
  }>,
) {
  const details = {
    'Kode Akun': account.code,
    'Nama Akun': account.name,
    Status: 'Dihapus (Soft Delete)',
    'Waktu Penghapusan': new Date().toISOString(),
  };

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Menghapus akun keuangan',
    entity: LogEntityList.ACCOUNT,
    entityId: account.id,
    details,
  });
}
