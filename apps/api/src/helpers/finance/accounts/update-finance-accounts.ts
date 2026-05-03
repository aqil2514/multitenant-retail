import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { FinanceAccountDto } from 'src/app/finance/accounts/fa.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function validateAccountBeforeUpdate(
  tx: Prisma.TransactionClient,
  storeId: string,
  accountId: string,
  payload: Partial<FinanceAccountDto>,
) {
  // 1. Cek keberadaan akun
  const account = await tx.account.findFirst({
    where: { id: accountId, storeId, deletedAt: null },
  });

  if (!account) {
    throw new NotFoundException('Akun tidak ditemukan.');
  }

  // 2. Cegah modifikasi akun sistem (opsional, tergantung kebijakan bisnis)
  if (account.isSystem) {
    throw new BadRequestException('Akun sistem tidak dapat diubah.');
  }

  // 3. Cek duplikasi kode jika kode diubah
  if (payload.code && payload.code !== account.code) {
    const duplicate = await tx.account.findFirst({
      where: { storeId, code: payload.code, deletedAt: null },
    });
    if (duplicate) {
      throw new BadRequestException(
        `Kode akun "${payload.code}" sudah digunakan.`,
      );
    }
  }

  // 4. Validasi Parent jika parentId diubah
  if (payload.parentId) {
    if (payload.parentId === accountId) {
      throw new BadRequestException(
        'Akun tidak dapat menjadi induk bagi dirinya sendiri.',
      );
    }
    const parent = await tx.account.findFirst({
      where: { id: payload.parentId, storeId, deletedAt: null },
    });
    if (!parent?.isHeader) {
      throw new BadRequestException('Induk harus berupa akun tipe "Header".');
    }
  }

  return account;
}

export async function updateFinanceAccount(
  tx: Prisma.TransactionClient,
  accountId: string,
  payload: FinanceAccountDto,
) {
  return await tx.account.update({
    where: { id: accountId },
    data: payload,
    include: { parent: true },
  });
}

export async function writeUpdateAccountLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  oldAccount: any,
  newAccount: Prisma.AccountGetPayload<{ include: { parent: true } }>,
) {
  const details = {
    'Perubahan Nama': `${oldAccount.name} → ${newAccount.name}`,
    'Perubahan Kode': `${oldAccount.code} → ${newAccount.code}`,
    'Tipe Akun': newAccount.isHeader ? 'Header (Grup)' : 'Detail (Posting)',
    'Induk Baru': newAccount.parent?.name ?? '-',
    'Waktu Update': new Date().toISOString(),
  };

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Memperbarui akun keuangan',
    entity: LogEntityList.ACCOUNT,
    entityId: newAccount.id,
    details,
  });
}
