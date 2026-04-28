import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: `${process.env.DATABASE_URL}`,
  }),
});

// npx tsx scripts/delete-data.ts
async function main() {
  const stores = await prisma.store.findMany({
    select: { id: true, name: true },
  });

  console.log('Stores:', stores);

  if (stores.length === 0) {
    console.log('Tidak ada store');
    return;
  }

  const storeId = stores[0].id; // ambil store pertama, atau sesuaikan

  await prisma.product.deleteMany({ where: { storeId } });
  await prisma.productCategory.deleteMany({ where: { storeId } });
  await prisma.productUnit.deleteMany({ where: { storeId } });
  await prisma.storeUser.deleteMany({ where: { storeId } });
  await prisma.store.delete({ where: { id: storeId } });

  console.log('Done');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
