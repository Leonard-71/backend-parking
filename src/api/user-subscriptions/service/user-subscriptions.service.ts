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
import { Decimal } from "@prisma/client/runtime/library";


@Injectable()
export class UserSubscriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionService

  ) { }

  async create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
    const { userId, subscriptionTypeId } = createUserSubscriptionDto;
 
    const activeSubscription = await this.prisma.userSubscription.findFirst({
        where: { userId, isActive: true },
        include: { Subscription: true },
    });
 
    const newSubscriptionType = await this.subscriptionService.findOne(subscriptionTypeId);

    if (!newSubscriptionType) {
        throw new BadRequestException("The new subscription type is invalid.");
    }

    let adjustedPrice = new Decimal(newSubscriptionType.price);  

    if (activeSubscription) { 
        const remainingValue = new Decimal(activeSubscription.remainingEntries)
            .div(new Decimal(activeSubscription.Subscription.entries))
            .mul(new Decimal(activeSubscription.Subscription.price));
 
            adjustedPrice = Decimal.max(new Decimal(newSubscriptionType.price).sub(remainingValue), new Decimal(0));

 
        await this.prisma.userSubscription.update({
            where: { id: activeSubscription.id },
            data: {
                isActive: false,
                endDate: new Date(),
            },
        });
    }
 
    try {
        return await this.prisma.userSubscription.create({
            data: {
                userId,
                subscriptionTypeId,
                remainingEntries: newSubscriptionType.entries,
                remainingExits: newSubscriptionType.exits,
                startDate: new Date(),
                isActive: true,
                pricePaid: adjustedPrice,  
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
        include: {
          Subscription: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      if (!subscriptions || subscriptions.length === 0) { 
        return null;
      }
  
      return subscriptions.map(subscription => ({
        id: subscription.id,
        userId: subscription.userId,
        subscriptionTypeId: subscription.subscriptionTypeId,
        remainingEntries: subscription.remainingEntries,
        remainingExits: subscription.remainingExits,
        pricePaid: subscription.pricePaid,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        isActive: subscription.isActive,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt,
        subscription: {
          name: subscription.Subscription?.name || null,
          price: subscription.Subscription?.price || 0,
        },
      }));
    } catch (error) {
      console.error("Error:", error);
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

  async upgradeSubscription(
    userId: UUID,
    newSubscriptionTypeId: UUID,
  ): Promise<any> {
    const activeSubscription = await this.prisma.userSubscription.findFirst({
      where: { userId, isActive: true },
      include: { Subscription: true },
    });
  
    if (!activeSubscription) {
      throw new BadRequestException("User does not have an active subscription.");
    }
  
    const newSubscription = await this.prisma.subscription.findUnique({
      where: { id: newSubscriptionTypeId },
    });
  
    if (!newSubscription) {
      throw new BadRequestException("The new subscription type is invalid.");
    }
  
    if (activeSubscription.subscriptionTypeId === newSubscriptionTypeId) {
      throw new BadRequestException(
        "You are already subscribed to this plan.",
      );
    }
  
    if (Number(newSubscription.price) < Number(activeSubscription.Subscription.price)) {
      throw new BadRequestException("Downgrade is not allowed.");
    }
  
    const remainingValue =
      (activeSubscription.remainingEntries / activeSubscription.Subscription.entries) *
      Number(activeSubscription.Subscription.price);
  
    const newPrice = Number(newSubscription.price) - remainingValue;
  
    if (newPrice < 0) {
      throw new BadRequestException(
        "The new subscription price cannot be less than the remaining value of the current subscription.",
      );
    }
   
    await this.prisma.userSubscription.update({
      where: { id: activeSubscription.id },
      data: {
        isActive: false,
        endDate: new Date(),  
      },
    });
   
    return await this.prisma.userSubscription.create({
      data: {
        userId,
        subscriptionTypeId: newSubscriptionTypeId,
        remainingEntries: newSubscription.entries,
        remainingExits: newSubscription.exits,
        startDate: new Date(),
        isActive: true,
      },
    });
  }

  async calculatePriceDifference(userId: UUID, subscriptionTypeId: UUID): Promise<Decimal> {
    const activeSubscription = await this.prisma.userSubscription.findFirst({
        where: { userId, isActive: true },
        include: { Subscription: true },
    });

    const newSubscriptionType = await this.subscriptionService.findOne(subscriptionTypeId);

    if (!newSubscriptionType) {
        throw new BadRequestException("The new subscription type is invalid.");
    }

    let adjustedPrice = new Decimal(newSubscriptionType.price);

    if (activeSubscription) {
        const remainingValue = new Decimal(activeSubscription.remainingEntries)
            .div(new Decimal(activeSubscription.Subscription.entries))
            .mul(new Decimal(activeSubscription.Subscription.price));

        adjustedPrice = Decimal.max(new Decimal(newSubscriptionType.price).sub(remainingValue), new Decimal(0));
    }

    return adjustedPrice;
}

  
  
  
}
