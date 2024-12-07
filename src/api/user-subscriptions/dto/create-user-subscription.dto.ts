import { IsString } from "class-validator";
import { UUID } from "src/api/types";

export class CreateUserSubscriptionDto {
  @IsString()
  userId: UUID;

  @IsString()
  subscriptionTypeId: UUID;
}
