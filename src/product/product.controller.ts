import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { Product } from './entity/product.entity';
import { jwtAuthGuard } from 'src/auth/jwt-auth.guard';
// 🔹 Create a new product (protected)
@UseGuards(jwtAuthGuard)
@Controller('products') // Base route: localhost:3000/products
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productData: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(productData);
  }

  // 🔹 Get all products (public)
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  // 🔹 Get a single product by ID (public)
  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product | null> {
    return this.productService.getProduct(Number(id));
  }

  // 🔹 Update a product (protected)
  @UseGuards(jwtAuthGuard)
  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateData: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(Number(id), updateData);
  }

  // 🔹 Delete a product (protected)
  @UseGuards(jwtAuthGuard)
  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<{ message: string }> {
    return this.productService.deleteProduct(Number(id));
  }
}
