import { Module } from '@nestjs/common';
import { ProductListController } from './pl.controller';
import { ProductListService } from './pl.service';

@Module({
  controllers: [ProductListController],
  providers: [ProductListService],
})
export class ProductListModule {}
