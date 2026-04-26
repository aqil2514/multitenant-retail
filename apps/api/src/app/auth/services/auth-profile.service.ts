import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'prisma/generated/prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select: Prisma.UserSelect,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput, select });
  }

  async getUserProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, email: true, role: true, picture: true },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getUserByProviderId(providerId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { providerId } });
  }

  async createNewUser(payload: Prisma.UserCreateInput): Promise<User> {
    const newUser = this.prisma.user.upsert({
      update: {
        email: payload.email,
        picture: payload.picture,
      },
      create: payload,
      where: {
        providerId: String(payload.providerId),
      },
    });

    return newUser;
  }
}
