import { IsString, IsBoolean, IsOptional, IsDateString } from "class-validator";
import { UUID } from "src/api/types";

export class CreateParkingSessionDto {
  @IsString()
  userId: UUID;

  @IsString()
  carId: UUID;

  @IsString()
  parkingSpotId: UUID;

  @IsString()
  userSubscriptionId: UUID;

  @IsDateString()
  entryTime: Date;

  @IsDateString()
  @IsOptional()
  exitTime?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}
