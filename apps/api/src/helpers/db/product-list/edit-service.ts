import { ProductListDto } from 'src/app/products/products-list/pl.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { createLog, LogEntityList } from '../activity-log/create-log';
import { detectChanges } from 'src/utils/detect-change';
import { Prisma } from 'prisma/generated/prisma/client';
import { formatDate } from 'src/utils/format-date';

export async function editProductList(
  prisma: PrismaService,
  storeId: string,
  productId: string,
  body: ProductListDto,
  file: Express.Multer.File,
  userId: string,
) {
  const image = body.image
    ? body.image
    : file
      ? `http://localhost:3001/uploads/${file.filename}`
      : null;

  return await prisma.product.update({
    where: {
      storeId,
      id: productId,
    },
    data: {
      name: body.name,
      sku: body.sku,
      description: body.description,
      image,

      stock: body.stock,
      minStock: body.minStock,

      categoryId: body.categoryId,
      unitId: body.unit,

      updatedAt: new Date().toISOString(),
      updatedById: userId,
    },
    include: {
      unit: true,
      category: true,
    },
  });
}

export async function writeEditProductList(
  prisma: PrismaService,
  storeId: string,
  productId: string,
  userId: string,
  oldProduct: Prisma.ProductGetPayload<{
    include: {
      category: true;
      unit: true;
    };
  }>,
  newProduct: Prisma.ProductGetPayload<{
    include: {
      category: true;
      unit: true;
    };
  }>,
) {
  const { changes, hasChanges } = await detectChanges({
    after: newProduct,
    before: oldProduct,
    exclude: [
      'category',
      'createdAt',
      'createdById',
      'deletedAt',
      'id',
      'image',
      'storeId',
      'unit',
      'updatedAt',
      'updatedById',
    ],
    labels: {
      categoryId: 'Kategori',
      description: 'Deskripsi Produk',
      name: 'Nama Produk',
      minStock: 'Minimal Stok',
      stock: 'Stok',
      unitId: 'Unit Satuan',
      sku: 'SKU',
    },
    resolvers: {
      categoryId: async (value) => {
        if (!value) return 'Tidak ada kategori';
        const category = await prisma.productCategory.findFirst({
          where: { id: value as string },
          select: { name: true },
        });

        return category?.name ?? 'Tidak diketahui';
      },
      unitId: async (value) => {
        if (!value) return 'Tidak ada unit satuan';
        const unit = await prisma.productUnit.findFirst({
          where: { id: value as string },
          select: { name: true },
        });

        return unit?.name ?? 'Tidak diketahui';
      },
    },
  });

  if (!hasChanges) return;

  const details = {
    'Dibuat Pada': formatDate(new Date(), 'Senin, 29 Desember 2025, 09:21'),
    ...changes,
  };

  await createLog({
    action: 'Memperbarui data produk',
    entity: LogEntityList.PRODUCT,
    entityId: productId,
    prisma,
    storeId,
    userId,
    details,
  });
}
