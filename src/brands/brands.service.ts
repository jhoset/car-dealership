import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BrandsService {

  private brands: Brand[] = [
    {
      id: uuid(),
      createdAt: new Date().getTime(),
      name: 'Chevron',
    }
  ];

  create(createBrandDto: CreateBrandDto) {
    const brand: Brand = {
      id: uuid(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    }
    this.brands.push(brand);
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find(brand => brand.id === id);
    if (!brand) throw new NotFoundException(`Brand with id ${id} not found`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    let brandDb = this.findOne(id);
    this.brands = this.brands.map(brand => {
      if (brand.id === id) {
        brandDb.updatedAt = new Date().getTime();
        brandDb = { ...brandDb, ...updateBrandDto };
        return brandDb;
      }
      return brand;
    })
    return brandDb;
  }

  remove(id: string) {
    this.findOne(id)
    this.brands = this.brands.filter(brand => brand.id !== id);
  }

  public fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
}
}
