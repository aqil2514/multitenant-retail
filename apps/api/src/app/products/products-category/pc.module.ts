import { Module } from '@nestjs/common';
import { ProductCategoryController } from './pc.controller';
import { ProductCategoryService } from './pc.service';

@Module({
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
})
export class ProductCategoryModule {}
