import { IsString, IsDateString, IsBoolean, IsInt, Min } from "class-validator";
import { UUID } from "src/api/types";

export class CreateUserSubscriptionDto {
  @IsString()
  userId: UUID;

  @IsString()
  subscriptionTypeId: UUID;

  @IsInt()
  @Min(0)
  remainingEntries: number;

  @IsInt()
  @Min(0)
  remainingExits: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsBoolean()
  isActive: boolean;
}
