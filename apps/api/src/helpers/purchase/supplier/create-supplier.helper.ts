import { Prisma } from 'prisma/generated/prisma/client';
import { UserJwtPayload } from 'src/@types/auth';
import { SupplierDto } from 'src/app/purchase/supplier/ps.dto';
import {
  createLog,
  LogEntityList,
} from 'src/helpers/db/activity-log/create-log';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { formatDate } from 'src/utils/format-date';

export async function generateSupplierCode(
  prisma: PrismaService,
  storeId: string,
): Promise<string> {
  const last = await prisma.supplier.findFirst({
    where: { storeId },
    orderBy: { createdAt: 'desc' },
    select: { code: true },
  });

  if (!last?.code) return 'SUP-001';

  const match = last.code.match(/(\d+)$/);
  if (!match) return 'SUP-001';

  const next = parseInt(match[1]) + 1;
  return `SUP-${String(next).padStart(3, '0')}`;
}

export async function createSupplier(
  prisma: PrismaService,
  storeId: string,
  user: UserJwtPayload,
  body: SupplierDto,
) {
  return prisma.supplier.create({
    data: {
      storeId,
      name: body.name,
      code: body.code,
      phone: body.phone,
      email: body.email,
      address: body.address,
      status: body.status,
      notes: body.notes,
      createdById: user.sub,
    },
  });
}

export async function writeCreateSupplierLog(
  prisma: PrismaService,
  userId: string,
  storeId: string,
  supplier: Prisma.SupplierGetPayload<Record<string, never>>,
) {
  const details = {
    'Dibuat Pada': formatDate(
      supplier.createdAt,
      'Senin, 29 Desember 2025, 09:21',
    ),
    'Nama Supplier': supplier.name,
    'Kode Supplier': supplier.code ?? '-',
    'Nomor Telepon': supplier.phone ?? '-',
    Email: supplier.email ?? '-',
    Alamat: supplier.address ?? '-',
    Status: supplier.status === 'ACTIVE' ? 'Aktif' : 'Tidak Aktif',
    Catatan: supplier.notes ?? '-',
  };

  await createLog({
    prisma,
    storeId,
    userId,
    action: 'Membuat supplier baru',
    entity: LogEntityList.SUPPLIER,
    entityId: supplier.id,
    details,
  });
}
