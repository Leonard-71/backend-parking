import { Module } from "@nestjs/common";
import { CarService } from "../service/car.service";
import { CarController } from "../controller/car.controller";
import { PrismaModule } from "../../../tenants/module/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
