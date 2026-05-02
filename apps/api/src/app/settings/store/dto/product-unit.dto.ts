import { Type } from 'class-transformer';
import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class UnitDto {
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  name: string;

  @IsString()
  value: string;
}

export class ProductUnitDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  unit: UnitDto[];
}
