import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { PrismaService } from "../../../tenants/service/tenant.service";
import { CreateSubscriptionLogDto } from "../dto/create-subscription-log.dto";
import { UpdateSubscriptionLogDto } from "../dto/update-subscription-log.dto";
import { UUID } from "src/api/types";

@Injectable()
export class SubscriptionLogsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createSubscriptionLogDto: CreateSubscriptionLogDto) {
    try {
      return await this.prisma.subscriptionLog.create({
        data: createSubscriptionLogDto,
      });
    } catch {
      throw new BadRequestException(
        "Could not create subscription log. Please check your input.",
      );
    }
  }

  async findAll() {
    try {
      return await this.prisma.subscriptionLog.findMany();
    } catch {
      throw new BadRequestException("Could not retrieve subscription logs.");
    }
  }

  async findOne(id: UUID) {
    const log = await this.prisma.subscriptionLog.findUnique({
      where: { id },
    });

    if (!log) {
      throw new NotFoundException(
        `Subscription log with ID "${id}" not found.`,
      );
    }

    return log;
  }

  async findByUserSubscriptionId(userSubscriptionId: UUID) {
    const logs = await this.prisma.subscriptionLog.findMany({
      where: { userSubscriptionId },
    });

    if (!logs || logs.length === 0) {
      throw new NotFoundException(
        `No subscription logs found for subscription with ID "${userSubscriptionId}".`,
      );
    }

    return logs;
  }

  async update(id: UUID, updateSubscriptionLogDto: UpdateSubscriptionLogDto) {
    const log = await this.prisma.subscriptionLog.findUnique({
      where: { id },
    });

    if (!log) {
      throw new NotFoundException(
        `Subscription log with ID "${id}" not found.`,
      );
    }

    try {
      return await this.prisma.subscriptionLog.update({
        where: { id },
        data: updateSubscriptionLogDto,
      });
    } catch {
      throw new BadRequestException(
        `Could not update subscription log with ID "${id}".`,
      );
    }
  }

  async remove(id: UUID) {
    const log = await this.prisma.subscriptionLog.findUnique({
      where: { id },
    });

    if (!log) {
      throw new NotFoundException(
        `Subscription log with ID "${id}" not found.`,
      );
    }

    try {
      return await this.prisma.subscriptionLog.delete({
        where: { id },
      });
    } catch {
      throw new BadRequestException(
        `Could not delete subscription log with ID "${id}".`,
      );
    }
  }
}
