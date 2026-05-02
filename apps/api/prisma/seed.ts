import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/prisma/client';
import { SYSTEM_USER_ID } from 'src/constants/common';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.upsert({
    create: {
      email: 'system@mulitenant-retail.com',
      name: 'System',
      id: SYSTEM_USER_ID,
      role: 'ADMIN',
    },
    update: {},
    where: {
      id: SYSTEM_USER_ID,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
