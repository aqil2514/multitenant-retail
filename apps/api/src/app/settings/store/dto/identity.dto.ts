import { IsOptional, IsString } from 'class-validator';

export class IdentityDto {
  @IsString()
  section: 'identity';

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
