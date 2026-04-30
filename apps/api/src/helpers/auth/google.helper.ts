import { PrismaService } from 'src/services/prisma/prisma.service';
import { createLog } from '../db/activity-log/create-log';
import { User } from 'prisma/generated/prisma/client';
import { getUserStore } from '../db/user-store/get-helper';
import { GoogleProfile, UserProfile } from 'src/@types/auth';

export async function getUserByGoogleId(
  prisma: PrismaService,
  providerId: string,
) {
  return await prisma.user.findUnique({ where: { providerId } });
}

export async function createLoginGoogleLog(prisma: PrismaService, user: User) {
  const store = await getUserStore(prisma, user.id);
  const storeId = store[0] ? store[0].storeId : null;

  const details = {
    Email: user.email,
    'Nama Pengguna': user.name,
    'Metode Login': 'Google',
    'Waktu Login': `${new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
    })} (Waktu Indonesia Barat)`,
  };
  await createLog(
    prisma,
    'Login',
    'Authentication',
    'Login_By_Google',
    storeId,
    user.id,
    details,
  );
}

// New User
export async function createNewUser(
  prisma: PrismaService,
  profile: GoogleProfile,
) {
  const { id, emails, name, photos } = profile;
  const googlePayload: UserProfile = {
    provider: 'google',
    providerId: id,
    email: emails[0].value,
    name: `${name.givenName} ${name.familyName}`,
    picture: photos[0].value,
  };

  const newUser = prisma.user.upsert({
    update: {
      email: googlePayload.email,
      picture: googlePayload.picture,
    },
    create: {
      email: googlePayload.email,
      name: googlePayload.name,
      picture: googlePayload.picture,
      provider: googlePayload.provider,
      providerId: profile.sub,
    },
    where: {
      providerId: String(googlePayload.providerId),
    },
  });

  return newUser;
}

export async function createNewUserLog(prisma: PrismaService, user: User) {
  const store = await getUserStore(prisma, user.id);
  const storeId = store[0] ? store[0].storeId : null;

  const details = {
    Email: user.email,
    'Nama Lengkap': user.name,
    'Metode Pendaftaran': 'Google',
    'Status Onboarding': 'Belum Selesai',
    'ID Provider': user.providerId,
    'Waktu Terdaftar': `${new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
    })} (Waktu Indonesia Barat)`,
  };

  await createLog(
    prisma,
    'Pendaftaran',
    'Authentication',
    'REGISTER',
    storeId,
    user.id,
    details,
  );
}
