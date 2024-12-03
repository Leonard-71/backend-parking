import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedParkingSpot() {
  await prisma.parkingSpot.deleteMany();

  await prisma.parkingSpot.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440078",
        spotNumber: "A1",
        type: "inside",
        isOccupied: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-44665544079",
        spotNumber: "B2",
        type: "outside",
        isOccupied: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("ParkingSpots seed completed!");
}
