import { Module } from '@nestjs/common';
import { ProductCategoryModule } from './products-category/pc.module';
import { ProductListModule } from './products-list/pl.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ProductCategoryModule,
    ProductListModule,
    RouterModule.register([
      {
        path: ':slug/products',
        children: [
          {
            path: 'category',
            module: ProductCategoryModule,
          },
          {
            path: 'list',
            module: ProductListModule,
          },
        ],
      },
    ]),
  ],
})
export class ProductModule {}
