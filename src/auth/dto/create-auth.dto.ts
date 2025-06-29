import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEnum(['SUPER_ADMIN', 'ADMIN', 'USER'])
  @IsOptional()
  role?: 'SUPER_ADMIN' | 'ADMIN' | 'USER';
}
