import { IsString, IsNotEmpty, IsOptional, IsJSON } from "class-validator";
import { UUID } from "src/api/types";

export class CreateSubscriptionLogDto {
  @IsString()
  @IsNotEmpty()
  userSubscriptionId: UUID;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsJSON()
  @IsOptional()
  details?: string;
}
