import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateParkingSpotDto } from "../dto/create-parking-spot.dto";
import { UpdateParkingSpotDto } from "../dto/update-parking-spot.dto";
import { UUID } from "src/api/types";

@Injectable()
export class ParkingSpotService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParkingSpotDto: CreateParkingSpotDto) {
    return this.prisma.parkingSpot.create({
      data: createParkingSpotDto,
    });
  }

  async findAll() {
    return this.prisma.parkingSpot.findMany();
  }

  async findOne(id: UUID) {
    const parkingSpot = await this.prisma.parkingSpot.findUnique({
      where: { id },
    });

    if (!parkingSpot) {
      throw new NotFoundException(`Parking spot with ID ${id} not found.`);
    }

    return parkingSpot;
  }

  async update(id: UUID, updateParkingSpotDto: UpdateParkingSpotDto) {
    const parkingSpot = await this.prisma.parkingSpot.findUnique({
      where: { id },
    });

    if (!parkingSpot) {
      throw new NotFoundException(`Parking spot with ID ${id} not found.`);
    }

    return this.prisma.parkingSpot.update({
      where: { id },
      data: updateParkingSpotDto,
    });
  }

  async remove(id: UUID) {
    const parkingSpot = await this.prisma.parkingSpot.findUnique({
      where: { id },
    });

    if (!parkingSpot) {
      throw new NotFoundException(`Parking spot with ID ${id} not found.`);
    }

    return this.prisma.parkingSpot.delete({
      where: { id },
    });
  }
}
