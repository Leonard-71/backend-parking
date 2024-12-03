import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  BadRequestException,
} from "@nestjs/common";
import { ParkingSpotService } from "../service/parkingSpot.service";
import { CreateParkingSpotDto } from "../dto/create-parking-spot.dto";
import { UpdateParkingSpotDto } from "../dto/update-parking-spot.dto";
import { validate as isUUID } from "uuid";
import { UUID } from "src/api/types";

@Controller("parking-spots")
export class ParkingSpotController {
  constructor(private readonly parkingSpotService: ParkingSpotService) {}

  @Get()
  async findAll() {
    const parkingSpots = await this.parkingSpotService.findAll();
    return { parkingSpots };
  }

  @Get(":id")
  async findOne(@Param("id") id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "Invalid parking spot ID. Must be a valid UUID.",
      );
    }

    const parkingSpot = await this.parkingSpotService.findOne(id);
    return { parkingSpot };
  }

  @Post()
  async create(@Body() createParkingSpotDto: CreateParkingSpotDto) {
    const parkingSpot =
      await this.parkingSpotService.create(createParkingSpotDto);
    return {
      success: true,
      message: "Parking spot created successfully",
      parkingSpot,
    };
  }

  @Patch(":id")
  async update(
    @Param("id") id: UUID,
    @Body() updateParkingSpotDto: UpdateParkingSpotDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "Invalid parking spot ID. Must be a valid UUID.",
      );
    }

    const updatedParkingSpot = await this.parkingSpotService.update(
      id,
      updateParkingSpotDto,
    );
    return {
      success: true,
      message: "Parking spot updated successfully",
      updatedParkingSpot,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: UUID) {
    if (!isUUID(id)) {
      throw new BadRequestException(
        "Invalid parking spot ID. Must be a valid UUID.",
      );
    }

    await this.parkingSpotService.remove(id);
    return { success: true, message: "Parking spot deleted successfully" };
  }
}
