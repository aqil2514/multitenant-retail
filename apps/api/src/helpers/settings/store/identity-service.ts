import { IdentityDto } from 'src/app/settings/store/dto/identity.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';
import { Store } from 'prisma/generated/prisma/client';
import { detectChanges } from 'src/utils/detect-change';
import { formatDate } from 'src/utils/format-date';

export async function updateStoreIdentity(
  prisma: PrismaService,
  storeId: string,
  payload: IdentityDto,
) {
  return await prisma.store.update({
    where: {
      id: storeId,
    },
    data: {
      name: payload.name,
      address: payload.address,
      phone: payload.phone,
      slug: payload.slug,
    },
  });
}

export async function writeUpdateIdentityLog(
  prisma: PrismaService,
  storeId: string,
  userId: string,
  oldIdentity: Store,
  newIdentity: Store,
) {
  const { changes, hasChanges } = await detectChanges({
    after: newIdentity,
    before: oldIdentity,
    exclude: ['createdAt', 'deletedAt', 'id', 'ownerId', 'updatedAt'],
    labels: {
      name: 'Nama Toko',
      address: 'Alamat Toko',
      slug: 'Slug URL Toko',
      phone: 'Nomor Telepon Toko',
    },
  });

  if (!hasChanges) return;

  const details = {
    ...changes,
    'Tanggal Pembaruan': formatDate(
      newIdentity.updatedAt,
      'Senin, 29 Desember 2025, 09:21',
    ),
  };
  await createLog({
    prisma,
    action: 'Memperbarui identitas toko',
    entity: LogEntityList.STORE_IDENTITY,
    entityId: storeId,
    storeId,
    userId,
    details,
  });
}
