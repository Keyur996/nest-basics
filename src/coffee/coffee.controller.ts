import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CoffeeService } from "./coffee.service";
import { CreateCoffeeDto } from "./dto/create-coffee.dto";
import { UpdateCoffeeDto } from "./dto/update-coffee.dto";

@Controller('coffee')
export class CoffeeController {

  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll() {
    return this.coffeeService.findAll();
  }

  @Post()
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto);
  }

  @Get("/:id")
  findOne(@Param("id") id: number) {
    return this.coffeeService.findOne(id);
  }

  @Patch("/:id")
  updateCoffee(@Param("id") id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeeService.updateCoffee(id, updateCoffeeDto);
  }
  
  @Delete("/:id")
  deleteCoffee(@Param("id") id: number) {
    return this.coffeeService.delete(id);
  }

}