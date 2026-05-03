import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsUUID,
  MinLength,
} from 'class-validator';
import { AccountCategory, NormalBalance } from 'prisma/generated/prisma/enums';

export class FinanceAccountDto {
  @IsString({ message: 'Kode akun harus berupa string' })
  @MinLength(1, { message: 'Kode akun wajib diisi' })
  code: string;

  @IsString({ message: 'Nama akun harus berupa string' })
  @MinLength(1, { message: 'Nama akun wajib diisi' })
  name: string;

  @IsEnum(AccountCategory, { message: 'Kategori akun tidak valid' })
  category: AccountCategory;

  @IsEnum(NormalBalance, { message: 'Saldo normal tidak valid' })
  normalBalance: NormalBalance;

  @IsBoolean({ message: 'Format isHeader harus boolean' })
  @IsOptional()
  isHeader?: boolean = false;

  @IsOptional()
  @IsUUID('4', { message: 'ID Induk harus berupa UUID yang valid' })
  parentId?: string | null;

  @IsBoolean({ message: 'Format isSystem harus boolean' })
  @IsOptional()
  isSystem?: boolean = false;
}
