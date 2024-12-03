import {
  IsString,
  IsDateString,
  IsBoolean,
  IsInt,
  Min,
  IsOptional,
} from "class-validator";
import { UUID } from "src/api/types";

export class UpdateUserSubscriptionDto {
  @IsString()
  @IsOptional()
  userId?: UUID;

  @IsString()
  @IsOptional()
  subscriptionTypeId?: UUID;

  @IsInt()
  @Min(0)
  @IsOptional()
  remainingEntries?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  remainingExits?: number;

  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
