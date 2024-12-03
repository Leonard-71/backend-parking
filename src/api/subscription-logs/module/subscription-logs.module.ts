import { Module } from "@nestjs/common";
import { SubscriptionLogsService } from "../service/subscription-logs.service";
import { SubscriptionLogsController } from "../controller/subscription-logs.controller";
import { PrismaService } from "../../../tenants/service/tenant.service";

@Module({
  controllers: [SubscriptionLogsController],
  providers: [SubscriptionLogsService, PrismaService],
})
export class SubscriptionLogsModule {}
