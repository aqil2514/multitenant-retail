import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: `${process.env.DATABASE_URL}`,
  }),
});

const parentId = '476c9559-727f-4939-827a-fa5dcb22a1ed';

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
