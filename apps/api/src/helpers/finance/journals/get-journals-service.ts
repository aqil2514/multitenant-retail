import { PrismaService } from 'src/services/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export async function getJournalsHelper(
  prisma: PrismaService,
  storeId: string,
) {
  return await prisma.journalEntry.findMany({
    where: {
      storeId: storeId,
      deletedAt: null,
    },
    include: {
      // Mengambil rincian item di setiap jurnal
      items: {
        include: {
          // Mengambil informasi akun (nama & kode) untuk setiap item
          account: {
            select: {
              id: true,
              code: true,
              name: true,
              category: true,
            },
          },
        },
        // Urutkan item agar debit muncul lebih dulu daripada kredit (standar audit)
        orderBy: [{ debit: 'desc' }, { id: 'asc' }],
      },
    },
    // Urutkan berdasarkan tanggal terbaru
    orderBy: {
      date: 'desc',
    },
  });
}

export async function getJournalEntryWithItems(
  tx: PrismaService,
  storeId: string,
  id: string,
) {
  const journal = await tx.journalEntry.findFirst({
    where: {
      id,
      storeId,
    },
    include: {
      items: true,
    },
  });

  if (!journal) {
    throw new NotFoundException('Data jurnal tidak ditemukan.');
  }

  // Transformasi agar sesuai dengan JournalEntryInput di frontend
  return {
    date: journal.date,
    description: journal.description,
    reference: journal.reference,
    items: journal.items.map((item) => ({
      accountId: item.accountId,
      // Konversi Decimal ke Number agar mudah diolah form
      debit: item.debit.toNumber(),
      credit: item.credit.toNumber(),
      note: item.note ?? undefined,
    })),
  };
}
