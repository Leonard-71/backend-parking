import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedUserSubscription() {
  await prisma.userSubscription.deleteMany();

  await prisma.userSubscription.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440002681",
        userId: "550e8400-e29b-41d4-a716-446655440000",
        subscriptionTypeId: "550e8400-e29b-41d4-a716-446655440001",
        remainingEntries: 3,
        remainingExits: 3,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-4466554400082",
        userId: "350e8400-e29b-41d4-a716-446655440022",
        subscriptionTypeId: "550e8400-e29b-41d4-a716-446655440002",
        remainingEntries: 7,
        remainingExits: 7,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("UserSubscriptions seed completed!");
}
