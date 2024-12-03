import { IsString, IsOptional, IsJSON } from "class-validator";

export class UpdateSubscriptionLogDto {
  @IsString()
  @IsOptional()
  action?: string;

  @IsJSON()
  @IsOptional()
  details?: string;
}
