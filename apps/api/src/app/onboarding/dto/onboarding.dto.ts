import { IsOptional, IsString, Matches } from 'class-validator';

export class OnBoardingDto {
  @IsString()
  name: string;

  @Matches(/^(\+62|62|0)8[1-9][0-9]{7,11}$/, {
    message: 'Nomor telepon harus format Indonesia yang valid',
  })
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;
}
