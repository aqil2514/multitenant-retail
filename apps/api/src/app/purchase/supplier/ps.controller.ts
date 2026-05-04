import { Controller, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { StoreGuard } from 'src/guards/store.guard';

@UseGuards(JwtAuthGuard, StoreGuard)
@Controller(':slug/purchase/supplier')
export class PurchaseSupplierController {}
