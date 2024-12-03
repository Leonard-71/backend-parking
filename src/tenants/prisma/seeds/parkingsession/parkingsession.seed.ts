import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedParkingSession() {
  await prisma.parkingSession.deleteMany();

  await prisma.parkingSession.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440017",
        userId: "550e8400-e29b-41d4-a716-446655440000",
        carId: "550e8400-e29b-41d4-a716-446655440004",
        parkingSpotId: "550e8400-e29b-41d4-a716-446655440078",
        userSubscriptionId: "550e8400-e29b-41d4-a716-446655440002681",
        entryTime: new Date(),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440018",
        userId: "350e8400-e29b-41d4-a716-446655440022",
        carId: "550e8400-e29b-41d4-a716-446655440005",
        parkingSpotId: "550e8400-e29b-41d4-a716-44665544079",
        userSubscriptionId: "550e8400-e29b-41d4-a716-4466554400082",
        entryTime: new Date(new Date().setHours(new Date().getHours() - 2)),
        exitTime: new Date(),
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("ParkingSessions seed completed!");
}
