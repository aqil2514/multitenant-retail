import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class AuthStoreService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserStores(userId: string) {
    return await this.prisma.store.findMany({
      where: {
        ownerId: userId,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }
}
