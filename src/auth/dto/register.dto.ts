import { IsEmail, IsString, IsEnum } from "class-validator";
import { UserRole } from "@prisma/client";

export class RegisterDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  phone: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.user;
}
