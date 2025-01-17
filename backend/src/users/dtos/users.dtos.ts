import { IsString, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {}
