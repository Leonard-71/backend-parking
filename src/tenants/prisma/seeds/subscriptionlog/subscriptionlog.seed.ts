import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSubscriptionLog() {
  await prisma.subscriptionLog.deleteMany();

  await prisma.subscriptionLog.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-4466554400022",
        userSubscriptionId: "550e8400-e29b-41d4-a716-446655440002681",
        action: "Creare",
        details: "Abonament activat",
        createdAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-4466554400082",
        userSubscriptionId: "550e8400-e29b-41d4-a716-4466554400082",
        action: "Creare",
        details: "Abonament activat",
        createdAt: new Date(),
      },
    ],
  });

  console.log("SubscriptionLogs seed completed!");
}
