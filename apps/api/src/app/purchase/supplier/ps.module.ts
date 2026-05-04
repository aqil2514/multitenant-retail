import { Module } from '@nestjs/common';
import { PurchaseSupplierController } from './ps.controller';
import { PurchaseSupplierService } from './ps.service';

@Module({
  controllers: [PurchaseSupplierController],
  providers: [PurchaseSupplierService],
})
export class PurchaseSupplierModule {}
