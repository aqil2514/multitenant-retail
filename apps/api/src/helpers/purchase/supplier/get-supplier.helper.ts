import { PrismaService } from 'src/services/prisma/prisma.service';
import { PurchaseSupplierFilterDto } from 'src/app/purchase/supplier/ps.dto';
import { applyTextFilter, applySelectFilter } from 'src/common/filters';
import { Prisma } from 'prisma/generated/prisma/client';

export async function getSuppliersHelper(
  prisma: PrismaService,
  storeId: string,
  query: PurchaseSupplierFilterDto,
) {
  const where = {
    storeId,
    deletedAt: null,
    ...(query.name && applyTextFilter('name', query.name)),
    ...(query.code && applyTextFilter('code', query.code)),
    ...(query.status && applySelectFilter('status', query.status)),
  };

  return prisma.supplier.findMany({
    where,
    orderBy: { name: 'asc' },
  });
}

export async function getSupplierByIdHelper(
  prisma: Prisma.TransactionClient,
  storeId: string,
  supplierId: string,
) {
  return prisma.supplier.findFirst({
    where: {
      id: supplierId,
      storeId,
      deletedAt: null,
    },
  });
}
