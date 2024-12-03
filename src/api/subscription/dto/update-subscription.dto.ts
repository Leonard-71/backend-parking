import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { SubscriptionType, AccessType } from "@prisma/client";

export class UpdateSubscriptionDto {
  @IsEnum(SubscriptionType)
  @IsOptional()
  name?: SubscriptionType;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  price?: number;

  @IsEnum(AccessType)
  @IsOptional()
  accessType?: AccessType;

  @IsNumber()
  @IsOptional()
  entries?: number;

  @IsNumber()
  @IsOptional()
  exits?: number;
}
