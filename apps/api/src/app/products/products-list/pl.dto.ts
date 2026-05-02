import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductType } from 'prisma/generated/prisma/enums';

export class ProductListDto {
  @IsString({ message: 'Nama produk wajib diisi' })
  @IsNotEmpty()
  name: string;

  @IsEnum(ProductType)
  @IsOptional()
  type: ProductType = ProductType.PHYSICAL;

  @IsString()
  @IsOptional()
  categoryId?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsOptional()
  image?: any | null;

  @IsNumber()
  @IsNotEmpty({ message: 'Harga jual wajib diisi' })
  @Type(() => Number)
  baseSellingPrice: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  baseCostPrice?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minStock: number = 0;

  @IsString()
  @IsOptional()
  sku?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  stock: number = 0;

  @IsString()
  @IsOptional()
  unitId?: string | null;
}
