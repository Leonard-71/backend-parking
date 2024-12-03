import {
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsString,
} from "class-validator";
import { AccessType } from "@prisma/client";
import { Transform } from "class-transformer";

export class CreateParkingSpotDto {
  @IsString()
  @IsNotEmpty()
  spotNumber: string;

  @IsEnum(AccessType)
  @IsNotEmpty()
  type: AccessType;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => (value !== undefined ? value : false))
  isOccupied?: boolean;
}
