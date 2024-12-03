import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { UUID } from "src/api/types";

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsString()
  @IsOptional()
  brand?: string;

  @IsString()
  @IsOptional()
  model?: string;

  @IsInt()
  @IsNotEmpty()
  userId: UUID;
}
