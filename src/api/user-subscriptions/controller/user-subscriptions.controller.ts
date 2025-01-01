import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from "@nestjs/common";
import { UserSubscriptionsService } from "../service/user-subscriptions.service";
import { CreateUserSubscriptionDto } from "../dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "../dto/update-user-subscription.dto";
import { UUID } from "src/api/types";
import { VerifyUserSubscriptionDto } from "../dto/verify-subscription.dto";
import { Decimal } from "@prisma/client/runtime/library";

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

  @Post("/check-active")
  checkActiveSubscription(
    @Body() verifyUserSubscriptionDto: VerifyUserSubscriptionDto,
  ) {
    return this.userSubscriptionsService.checkActiveSubscription(
      verifyUserSubscriptionDto,
    );
  }

  @Patch('/upgrade/:userId/:newSubscriptionTypeId')
  upgradeSubscription(
    @Param('userId') userId: UUID,
    @Param('newSubscriptionTypeId') newSubscriptionTypeId: UUID,
  ) {
    return this.userSubscriptionsService.upgradeSubscription(userId, newSubscriptionTypeId);
  }
  

  @Patch("/cancel/:userId")
  cancelSubscription(@Param("userId") userId: UUID) {
    return this.userSubscriptionsService.remove(userId);
  }

  @Post("/calculate-price")
async calculatePrice(
    @Body() createUserSubscriptionDto: CreateUserSubscriptionDto,
): Promise<{ adjustedPrice: Decimal }> {
    const { userId, subscriptionTypeId } = createUserSubscriptionDto;
    const adjustedPrice = await this.userSubscriptionsService.calculatePriceDifference(userId, subscriptionTypeId);
    return { adjustedPrice };
}

@Get("/active/:userId")
findActiveSubscription(@Param("userId") userId: UUID) {
  return this.userSubscriptionsService.findActiveSubscription(userId);
}

@Patch("/decrement/:userId")
decrementRemainingEntries(
    @Param("userId") userId: UUID,
    @Query("field") field: "remainingEntries" | "remainingExits"
) {
    if (!field) {
        throw new BadRequestException("Field parameter is required.");
    }

    return this.userSubscriptionsService.decrementRemainingField(userId, field);
}



  @Delete(":id")
  remove(@Param("id") id: UUID) {
    return this.userSubscriptionsService.remove(id);
  }
}
