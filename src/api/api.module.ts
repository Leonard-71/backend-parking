import { Module } from "@nestjs/common";

import { UserService } from "./user/service/user.service";
import { SubscriptionService } from "./subscription/service/subscription.service";
import { PrismaModule } from "src/tenants/module/prisma.module";
import { UserController } from "./user/controller/user.controller";
import { SubscriptionController } from "./subscription/controller/subscription.controller";
import { CarController } from "./car/controller/car.controller";
import { CarService } from "./car/service/car.service";
import { ParkingSpotController } from "./parking-spot/controller/parkingSpot.controller";
import { ParkingSpotService } from "./parking-spot/service/parkingSpot.service";
import { ParkingSessionsController } from "./parking-sessions/controller/parking-sessions.controller";
import { ParkingSessionsService } from "./parking-sessions/service/parking-sessions.service";
import { UserSubscriptionsController } from "./user-subscriptions/controller/user-subscriptions.controller";
import { UserSubscriptionsService } from "./user-subscriptions/service/user-subscriptions.service";
import { SubscriptionLogsService } from "./subscription-logs/service/subscription-logs.service";
import { SubscriptionLogsController } from "./subscription-logs/controller/subscription-logs.controller";

@Module({
  imports: [PrismaModule],
  controllers: [
    UserController,
    SubscriptionController,
    CarController,
    ParkingSpotController,
    ParkingSessionsController,
    UserSubscriptionsController,
    SubscriptionLogsController,
  ],
  providers: [
    UserService,
    SubscriptionService,
    CarService,
    ParkingSpotService,
    ParkingSessionsService,
    UserSubscriptionsService,
    SubscriptionLogsService,
  ],
  exports: [
    UserService,
    SubscriptionService,
    CarService,
    ParkingSpotService,
    ParkingSessionsService,
    UserSubscriptionsService,
    SubscriptionLogsService,
  ],
})
export class ApiModule {}
