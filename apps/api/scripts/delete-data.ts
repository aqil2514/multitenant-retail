import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: `${process.env.DATABASE_URL}`,
  }),
});

const parentId = 'bbe760d0-d4e9-45e7-a8f7-cc8345cead5e';

// npx tsx scripts/delete-data.ts
async function main() {
  await prisma.productCategory.deleteMany({
    where: { storeId: parentId },
  });

  await prisma.store.delete({
    where: { id: parentId },
  });

  console.log('Done');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
