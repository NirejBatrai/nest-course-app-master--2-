import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Ensure createProductDto is of type Omit<Product, 'id'>
    const product = await this.productModel.create(
      createProductDto as Omit<Product, 'id'>,
    );
    return product;
  }
  async findAll(): Promise<Product[]> {
    return this.productModel.findAll(); // Fetches all products from the database
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`); // Throw an error if not found
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    // Update the product with new values
    await product.update(updateProductDto);
    return product;
  }

  async remove(id: number): Promise<string> {
    const product = await this.productModel.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Product not found'); // Handle product not found case
    }

    await product.destroy(); // Deletes the product from the database
    return 'Product deleted successfully'; // Return success message
  }
}
