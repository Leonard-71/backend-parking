import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateParkingSessionDto } from "../dto/create-parking-sessions.dto";
import { UpdateParkingSessionDto } from "../dto/update-parking-sessions.dto";

@Injectable()
export class ParkingSessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createParkingSessionDto: CreateParkingSessionDto) {
    try {
      return await this.prisma.parkingSession.create({
        data: createParkingSessionDto,
      });
    } catch {
      throw new BadRequestException(
        "Could not create parking session. Please check your input.",
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.parkingSession.findMany();
    } catch {
      throw new BadRequestException("Could not retrieve parking sessions.");
    }
  }

  async findOne(id: string) {
    try {
      const parkingSession = await this.prisma.parkingSession.findUnique({
        where: { id },
      });

      if (!parkingSession) {
        throw new NotFoundException(
          `Parking session with ID "${id}" not found.`,
        );
      }

      return parkingSession;
    } catch {
      throw new NotFoundException(
        `Could not find parking session with ID "${id}".`,
      );
    }
  }

  async update(id: string, updateParkingSessionDto: UpdateParkingSessionDto) {
    try {
      const parkingSession = await this.prisma.parkingSession.findUnique({
        where: { id },
      });

      if (!parkingSession) {
        throw new NotFoundException(
          `Parking session with ID "${id}" not found.`,
        );
      }

      return await this.prisma.parkingSession.update({
        where: { id },
        data: updateParkingSessionDto,
      });
    } catch {
      throw new BadRequestException(
        `Could not update parking session with ID "${id}".`,
      );
    }
  }

  async remove(id: string) {
    try {
      const parkingSession = await this.prisma.parkingSession.findUnique({
        where: { id },
      });

      if (!parkingSession) {
        throw new NotFoundException(
          `Parking session with ID "${id}" not found.`,
        );
      }

      return await this.prisma.parkingSession.delete({
        where: { id },
      });
    } catch {
      throw new BadRequestException(
        `Could not delete parking session with ID "${id}".`,
      );
    }
  }
}
