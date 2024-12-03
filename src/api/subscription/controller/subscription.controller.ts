import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { SubscriptionService } from "../service/subscription.service";
import { CreateSubscriptionDto } from "../dto/create-subscription.dto";
import { UpdateSubscriptionDto } from "../dto/update-subscription.dto";
import { validate as isUUID } from "uuid";
import { UUID } from "src/api/types";

@Controller("subscriptions")
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get()
  async findAll() {
    const subscriptions = await this.subscriptionService.findAll();
    return { subscriptions };
  }

  @Get(":id")
  async findOne(@Param("id") id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "Invalid subscription ID. Must be a valid UUID.",
      );
    }

    const subscription = await this.subscriptionService.findOne(id);
    return { subscription };
  }

  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    const subscription = await this.subscriptionService.create(
      createSubscriptionDto,
    );
    return {
      success: true,
      message: "Subscription created successfully",
      subscription,
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: UUID,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "Invalid subscription ID. Must be a valid UUID.",
      );
    }

    const subscription = await this.subscriptionService.update(
      id,
      updateSubscriptionDto,
    );
    return {
      success: true,
      message: "Subscription updated successfully",
      subscription,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "Invalid subscription ID. Must be a valid UUID.",
      );
    }

    await this.subscriptionService.remove(id);
    return { success: true, message: "Subscription deleted successfully" };
  }
}
