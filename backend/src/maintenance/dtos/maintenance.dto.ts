import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMaintenanceDto {
  @IsNotEmpty()
  @IsString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
