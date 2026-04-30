import { Request } from 'express';
import { randomUUID } from 'node:crypto';
import { User } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UAParser } from 'ua-parser-js';

export async function generateRefreshTokenPayload(
  prisma: PrismaService,
  user: User,
  req: Request,
  REFRESH_TOKEN_EXPIRES: number,
) {
  const userAgent = req.headers['user-agent'];
  const parser = new UAParser(`${userAgent}`);
  const result = parser.getResult();

  const device = `${result.browser.name} on ${result.os.name} ${result.os.version}`;

  const forwarded = req.headers['x-forwarded-for'];

  const ipAddress =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded) ||
    req.ip ||
    req.socket.remoteAddress ||
    null;

  const jti = randomUUID();

  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_EXPIRES * 1000);
  return await prisma.session.create({
    data: {
      expiresAt,
      jti,
      userId: user.id,
      lastUsedAt: new Date(),
      device,
      ipAddress,
    },
  });
}
