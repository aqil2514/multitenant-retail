import { PrismaService } from 'src/services/prisma/prisma.service';

export async function createLog(
  prisma: PrismaService,
  action: string, // "CREATE_PRODUCT", "UPDATE_CATEGORY", "LOGIN"
  entity: string, // "Product", "Category", etc.
  entityId: string, // ID objek yang dimanipulasi
  storeId: string,
  userId: string,
  details?: any,
) {
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
