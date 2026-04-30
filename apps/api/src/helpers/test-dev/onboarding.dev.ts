import { Logger } from '@nestjs/common';
import { SYSTEM_USER_ID } from 'src/constants/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { createLog } from '../db/activity-log/create-log';

export async function createProductDevInit(
  storeId: string,
  logger: Logger,
  prisma: PrismaService,
) {
  logger.log(`[Dev] Memulai pembuatan data produk dummy untuk ${storeId}...`);

  // 1. Ambil ID Unit dan Kategori yang sudah dibuat oleh onboarding standard
  const [units, categories] = await Promise.all([
    prisma.productUnit.findMany({ where: { storeId } }),
    prisma.productCategory.findMany({ where: { storeId } }),
  ]);

  if (units.length === 0 || categories.length === 0) {
    logger.warn(
      `[Dev] Unit atau Kategori kosong. Pastikan onboarding standard dijalankan terlebih dahulu.`,
    );
    return;
  }

  // Helper untuk mencari ID berdasarkan value/name
  const getUnitId = (value: string) =>
    units.find((u) => u.value === value)?.id || units[0].id;
  const getCategoryId = (name: string) =>
    categories.find((c) => c.name === name)?.id;

  const result = await prisma.product.createMany({
    data: [
      {
        storeId,
        name: 'Indomie Goreng Original',
        sku: '8998866200225',
        description: 'Mie instan goreng favorit',
        stock: 50,
        minStock: 10,
        unitId: getUnitId('pcs'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Aqua Botol 600ml',
        sku: '8886008101053',
        description: 'Air mineral kemasan',
        stock: 100,
        minStock: 20,
        unitId: getUnitId('botol'),
        categoryId: getCategoryId('Minuman'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Beras Pandan Wangi 5kg',
        sku: 'BRS-PW-05',
        description: 'Beras kualitas super',
        stock: 15,
        minStock: 5,
        unitId: getUnitId('sak'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Susu UHT Full Cream 1L',
        sku: '8992753000100',
        description: 'Susu cair segar',
        stock: 24,
        minStock: 6,
        unitId: getUnitId('karton'),
        categoryId: getCategoryId('Minuman'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Telur Ayam Negeri',
        sku: 'TLR-001',
        description: 'Telur ayam segar per kg',
        stock: 30,
        minStock: 10,
        unitId: getUnitId('kg'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Gula Pasir 1kg',
        sku: 'GL-001',
        description: 'Gula pasir kristal putih',
        stock: 40,
        minStock: 10,
        unitId: getUnitId('kg'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Minyak Goreng 2L',
        sku: 'MNG-002',
        description: 'Minyak goreng kelapa sawit',
        stock: 8,
        minStock: 10, // Low Stock
        unitId: getUnitId('pcs'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Coca Cola 330ml',
        sku: '5449000000996',
        description: 'Minuman berkarbonasi',
        stock: 48,
        minStock: 12,
        unitId: getUnitId('kaleng'),
        categoryId: getCategoryId('Minuman'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Teh Celup Kotak 25s',
        sku: '8991002101344',
        description: 'Teh celup melati',
        stock: 30,
        minStock: 5,
        unitId: getUnitId('box'),
        categoryId: getCategoryId('Minuman'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Kopi Kapal Api 165g',
        sku: '8991102102135',
        description: 'Kopi bubuk hitam',
        stock: 2,
        minStock: 10, // Low Stock
        unitId: getUnitId('pack'),
        categoryId: getCategoryId('Minuman'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Tepung Terigu 1kg',
        sku: 'TPG-001',
        description: 'Tepung terigu protein sedang',
        stock: 20,
        minStock: 5,
        unitId: getUnitId('kg'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Sabun Batang',
        sku: 'SBN-001',
        description: 'Sabun mandi aroma floral',
        stock: 60,
        minStock: 10,
        unitId: getUnitId('batang'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Penyedap Rasa 100g',
        sku: 'PYD-001',
        description: 'Penyedap rasa ayam',
        stock: 100,
        minStock: 15,
        unitId: getUnitId('pcs'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Roti Tawar Kupas',
        sku: 'RTT-001',
        description: 'Roti tawar tanpa kulit pinggir',
        stock: 5,
        minStock: 10, // Low Stock
        unitId: getUnitId('pack'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Kecap Manis 520ml',
        sku: 'KCP-001',
        description: 'Kecap manis botol besar',
        stock: 15,
        minStock: 5,
        unitId: getUnitId('botol'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Garam Dapur 250g',
        sku: 'GRM-001',
        description: 'Garam halus beryodium',
        stock: 50,
        minStock: 10,
        unitId: getUnitId('pcs'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Biskuit Kaleng 450g',
        sku: 'BSK-001',
        description: 'Biskuit aneka rasa',
        stock: 12,
        minStock: 3,
        unitId: getUnitId('kaleng'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Margarin 200g',
        sku: 'MRG-001',
        description: 'Margarin serbaguna',
        stock: 25,
        minStock: 5,
        unitId: getUnitId('pcs'),
        categoryId: getCategoryId('Makanan'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Sabun Cuci Piring 700ml',
        sku: 'SCP-001',
        description: 'Cairan pencuci piring refill',
        stock: 40,
        minStock: 10,
        unitId: getUnitId('pcs'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
      {
        storeId,
        name: 'Shampoo Botol 170ml',
        sku: 'SHM-001',
        description: 'Shampoo anti ketombe',
        stock: 18,
        minStock: 5,
        unitId: getUnitId('botol'),
        categoryId: getCategoryId('Umum'),
        createdById: SYSTEM_USER_ID,
      },
    ],
    skipDuplicates: true,
  });

  if (result.count > 0) {
    await createLog(
      prisma,
      'Setup awal template produk', // Action
      'Product', // Entity
      'BULK_CREATE', // EntityId (karena banyak, kita beri label bulk)
      storeId,
      SYSTEM_USER_ID,
      {
        jumlah: result.count,
        pesan: 'Template awal ketika pembuatan toko selesai',
      },
    );
  }

  logger.log(`[Dev] Berhasil membuat ${result.count} data produk dummy.`);
}
