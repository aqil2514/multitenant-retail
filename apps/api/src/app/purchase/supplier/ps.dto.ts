import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { SupplierStatus } from 'prisma/generated/prisma/enums';

const emptyToNull = () =>
  Transform(({ value }) => (value === '' ? null : value));

export class SupplierDto {
  @IsString({ message: 'Nama supplier wajib diisi' })
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  @emptyToNull()
  code?: string | null;

  @IsString()
  @IsOptional()
  @emptyToNull()
  phone?: string | null;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsOptional()
  @emptyToNull()
  email?: string | null;

  @IsString()
  @IsOptional()
  @emptyToNull()
  address?: string | null;

  @IsEnum(SupplierStatus)
  @IsOptional()
  status: SupplierStatus = SupplierStatus.ACTIVE;

  @IsString()
  @IsOptional()
  @emptyToNull()
  notes?: string | null;
}
