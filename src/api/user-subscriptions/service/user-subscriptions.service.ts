import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateUserSubscriptionDto } from "../dto/create-user-subscription.dto";
import { UpdateUserSubscriptionDto } from "../dto/update-user-subscription.dto";
import { VerifyUserSubscriptionDto } from "../dto/verify-subscription.dto";
import { UUID } from "src/api/types";
import { SubscriptionService } from "src/api/subscription/service/subscription.service";


@Injectable()
export class UserSubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService

  ) { }

  async create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
    const { userId, subscriptionTypeId } = createUserSubscriptionDto;
   
    const existingSubscription = await this.prisma.userSubscription.findFirst({
      where: {
        userId,
        subscriptionTypeId,
        isActive: true,  
      },
    });
  
    if (existingSubscription) {
      throw new BadRequestException(
        `User already has an active subscription of this type.`,
      );
    }
   
    const subscriptionType = await this.subscriptionService.findOne(subscriptionTypeId);
   
    try {
      return await this.prisma.userSubscription.create({
        data: {
          userId,
          subscriptionTypeId,
          remainingEntries: subscriptionType.entries,
          remainingExits: subscriptionType.exits,
          startDate: new Date(),
          isActive: true,
        },
      });
    } catch (error) {
      throw new BadRequestException(
        "Could not create user subscription. Please check your input.",
      );
    }
  }

  async checkActiveSubscription(verifyUserSubscriptionDto: VerifyUserSubscriptionDto): Promise<boolean> {
    const { userId, subscriptionTypeId } = verifyUserSubscriptionDto;
    const existingSubscription = await this.prisma.userSubscription.findFirst({
        where: {
            userId,
            subscriptionTypeId,
            isActive: true, 
        },
    });

    return !!existingSubscription; 
  }

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
      include: { User: true }
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
