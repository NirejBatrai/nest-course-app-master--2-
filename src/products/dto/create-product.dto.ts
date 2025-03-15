import {
  IsString,
  IsOptional,
  IsNumber,
  IsArray,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  price: number;

  @IsNumber()
  @Min(0, { message: 'Stock must be at least 0' })
  stock: number;

  @IsArray()
  @IsOptional()
  images?: string[];
}
