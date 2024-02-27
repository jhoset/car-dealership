import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-user.dto';

@Controller('cars')
// @UsePipes(ValidationPipe)
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {

    }

    @Get(':id')
    getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {

        // throw new Error("Auxilio");

        return this.carsService.findById(id);
    }


    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }


    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.createCar(createCarDto);
    }


    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto) {
        return this.carsService.update(id, updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.delete(id);
    }

}
