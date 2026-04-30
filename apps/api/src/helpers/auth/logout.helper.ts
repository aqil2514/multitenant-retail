import { UserJwtPayload } from 'src/@types/auth';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { getUserStore } from '../db/user-store/get-helper';
import { createLog } from '../db/activity-log/create-log';
import { getUserById } from '../db/user/get-helper';
import { formatToTime } from 'src/utils/format-to-time';

async function getSessionDuration(prisma: PrismaService) {
  const activityLogin = await prisma.activityLog.findFirst({
    where: {
      OR: [{ action: 'Login' }, { action: 'Pendaftaran' }],
    },
    select: { createdAt: true },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!activityLogin) return 'N/A';

  const currentTime = new Date();
  const loginTime = activityLogin.createdAt;

  const totalSeconds = Math.floor(
    (currentTime.getTime() - loginTime.getTime()) / 1000,
  );

  return formatToTime(totalSeconds, 'seconds');
}

export async function createLogoutLog(
  prisma: PrismaService,
  user: UserJwtPayload,
  isFromOnBoarding: boolean,
) {
  const store = await getUserStore(prisma, user.sub);
  const storeId = store && store.length > 0 ? store[0].storeId : null;
  const userInfo = await getUserById(prisma, user.sub);
  const duration = await getSessionDuration(prisma);

  const details = isFromOnBoarding
    ? {
        Email: user.email,
        'Nama Pengguna': userInfo?.name ?? 'User Tidak Diketahui',
        'Status Sesi': 'Keluar saat Onboarding',
        'Waktu Keluar': new Date().toLocaleString('id-ID'),
      }
    : {
        Email: user.email,
        'Nama Pengguna': userInfo?.name ?? 'User Tidak Diketahui',
        'Status Sesi': 'Selesai (Logout)',
        'Durasi Sesi': duration,
        'Waktu Logout': `${new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
        })} (Waktu Indonesia Barat)`,
      };

  await createLog(
    prisma,
    'Logout',
    'Authentication',
    'LOGOUT',
    storeId,
    user.sub,
    details,
  );
}

export async function createLogoutSessionExpired(
  prisma: PrismaService,
  user: UserJwtPayload,
) {
  const store = await getUserStore(prisma, user.sub);
  const storeId = store && store.length > 0 ? store[0].storeId : null;
  const userInfo = await getUserById(prisma, user.sub);
  const duration = await getSessionDuration(prisma);

  const details = {
    Email: user.email,
    'Nama Pengguna': userInfo?.name ?? 'User Tidak Diketahui',
    'Status Sesi': 'Sesi BErakhir',
    'Durasi Sesi': duration,
    'Waktu Logout': `${new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
    })} (Waktu Indonesia Barat)`,
  };

  await createLog(
    prisma,
    'Logout (Sesi Habis)',
    'Authentication',
    'SESSION_EXPIRED',
    storeId,
    user.sub,
    details,
  );
}
