import { seedSubscriptions } from "./subscrption/subscription.seed";
import { seedUsers } from "./user/user.seed";
import { seedCar } from "./car/car.seed";
import { seedParkingSpot } from "./parkingspot/parkingSpot.seed";
import { seedUserSubscription } from "./usersubscription/usersubscription.seed";
import { seedSubscriptionLog } from "./subscriptionlog/subscriptionlog.seed";
import { seedParkingSession } from "./parkingsession/parkingsession.seed";

async function main() {
  console.log("Starting seed...");
  
  await seedUsers();
  console.log("Users seeded.");

  await seedSubscriptions();
  console.log("Subscriptions seeded.");

  await seedCar();
  console.log("Cars seeded.");

  await seedParkingSpot();
  console.log("Parking spots seeded.");

  await seedUserSubscription();
  console.log("User subscriptions seeded.");

  await seedSubscriptionLog();
  console.log("Subscription logs seeded.");

  await seedParkingSession();
  console.log("Parking sessions seeded.");
 
  console.log("All seeds completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("Seeding finished.");
  });
