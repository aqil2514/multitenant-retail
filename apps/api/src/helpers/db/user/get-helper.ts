import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getUserById(prisma: PrismaService, id: string) {
  return await prisma.user.findFirst({ where: { id } });
}
