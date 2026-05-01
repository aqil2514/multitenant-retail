import { IsString } from 'class-validator';

export class ProductUnitDto {
  @IsString()
  section: 'product-unit';

  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  value: string;
}
