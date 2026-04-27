import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: `${process.env.DATABASE_URL}`,
  }),
});

const parentId = 'aacd8abf-a748-4e74-a065-f4075c922484';

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
