import { Module } from "@nestjs/common";
import { SubscriptionService } from "../service/subscription.service";
import { SubscriptionController } from "../controller/subscription.controller";
import { PrismaModule } from "../../../tenants/module/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
