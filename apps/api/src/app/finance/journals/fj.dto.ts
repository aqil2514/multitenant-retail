import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class JournalItemDto {
  @IsUUID('4', { message: 'ID Akun tidak valid' })
  @IsNotEmpty({ message: 'Akun wajib dipilih' })
  accountId: string;

  @IsNumber({}, { message: 'Debit harus berupa angka' })
  @Min(0, { message: 'Debit tidak boleh negatif' })
  @Type(() => Number)
  debit: number;

  @IsNumber({}, { message: 'Kredit harus berupa angka' })
  @Min(0, { message: 'Kredit tidak boleh negatif' })
  @Type(() => Number)
  credit: number;

  @IsString()
  @IsOptional()
  note?: string;
}

export class JournalEntryDto {
  @IsDateString({}, { message: 'Format tanggal tidak valid' })
  @IsNotEmpty({ message: 'Tanggal wajib diisi' })
  date: string;

  @IsString({ message: 'Deskripsi harus berupa teks' })
  @IsNotEmpty({ message: 'Deskripsi wajib diisi' })
  description: string;

  @IsString()
  @IsOptional()
  reference?: string;

  @IsArray({ message: 'Item jurnal harus berupa daftar' })
  @ValidateNested({ each: true })
  @Type(() => JournalItemDto)
  items: JournalItemDto[];
}
