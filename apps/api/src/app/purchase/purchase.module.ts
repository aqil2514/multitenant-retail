import { Module } from '@nestjs/common';
import { PurchaseSupplierModule } from './supplier/ps.module';

@Module({
  imports: [PurchaseSupplierModule],
})
export class PurchaseModule {}
