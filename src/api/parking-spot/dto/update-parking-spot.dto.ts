import { IsOptional, IsEnum, IsBoolean, IsString } from "class-validator";
import { AccessType } from "@prisma/client";

export class UpdateParkingSpotDto {
  @IsString()
  @IsOptional()
  spotNumber?: string;

  @IsEnum(AccessType)
  @IsOptional()
  type?: AccessType;

  @IsBoolean()
  @IsOptional()
  isOccupied?: boolean;
}
