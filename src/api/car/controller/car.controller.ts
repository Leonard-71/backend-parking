import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { CarService } from "../service/car.service";
import { CreateCarDto } from "../dto/create-car.dto";
import { UpdateCarDto } from "../dto/update-car.dto";
import { UUID } from "src/api/types";

@Controller("cars")
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async findAll() {
    const cars = await this.carService.findAll();
    return { cars };
  }

  @Get(":id")
  async findOne(@Param("id") id: UUID) {
    const car = await this.carService.findOne(id);
    return { car };
  }

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    const car = await this.carService.create(createCarDto);
    return {
      success: true,
      message: "Car created successfully",
      car,
    };
  }

  @Patch(":id")
  async update(@Param("id") id: UUID, @Body() updateCarDto: UpdateCarDto) {
    const car = await this.carService.update(id, updateCarDto);
    return {
      success: true,
      message: "Car updated successfully",
      car,
    };
  }

  @Delete(":id")
  async remove(@Param("id") id: UUID) {
    await this.carService.remove(id);
    return { success: true, message: "Car deleted successfully" };
  }
}
