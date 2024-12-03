import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UserSubscriptionsService } from "../service/user-subscriptions.service";
import { CreateUserSubscriptionDto } from "../dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "../dto/update-user-subscription.dto";
import { UUID } from "src/api/types";

@Controller("user-subscriptions")
export class UserSubscriptionsController {
  constructor(
    private readonly userSubscriptionsService: UserSubscriptionsService,
  ) {}

  @Post()
  create(@Body() createUserSubscriptionDto: CreateUserSubscriptionDto) {
    return this.userSubscriptionsService.create(createUserSubscriptionDto);
  }

  @Get()
  findAll() {
    return this.userSubscriptionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: UUID) {
    return this.userSubscriptionsService.findOne(id);
  }

  @Get("/user/:userId")
  findByUserId(@Param("userId") userId: UUID) {
    return this.userSubscriptionsService.findByUserId(userId);
  }

  @Get("/subscription-type/:subscriptionTypeId")
  findBySubscriptionTypeId(
    @Param("subscriptionTypeId") subscriptionTypeId: UUID,
  ) {
    return this.userSubscriptionsService.findBySubscriptionTypeId(
      subscriptionTypeId,
    );
  }

  @Patch(":id")
  update(
    @Param("id") id: UUID,
    @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto,
  ) {
    return this.userSubscriptionsService.update(id, updateUserSubscriptionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: UUID) {
    return this.userSubscriptionsService.remove(id);
  }
}