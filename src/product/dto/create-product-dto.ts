// create-product-dto.ts
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  description: string;

  @IsUrl()
  imageUrl: string;

  @IsOptional() // Optional since the default value is true in the model
  @IsBoolean()
  inStock: boolean;
}
