import { Injectable } from '@nestjs/common';
import { UserJwtPayload } from 'src/@types/auth';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SupplierDto } from './ps.dto';
import {
  createSupplier,
  generateSupplierCode,
  writeCreateSupplierLog,
} from 'src/helpers/purchase/supplier/create-service';

@Injectable()
export class PurchaseSupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async createPurchaseSupplierService(
    storeId: string,
    user: UserJwtPayload,
    body: SupplierDto,
  ) {
    if (!body.code) {
      body.code = await generateSupplierCode(this.prisma, storeId);
    }

    const created = await createSupplier(this.prisma, storeId, user, body);
    await writeCreateSupplierLog(this.prisma, user.sub, storeId, created);
  }
}
