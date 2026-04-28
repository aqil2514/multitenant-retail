import { Logger } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

export async function createProductCategoryInit(
  storeId: string,
  logger: Logger,
  prisma: PrismaService,
) {
  logger.log(`Membuat produk kategori untuk ${storeId}...`);
  const result = await prisma.productCategory.createMany({
    data: [
      {
        name: 'Makanan',
        storeId,
      },
      {
        name: 'Minuman',
        storeId,
      },
      {
        name: 'Umum',
        storeId,
      },
    ],
  });
  logger.log(`Berhasil membuat ${result.count} kategori`);
}

export async function createProductUnitInit(
  storeId: string,
  logger: Logger,
  prisma: PrismaService,
) {
  logger.log(`Membuat produk unit untuk ${storeId}...`);
  const result = await prisma.productUnit.createMany({
    data: [
      { storeId, name: 'Pcs', value: 'pcs' },
      { storeId, name: 'Box', value: 'box' },
      { storeId, name: 'Lusin', value: 'lusin' },
      { storeId, name: 'Gross', value: 'gross' },
      { storeId, name: 'Karton', value: 'karton' },
      { storeId, name: 'Pack', value: 'pack' },
      { storeId, name: 'Buah', value: 'buah' },
      { storeId, name: 'Lembar', value: 'lembar' },
      { storeId, name: 'Roll', value: 'roll' },
      { storeId, name: 'Batang', value: 'batang' },
      { storeId, name: 'Botol', value: 'botol' },
      { storeId, name: 'Kaleng', value: 'kaleng' },
      { storeId, name: 'Sak', value: 'sak' },
      { storeId, name: 'Kg', value: 'kg' },
      { storeId, name: 'Gram', value: 'g' },
      { storeId, name: 'Liter', value: 'l' },
      { storeId, name: 'Mililiter', value: 'ml' },
      { storeId, name: 'Meter', value: 'm' },
      { storeId, name: 'Sentimeter', value: 'cm' },
    ],
  });
  logger.log(`Berhasil membuat ${result.count} unit`);
}

export async function createStoreUserInit(
  storeId: string,
  userId: string,
  logger: Logger,
  prisma: PrismaService,
) {
  logger.log(`Membuat user untuk toko ${storeId}`);

  await prisma.storeUser.create({
    data: {
      role: 'owner',
      storeId,
      userId,
    },
  });

  logger.log(
    `User untuk toko ${storeId} berhasil dibuat dengan ${userId} sebagai ownernya`,
  );
}
