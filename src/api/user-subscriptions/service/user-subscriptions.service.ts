import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateUserSubscriptionDto } from "../dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "../dto/update-user-subscription.dto";
import { UUID } from "src/api/types";

@Injectable()
export class UserSubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    try {
      return await this.prisma.userSubscription.findMany();
    } catch {
      throw new BadRequestException("Could not retrieve user subscriptions.");
    }
  }

  async findOne(id: UUID) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(
        `User subscription with ID "${id}" not found.`,
      );
    }

    return subscription;
  }

  async findByUserId(userId: UUID) {
    try {
      const subscriptions = await this.prisma.userSubscription.findMany({
        where: { userId },
      });

      if (!subscriptions || subscriptions.length === 0) {
        throw new NotFoundException(
          `No subscriptions found for user with ID "${userId}".`,
        );
      }

      return subscriptions;
    } catch {
      throw new BadRequestException(
        "Error retrieving subscriptions for the specified user.",
      );
    }
  }

  async findBySubscriptionTypeId(subscriptionTypeId: UUID) {
    try {
      const subscriptions = await this.prisma.userSubscription.findMany({
        where: { subscriptionTypeId },
      });

      if (!subscriptions || subscriptions.length === 0) {
        throw new NotFoundException(
          `No subscriptions found for subscription type with ID "${subscriptionTypeId}".`,
        );
      }

      return subscriptions;
    } catch {
      throw new BadRequestException(
        "Error retrieving subscriptions for the specified subscription type.",
      );
    }
  }

  async create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
    try {
      return await this.prisma.userSubscription.create({
        data: createUserSubscriptionDto,
      });
    } catch {
      throw new BadRequestException(
        "Could not create user subscription. Please check your input.",
      );
    }
  }

  async update(id: UUID, updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(
        `User subscription with ID "${id}" not found.`,
      );
    }

    try {
      return await this.prisma.userSubscription.update({
        where: { id },
        data: updateUserSubscriptionDto,
      });
    } catch {
      throw new BadRequestException(
        `Could not update user subscription with ID "${id}".`,
      );
    }
  }

  async remove(id: UUID) {
    const subscription = await this.prisma.userSubscription.findUnique({
      where: { id },
    });

    if (!subscription) {
      throw new NotFoundException(
        `User subscription with ID "${id}" not found.`,
      );
    }

    try {
      return await this.prisma.userSubscription.delete({
        where: { id },
      });
    } catch {
      throw new BadRequestException(
        `Could not delete user subscription with ID "${id}".`,
      );
    }
  }
}
