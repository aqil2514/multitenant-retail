import { Injectable } from '@nestjs/common';
import { UserJwtPayload } from 'src/@types/auth';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SupplierDto, PurchaseSupplierFilterDto } from './ps.dto';
import {
  createSupplier,
  generateSupplierCode,
  writeCreateSupplierLog,
} from 'src/helpers/purchase/supplier/create-supplier.helper';
import {
  getSupplierByIdHelper,
  getSuppliersHelper,
} from 'src/helpers/purchase/supplier/get-supplier.helper';
import {
  updateSupplier,
  validateSupplierBeforeUpdate,
  writeUpdateSupplierLog,
} from 'src/helpers/purchase/supplier/update-supplier.helper';
import {
  softDeleteSupplier,
  validateSupplierBeforeDelete,
  writeDeleteSupplierLog,
} from 'src/helpers/purchase/supplier/delete-supplier.helper';

@Injectable()
export class PurchaseSupplierService {
  constructor(private readonly prisma: PrismaService) {}

  async getSupplier(storeId: string, query: PurchaseSupplierFilterDto) {
    return getSuppliersHelper(this.prisma, storeId, query);
  }

  async getSupplierById(storeId: string, supplierId: string) {
    return await this.prisma.$transaction(async (tx) => {
      return await getSupplierByIdHelper(tx, storeId, supplierId);
    });
  }

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

  async updateSupplierService(
    storeId: string,
    supplierId: string,
    user: UserJwtPayload,
    body: SupplierDto,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const oldData = await validateSupplierBeforeUpdate(
        tx,
        storeId,
        supplierId,
        body,
      );
      const updated = await updateSupplier(tx, supplierId, user.sub, body);
      await writeUpdateSupplierLog(tx, user.sub, storeId, oldData, updated);
    });
  }

  async deleteSupplier(
    storeId: string,
    supplierId: string,
    user: UserJwtPayload,
  ) {
    await this.prisma.$transaction(async (tx) => {
      const supplier = await validateSupplierBeforeDelete(
        tx,
        storeId,
        supplierId,
      );
      await softDeleteSupplier(tx, supplierId);
      await writeDeleteSupplierLog(tx, user.sub, storeId, supplier);
    });
  }
}
