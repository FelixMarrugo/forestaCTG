import { IsString, IsNotEmpty, IsDate, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMaintenanceDto {
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  locality: string;

  @IsNotEmpty()
  @IsString()
  Description: string;

  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}

export class UpdateMaintenanceDto extends PartialType(CreateMaintenanceDto) {}
