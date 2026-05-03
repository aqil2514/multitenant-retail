import { Logger } from '@nestjs/common';
import { AccountCategory, NormalBalance } from 'prisma/generated/prisma/enums';
import { AccountCreateManyInput } from 'prisma/generated/prisma/models';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { createLog, LogEntityList } from '../db/activity-log/create-log';
import { SYSTEM_USER_ID } from 'src/constants/common';

const getInitData = (storeId: string): AccountCreateManyInput[] => {
  return [
    // --- ASSETS (1000) ---
    {
      storeId,
      code: '101',
      name: 'Kas Utama',
      category: AccountCategory.ASSET,
      normalBalance: NormalBalance.DEBIT,
      isSystem: true,
      isHeader: false,
    },
    {
      storeId,
      code: '102',
      name: 'Bank',
      category: AccountCategory.ASSET,
      normalBalance: NormalBalance.DEBIT,
      isSystem: false,
      isHeader: false,
    },
    {
      storeId,
      code: '103',
      name: 'Persediaan Barang',
      category: AccountCategory.ASSET,
      normalBalance: NormalBalance.DEBIT,
      isSystem: true,
      isHeader: false,
    },
    {
      storeId,
      code: '104',
      name: 'Piutang Dagang',
      category: AccountCategory.ASSET,
      normalBalance: NormalBalance.DEBIT,
      isSystem: false,
      isHeader: false,
    },

    // --- LIABILITIES (2000) ---
    {
      storeId,
      code: '201',
      name: 'Hutang Dagang',
      category: AccountCategory.LIABILITY,
      normalBalance: NormalBalance.CREDIT,
      isSystem: false,
      isHeader: false,
    },

    // --- EQUITY (3000) ---
    {
      storeId,
      code: '301',
      name: 'Modal Pemilik',
      category: AccountCategory.EQUITY,
      normalBalance: NormalBalance.CREDIT,
      isSystem: false,
      isHeader: false,
    },
    {
      storeId,
      code: '302',
      name: 'Laba Ditahan',
      category: AccountCategory.EQUITY,
      normalBalance: NormalBalance.CREDIT,
      isSystem: true,
      isHeader: false,
    },

    // --- REVENUE (4000) ---
    {
      storeId,
      code: '401',
      name: 'Penjualan Retail',
      category: AccountCategory.REVENUE,
      normalBalance: NormalBalance.CREDIT,
      isSystem: true,
      isHeader: false,
    },

    // --- EXPENSES (5000) ---
    {
      storeId,
      code: '501',
      name: 'HPP (Harga Pokok Penjualan)',
      category: AccountCategory.EXPENSE,
      normalBalance: NormalBalance.DEBIT,
      isSystem: true,
      isHeader: false,
    },
    {
      storeId,
      code: '502',
      name: 'Beban Selisih Kas',
      category: AccountCategory.EXPENSE,
      normalBalance: NormalBalance.DEBIT,
      isSystem: true, // Digunakan otomatis oleh fitur Cash Opname Anda
      isHeader: false,
    },
    {
      storeId,
      code: '503',
      name: 'Beban Operasional',
      category: AccountCategory.EXPENSE,
      normalBalance: NormalBalance.DEBIT,
      isSystem: false,
      isHeader: false,
    },
  ];
};

export async function createAccountInit(
  prisma: PrismaService,
  storeId: string,
  userId: string, // Tambahkan userId untuk pencatatan log
  logger: Logger,
) {
  const context = 'AccountSeeding';

  try {
    const data = getInitData(storeId);

    // Gunakan transaksi agar pembuatan akun dan log bersifat atomic
    await prisma.$transaction(async (tx) => {
      // 1. Proses Seeding Akun
      const result = await tx.account.createMany({
        data,
        skipDuplicates: true,
      });

      // 2. Pencatatan ke Activity Log
      await createLog({
        prisma: tx,
        action: 'Inisialisasi Akun Standar',
        entity: LogEntityList.ACCOUNT,
        entityId: storeId, // Menggunakan storeId sebagai ID entitas karena ini setup awal toko
        storeId,
        userId: SYSTEM_USER_ID,
        details: {
          Pesan: `Berhasil menginisialisasi ${result.count} akun default untuk toko.`,
          'Daftar Akun': data.map((a) => `${a.code} - ${a.name}`),
        },
      });

      logger.log(
        `Successfully initialized ${result.count} accounts for store: ${storeId}`,
        context,
      );
    });
  } catch (error) {
    if (error instanceof Error)
      logger.error(
        `Failed to initialize accounts for store: ${storeId}. Error: ${error.message}`,
        error.stack,
        context,
      );
    throw error;
  }
}
