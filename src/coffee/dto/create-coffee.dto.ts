import { IsString } from "class-validator";

export class CreateCoffeeDto {
  @IsString()
  name: string;

  @IsString({ each: true })
  flavours: string[];
}
