import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserJwtPayload } from 'src/@types/auth';
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
        ownerId: true,
      },
    });

    if (!store) throw new NotFoundException('Toko tidak ditemukan');
    if (store.ownerId !== userId) throw new ForbiddenException('Aksi dibatasi');

    req.storeId = store.id;
    return true;
  }
}
