import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { UnitDto } from './product-unit.dto';

export class ReplacementItemDto {
  @IsUUID()
  productId: string;

  @IsString()
  @IsIn(['replace', 'delete'])
  action: 'replace' | 'delete';

  @ValidateIf((o) => o.action === 'replace')
  @IsUUID()
  unitId?: string;
}

export class ConflictResolutionDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReplacementItemDto)
  replacements: ReplacementItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  availableUnits: UnitDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  toUpdate: UnitDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  toCreate: UnitDto[];
}
