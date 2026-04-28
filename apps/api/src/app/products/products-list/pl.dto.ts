import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductListDto {
  @IsString({ message: 'Nama produk wajib diisi' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  categoryId?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsOptional()
  image?: any | null;

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
  unit: string = 'pcs';
}
