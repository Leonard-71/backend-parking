import { Module } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
import { PrismaModule } from "../../../tenants/module/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
