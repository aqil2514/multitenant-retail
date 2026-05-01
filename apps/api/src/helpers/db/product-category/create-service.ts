import { ProductsCategoryDto } from 'src/app/products/products-category/pc.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { createLog, LogEntityList } from '../activity-log/create-log';
import { ProductCategory } from 'prisma/generated/prisma/client';
import { formatDate } from 'src/utils/format-date';

export async function createNewProductCategory(
  prisma: PrismaService,
  storeId: string,
  payload: ProductsCategoryDto,
  userId: string,
) {
  return await prisma.productCategory.create({
    data: {
      name: payload.name,
      parentId: payload.parentId,
      description: payload.description,
      storeId,
      createdById: userId,
    },
  });
}

export async function writeCreateProductCategoryLog(
  prisma: PrismaService,
  categoryId: string,
  storeId: string,
  userId: string,
  productCategory: ProductCategory,
) {
  const details = {
    'Nama Kategori': productCategory.name,
    'Deskripsi Kategori': productCategory.description,
    'Dibuat Pada': formatDate(
      productCategory.createdAt,
      'Senin, 29 Desember 2025, 09:21',
    ),
  };
  await createLog({
    action: 'Membuat kategori produk baru',
    entity: LogEntityList.PRODUCT_CATEGORY,
    entityId: categoryId,
    prisma,
    storeId,
    userId,
    details,
  });
}
