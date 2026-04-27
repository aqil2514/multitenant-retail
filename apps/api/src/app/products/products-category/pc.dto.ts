import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class ProductsCategoryDto {
  @IsString()
  @MinLength(1, { message: 'Nama kategori wajib diisi' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUUID('all', { message: 'Kategori parent tidak valid' })
  @IsOptional()
  parentId?: string;
}
