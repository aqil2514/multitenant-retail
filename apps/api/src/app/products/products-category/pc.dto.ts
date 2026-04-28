import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsUUID, MinLength } from 'class-validator';

export class ProductsCategoryDto {
  @IsString()
  @MinLength(1, { message: 'Nama kategori wajib diisi' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @Transform(({ obj }) => {
    const parentId: string = obj.parentId;

    if (parentId === 'no-parent') return null;

    return parentId;
  })
  @IsOptional()
  parentId?: string;
}
