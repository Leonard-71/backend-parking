import { PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function seedUsers() {
  await prisma.user.deleteMany();

  const hashedPassword1 = await bcrypt.hash("password123", 10);
  const hashedPassword2 = await bcrypt.hash("adminpassword123", 10);

  await prisma.user.createMany({
    data: [
      {
        id: "550e8400-e29b-41d4-a716-446655440000",
        firstName: "Filip",
        lastName: "Leonard",
        email: "leonard.filip@parcare.com",
        password: hashedPassword1,
        phone: "1234567890",
        role: UserRole.user,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "350e8400-e29b-41d4-a716-446655440022",
        firstName: "Test",
        lastName: "Testeee",
        email: "test@parcare.com",
        password: hashedPassword2,
        phone: "0987654321",
        role: UserRole.admin,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  console.log("User seed completed!");
}
