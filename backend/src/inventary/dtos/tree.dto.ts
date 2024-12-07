import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTreeDto {
  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  commonName: string;

  @IsNotEmpty()
  @IsString()
  scientificName: string;

  @IsNotEmpty()
  @IsString()
  neighborhood: string;

  @IsNotEmpty()
  @IsString()
  locality: string;

  @IsNotEmpty()
  @IsString()
  physicalDescription: string;

  @IsString()
  photo: string; // Usar siempre string

  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}

export class UpdateTreeDto extends PartialType(CreateTreeDto) {}
