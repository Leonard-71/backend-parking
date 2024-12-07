import { IsString } from "class-validator"; 
import { UUID } from "src/api/types";

export class VerifyUserSubscriptionDto{
    @IsString()
    userId: UUID;
  
    @IsString()
    subscriptionTypeId: UUID;
}