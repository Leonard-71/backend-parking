import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { UpdateUserDto } from "../dto/update-user.dto";
import { omit } from "lodash";
import { validate as isUUID } from "uuid";
import { UUID } from "../../types";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => omit(user, ["password"]));
  }

  async findOne(id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "User ID is invalid. Must be a valid UUID.",
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }

    return omit(user, ["password"]);
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "User ID is invalid. Must be a valid UUID.",
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} was not found.`);
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return { success: true, message: "User was successfully deleted." };
  }
}
