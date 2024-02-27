import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-user.dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'FR4',
        },
        {
            id: uuid(),
            brand: 'Kia',
            model: 'k567',
        },
        {
            id: uuid(),
            brand: '4X4',
            model: '4NHK',
        }
    ]

    public findAll() {
        return this.cars;
    }

    public findById(id: string) {
        const car = this.cars.find(car => car.id == id);
        console.log(id)
        if (!car) {
            throw new NotFoundException(`Car with id ${id} NOT FOUND`);
        }
        return car;
    }

    public createCar(createCardDto: CreateCarDto) {
        const newCar: Car = {
            id: uuid(),
            ...createCardDto
        }
        this.cars.push(newCar)
        return newCar;
    }

    public update(id: string, updateCarDto: UpdateCarDto) {
        let carDb = this.findById(id);

        if (updateCarDto.id && updateCarDto.id !== id) {
            throw new BadRequestException(`Car id is not valid inside body`);
        }

        this.cars = this.cars.map(car => {
            if (car.id == id) {
                carDb = { ...carDb, ...updateCarDto, id }
                return carDb;
            }
            return car;
        })

        return carDb;

    }

    public delete(id: string) {
        this.findById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return true;
    }

    public fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }


}
