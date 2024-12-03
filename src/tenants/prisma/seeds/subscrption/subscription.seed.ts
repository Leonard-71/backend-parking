import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSubscriptions() {
  await prisma.subscription.deleteMany();

  await prisma.subscription.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        name: "FREE",
        price: 0.0,
        accessType: "outside",
        entries: 3,
        exits: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        name: "VIP1",
        price: 15.0,
        accessType: "inside",
        entries: 7,
        exits: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440003",
        name: "VIP2",
        price: 20.0,
        accessType: "inside",
        entries: 12,
        exits: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("Subscription seed completed!");
}
