import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getUserStore(prisma: PrismaService, userId: string) {
  return prisma.storeUser.findMany({
    where: {
      userId,
    },
  });
}
