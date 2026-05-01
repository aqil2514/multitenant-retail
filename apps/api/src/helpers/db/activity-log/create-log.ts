import { Prisma } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

export enum LogEntityList {
  STORE_USER = 'StoreUser',
  STORE_IDENTITY = 'StoreIdentity',
  PRODUCT_CATEGORY = 'ProductCategory',
  PRODUCT_UNIT = 'ProductUnit',
  PRODUCT = 'Product',
  AUTHENTICATION = 'Authentication',
}

export interface CreateLogConfig {
  prisma: PrismaService | Prisma.TransactionClient;
  action: string;
  entity: LogEntityList; // "Product", "Category", etc.
  entityId: string; // ID objek yang dimanipulasi
  storeId: string | null;
  userId: string;
  details?: any;
}

export async function createLog(config: CreateLogConfig) {
  const { action, entity, entityId, prisma, storeId, userId, details } = config;
  await prisma.activityLog.create({
    data: {
      action,
      entity,
      entityId,
      storeId,
      userId,
      details,
    },
  });
}
