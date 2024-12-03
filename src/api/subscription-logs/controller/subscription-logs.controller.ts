import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SubscriptionLogsService } from "../service/subscription-logs.service";
import { CreateSubscriptionLogDto } from "../dto/create-subscription-log.dto";
import { UpdateSubscriptionLogDto } from "../dto/update-subscription-log.dto";
import { UUID } from "src/api/types";

@Controller("subscription-logs")
export class SubscriptionLogsController {
  constructor(
    private readonly subscriptionLogsService: SubscriptionLogsService,
  ) {}

  @Post()
  create(@Body() createSubscriptionLogDto: CreateSubscriptionLogDto) {
    return this.subscriptionLogsService.create(createSubscriptionLogDto);
  }

  @Get()
  findAll() {
    return this.subscriptionLogsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: UUID) {
    return this.subscriptionLogsService.findOne(id);
  }

  @Get("/user-subscription/:userSubscriptionId")
  findByUserSubscriptionId(
    @Param("userSubscriptionId") userSubscriptionId: UUID,
  ) {
    return this.subscriptionLogsService.findByUserSubscriptionId(
      userSubscriptionId,
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: UUID,
    @Body() updateSubscriptionLogDto: UpdateSubscriptionLogDto,
  ) {
    return this.subscriptionLogsService.update(id, updateSubscriptionLogDto);
  }

  @Delete(":id")
  remove(@Param("id") id: UUID) {
    return this.subscriptionLogsService.remove(id);
  }
}
