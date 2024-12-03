import { Module } from "@nestjs/common";
import { PrismaService } from "../service/tenant.service";

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
