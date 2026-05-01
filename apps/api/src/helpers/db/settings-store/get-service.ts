import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getProductUnits(prisma: PrismaService, storeId: string) {
  return await prisma.productUnit.findMany({
    where: { storeId },
    select: {
      id: true,
      name: true,
      value: true,
    },
  });
}

export async function getStoreIdentity(prisma: PrismaService, storeId: string) {
  return await prisma.store.findUniqueOrThrow({
    where: { id: storeId, deletedAt: null },
    select: {
      address: true,
      name: true,
      phone: true,
    },
  });
}
