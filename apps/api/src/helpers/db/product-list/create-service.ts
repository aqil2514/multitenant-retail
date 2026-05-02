import { ProductListDto } from 'src/app/products/products-list/pl.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { createLog, LogEntityList } from '../activity-log/create-log';
import { Prisma, Product } from 'prisma/generated/prisma/client';
import { formatDate } from 'src/utils/format-date';

export async function createNewProductList(
  prisma: PrismaService,
  createdById: string,
  storeId: string,
  image: Express.Multer.File,
  payload: ProductListDto,
) {
  return await prisma.product.create({
    data: {
      ...payload,
      storeId,
      image: image ? `http://localhost:3001/uploads/${image.filename}` : null,
      createdById,
    },
    include: {
      category: true,
      unit: true,
    },
  });
}

export async function writeCreateProductList(
  prisma: PrismaService,
  userId: string,
  storeId: string,
  product: Prisma.ProductGetPayload<{
    include: {
      category: true;
      unit: true;
    };
  }>,
) {
  const details = {
    'Dibuat Pada': formatDate(
      product.createdAt,
      'Senin, 29 Desember 2025, 09:21',
    ),
    'Nama Produk': product.name,
    'Tipe Produk': product.type === 'DIGITAL' ? 'Digital' : 'Fisik',
    Satuan: product.unit?.name ?? '-',
    SKU: product?.sku ?? '-',
    Kategori: product.category?.name ?? '-',
    'Harga Modal': product.baseCostPrice ? `Rp ${product.baseCostPrice}` : '-',
    'Harga Jual': `Rp ${product.baseSellingPrice}`,
    'Stok Awal': product.type === 'DIGITAL' ? '-' : product.stock,
    'Stok Minimal': product.type === 'DIGITAL' ? '-' : product.minStock,
  };

  await createLog({
    prisma,
    storeId,
    userId,
    action: 'Membuat produk baru',
    entity: LogEntityList.PRODUCT,
    entityId: product.id,
    details,
  });
}
