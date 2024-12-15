import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateCarDto } from "../dto/create-car.dto";
import { UpdateCarDto } from "../dto/update-car.dto";
import { UUID } from "src/api/types";

@Injectable()
export class CarService {
  constructor(private readonly prisma: PrismaService) { }

  async verifyCarOwnership(userId: string, registrationNumber: string): Promise<{ ownershipVerified: boolean }> {
    console.log('Prisma Query:', userId, registrationNumber);
    
    const car = await this.prisma.car.findFirst({
        where: {
            userId: userId,
            registrationNumber: registrationNumber,
            isDeleted: false,
        },
    });

    console.log('Car Found:', car); 
    return {
        ownershipVerified: !!car, 
    };
}


  async findAll() {
    return this.prisma.car.findMany();
  }

  async findAllCars() {
    return this.prisma.car.findMany({
      where: {
        isDeleted: false,
      },
    });
  }

  async findAllCarsUser(userId: string) {
    return this.prisma.car.findMany({
        where: {
            isDeleted: false,
            userId: userId,  
        },
    });
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

  async removeHard(id: UUID) {
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

  async removeSoft(id: UUID) {
    const car = await this.prisma.car.findUnique({
      where: { id },
    });
  
    if (!car) {
      throw new NotFoundException(`Car with ID ${id} not found.`);
    }
  
    return this.prisma.car.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
  
}
