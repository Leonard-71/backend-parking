import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateCarDto } from "../dto/create-car.dto";
import { UpdateCarDto } from "../dto/update-car.dto";
import { UUID } from "src/api/types";

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll() {
    return this.prisma.car.findMany();
  }

  async findOne(id: UUID) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: { User: true }
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }

    return car;
  }

  async create(createCarDto: CreateCarDto) {
    return this.prisma.car.create({
      data: { ...createCarDto },
    });
  }

  async update(id: UUID, updateCarDto: UpdateCarDto) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }

    return this.prisma.car.update({
      where: { id },
      data: updateCarDto,
    });
  }

  async remove(id: UUID) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }

    return this.prisma.car.delete({
      where: { id },
    });
  }
}
