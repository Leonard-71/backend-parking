import { Module } from "@nestjs/common";
import { ParkingSpotService } from "../service/parkingSpot.service";
import { ParkingSpotController } from "../controller/parkingSpot.controller";
import { PrismaModule } from "../../../tenants/module/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [ParkingSpotController],
  providers: [ParkingSpotService],
})
export class SubscriptionModule {}
