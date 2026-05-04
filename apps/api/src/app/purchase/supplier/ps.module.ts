import { Module } from '@nestjs/common';
import { PurchaseSupplierController } from './ps.controller';

@Module({
  controllers: [PurchaseSupplierController],
})
export class PurchaseSupplierModule {}
