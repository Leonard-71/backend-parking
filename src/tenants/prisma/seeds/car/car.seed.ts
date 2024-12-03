import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedCar() {
  await prisma.car.deleteMany();

  await prisma.car.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440004",
        registrationNumber: "SV123ABC",
        brand: "Toyota",
        model: "Corolla",
        userId: "550e8400-e29b-41d4-a716-446655440000",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        registrationNumber: "SV456XYZ",
        brand: "Tesla",
        model: "Model 3",
        userId: "350e8400-e29b-41d4-a716-446655440022",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("Cars seed completed!");
}
