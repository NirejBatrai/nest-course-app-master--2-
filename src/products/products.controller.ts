import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('bulk')
  async createBulk(@Body() createProductDtos: CreateProductDto[]) {
    const results: Product[] = [];

    for (const dto of createProductDtos) {
      const result = await this.productsService.create(dto);
      results.push(result);
    }

    return {
      message: `Successfully created ${results.length} products`,
      products: results,
    };
  }

  @Get('all')
  findAll() {
    return this.productsService.findAll(); // Fetches all products
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const productId = parseInt(id, 10); // Explicitly parse the ID as a number
    return this.productsService.findOne(productId); // Calls the service to find a product by ID
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const productId = parseInt(id, 10); // Explicitly parse the ID as a number
    return this.productsService.update(productId, updateProductDto); // Calls the service to update a product by ID
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const productId = parseInt(id, 10); // Explicitly parse the ID as a number
    return this.productsService.remove(productId); // Returns the success message
  }
}
