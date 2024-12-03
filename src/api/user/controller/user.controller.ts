import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  InternalServerErrorException,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { AuthGuard } from "@nestjs/passport";
import { UUID } from "crypto";
import { validate as isUUID } from "uuid";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return { users };
  }

  @UseGuards(AuthGuard("jwt"))
  @Get(":id")
  async findOne(@Param("id") id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "User ID is invalid. Must be a valid UUID.",
      );
    }

    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException("User was not found.");
    }

    return { user };
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch(":id")
  async update(@Param("id") id: UUID, @Body() updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "User ID is invalid. Must be a valid UUID.",
      );
    }

    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Error updating user:", error);
      throw new InternalServerErrorException(
        "An error occurred while updating the user.",
      );
    }
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(":id")
  async remove(@Param("id") id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "User ID is invalid. Must be a valid UUID.",
      );
    }

    await this.userService.remove(id);

    return { success: true, message: "User was successfully deleted." };
  }
}
