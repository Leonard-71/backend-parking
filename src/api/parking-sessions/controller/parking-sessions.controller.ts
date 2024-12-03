import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ParkingSessionsService } from "../service/parking-sessions.service";
import { CreateParkingSessionDto } from "../dto/create-parking-sessions.dto";
import { UpdateParkingSessionDto } from "../dto/update-parking-sessions.dto";
import { UUID } from "src/api/types";

@Controller("parking-sessions")
export class ParkingSessionsController {
  constructor(
    private readonly parkingSessionsService: ParkingSessionsService,
  ) {}

  @Post()
  create(@Body() createParkingSessionDto: CreateParkingSessionDto) {
    return this.parkingSessionsService.create(createParkingSessionDto);
  }

  @Get()
  findAll() {
    return this.parkingSessionsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: UUID) {
    return this.parkingSessionsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: UUID,
    @Body() updateParkingSessionDto: UpdateParkingSessionDto,
  ) {
    return this.parkingSessionsService.update(id, updateParkingSessionDto);
  }

  @Delete(":id")
  remove(@Param("id") id: UUID) {
    return this.parkingSessionsService.remove(id);
  }
}
