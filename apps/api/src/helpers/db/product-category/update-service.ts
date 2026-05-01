import { ProductCategory } from 'prisma/generated/prisma/client';
import { ProductsCategoryDto } from 'src/app/products/products-category/pc.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { detectChanges } from 'src/utils/detect-change';
import { createLog, LogEntityList } from '../activity-log/create-log';
import { formatDate } from 'src/utils/format-date';

export async function updateProductCategoryById(
  prisma: PrismaService,
  storeId: string,
  categoryId: string,
  body: ProductsCategoryDto,
  userId: string,
) {
  return await prisma.productCategory.update({
    data: {
      updatedAt: new Date().toISOString(),
      name: body.name,
      parentId: body.parentId,
      description: body.description,
      updatedById: userId,
    },
    where: {
      storeId,
      id: categoryId,
    },
  });
}

export async function writeUpdateCategoryLog(
  prisma: PrismaService,
  categoryId: string,
  storeId: string,
  userId: string,
  oldProductCategory: ProductCategory,
  newProductCategory: ProductCategory,
) {
  const { changes, hasChanges } = await detectChanges({
    before: oldProductCategory,
    after: newProductCategory,
    exclude: [
      'id',
      'createdById',
      'createdAt',
      'deletedAt',
      'storeId',
      'updatedAt',
      'updatedById',
    ],
    labels: {
      name: 'Nama Kategori',
      description: 'Deskripsi Kategori',
      parentId: 'Kategori Induk',
    },
    resolvers: {
      parentId: async (value) => {
        if (!value) return 'Tidak ada kategori induk';
        const parent = await prisma.productCategory.findUnique({
          where: { id: value as string },
          select: { name: true },
        });
        return parent?.name ?? 'Tidak diketahui';
      },
    },
  });

  if (!hasChanges) return;

  await createLog({
    action: 'Memperbarui kategori produk',
    entity: LogEntityList.PRODUCT_CATEGORY,
    entityId: categoryId,
    prisma,
    storeId,
    userId,
    details: {
      ...changes,
      'Diubah Pada': formatDate(
        newProductCategory.updatedAt ?? new Date(),
        'Senin, 29 Desember 2025, 09:21',
      ),
    },
  });
}
