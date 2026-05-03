import { BadRequestException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { FinanceAccountDto } from 'src/app/finance/accounts/fa.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';

export async function validateAccountBeforeCreate(
  tx: Prisma.TransactionClient,
  storeId: string,
  code: string,
  parentId?: string | null,
) {
  // 1. Cek duplikasi kode dalam satu tenant
  const existing = await tx.account.findFirst({
    where: { storeId, code, deletedAt: null },
  });

  if (existing) {
    throw new BadRequestException(
      `Kode akun "${code}" sudah digunakan di toko ini.`,
    );
  }

  // 2. Cek validitas induk jika parentId disediakan
  if (parentId) {
    const parent = await tx.account.findFirst({
      where: { id: parentId, storeId, deletedAt: null },
    });

    if (!parent) {
      throw new BadRequestException('Akun induk tidak ditemukan.');
    }

    if (!parent.isHeader) {
      throw new BadRequestException(
        'Hanya akun dengan tipe "Header" yang dapat dijadikan sebagai induk.',
      );
    }
  }
}

export async function createNewFinanceAccount(
  tx: Prisma.TransactionClient,
  storeId: string,
  payload: FinanceAccountDto,
) {
  // 1. Cek apakah ada akun dengan kode yang sama yang pernah di-soft-delete
  const existingDeletedAccount = await tx.account.findFirst({
    where: {
      storeId,
      code: payload.code,
      deletedAt: { not: null },
    },
  });

  if (existingDeletedAccount) {
    // 2. Jika ada, lakukan update (restore) alih-alih create
    return await tx.account.update({
      where: { id: existingDeletedAccount.id },
      data: {
        ...payload,
        deletedAt: null, // Reset status hapus
        isSystem: false,
      },
      include: { parent: true },
    });
  }

  // 3. Jika benar-benar baru, jalankan create seperti biasa
  return await tx.account.create({
    data: {
      ...payload,
      storeId,
      isSystem: false,
    },
    include: { parent: true },
  });
}

export async function writeCreateAccountLog(
  tx: Prisma.TransactionClient,
  userId: string,
  storeId: string,
  account: Prisma.AccountGetPayload<{ include: { parent: true } }>,
) {
  const details = {
    'Kode Akun': account.code,
    'Nama Akun': account.name,
    Kategori: account.category,
    'Saldo Normal': account.normalBalance,
    'Tipe Akun': account.isHeader ? 'Header (Grup)' : 'Detail (Posting)',
    'Akun Induk': account.parent?.name ?? '-',
    Status: 'Dibuat secara manual',
  };

  await createLog({
    prisma: tx,
    storeId,
    userId,
    action: 'Membuat akun keuangan baru',
    entity: LogEntityList.ACCOUNT,
    entityId: account.id,
    details,
  });
}
