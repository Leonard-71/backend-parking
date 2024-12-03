import { Module } from "@nestjs/common";
import { AuthModule } from "../../auth/module/auth.module";
import { ApiModule } from "src/api/api.module";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [AuthModule, ApiModule, PrismaModule],
  exports: [PrismaModule],
})
export class TenantModule {}
