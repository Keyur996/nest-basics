import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entity/coffee.entity';

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>
  ) {}

  async findAll() {
    return this.coffeeRepository.find();
  }

  async create(coffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(coffeeDto);
    return this.coffeeRepository.save(coffee); 
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({ where: { id: id } });

    if(!coffee) {
      throw new NotFoundException(`Coffee With ${id} not Found`);
    }

    return coffee;
  }

  async updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto
    });

    if(!coffee) {
      throw new NotFoundException(`Coffee With ${id} not Found`);
    }

    await this.coffeeRepository.save(coffee);
    return coffee;
  }

  async delete(id: number) {
    return this.coffeeRepository.delete(id);
  }
}
