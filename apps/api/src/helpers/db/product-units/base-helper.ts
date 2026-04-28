import { PrismaService } from 'src/services/prisma/prisma.service';

export async function getProductUnitsAsOptions(
  prisma: PrismaService,
  storeId: string,
) {
  const result = await prisma.productUnit.findMany({
    where: {
      storeId,
    },
    select: {
      name: true,
      id: true,
    },
  });

  const options = result.map((r) => ({
    label: r.name,
    value: r.id,
  }));

  return options;
}
