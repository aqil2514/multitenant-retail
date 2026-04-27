import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class StoreGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const slug = req.params.slug;
    const userId = req.user.sub;

    const store = await this.prisma.store.findUnique({
      where: {
        slug,
      },
      select: {
        id: true,
        storeUsers: true,
      },
    });

    if (!store) throw new NotFoundException('Toko tidak ditemukan');

    const selectedUser = store?.storeUsers.find(
      (user) => user.userId === userId,
    );

    if (!selectedUser) throw new ForbiddenException('Aksi dibatasi');

    req.storeId = store.id;
    req.storeRole = selectedUser.role;
    return true;
  }
}
