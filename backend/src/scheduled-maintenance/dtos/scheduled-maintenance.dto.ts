import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateScheduledMaintenanceDto {
  @IsNotEmpty()
  @IsString()
  idMaintenance: string;

  @IsNotEmpty()
  @IsString()
  idTree: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateScheduledMaintenanceDto extends PartialType(
  CreateScheduledMaintenanceDto,
) {}
