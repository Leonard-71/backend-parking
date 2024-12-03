import { IsBoolean, IsOptional, IsDateString } from "class-validator";

export class UpdateParkingSessionDto {
  @IsDateString()
  @IsOptional()
  exitTime?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
