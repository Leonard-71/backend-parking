-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('outside', 'inside');

-- CreateEnum
CREATE TYPE "SubscriptionType" AS ENUM ('FREE', 'VIP1', 'VIP2');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "name" "SubscriptionType" NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "accessType" "AccessType" NOT NULL,
    "entries" INTEGER NOT NULL,
    "exits" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);
