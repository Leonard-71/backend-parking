import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { SubscriptionType, AccessType } from "@prisma/client";

export class CreateSubscriptionDto {
  @IsEnum(SubscriptionType)
  @IsNotEmpty()
  name: SubscriptionType;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsEnum(AccessType)
  @IsNotEmpty()
  accessType: AccessType;

  @IsNumber()
  entries: number;

  @IsNumber()
  exits: number;
}
