import { NotFoundException } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

export async function checkStoreSlug(prisma: PrismaService, slug?: string) {
  if (!slug) throw new NotFoundException('Slug tidak ditemukan');
  const data = await prisma.store.findUnique({
    where: {
      slug,
    },
  });

  return !!data;
}

export async function getStoreById(prisma: PrismaService, storeId: string) {
  return await prisma.store.findFirstOrThrow({
    where: {
      id: storeId,
    },
  });
}
