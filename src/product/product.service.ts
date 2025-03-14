import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  // 🔹 Create a new product
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    // Creating a product with the DTO passed as input
    return this.productModel.create({
      ...createProductDto, // Spread the DTO into the model
      inStock: createProductDto.inStock ?? true, // Ensure default value for inStock
    });
  }

  // 🔹 Get all products
  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.findAll();
  }
  async getProduct(id: number): Promise<Product | null> {
    return await this.productModel.findByPk(id);
  }

  // 🔹 Update a product
  async updateProduct(
    id: number,
    updateData: Partial<Product>,
  ): Promise<Product> {
    const product = await this.getProduct(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.update(updateData);
    return product;
  }

  // 🔹 Delete a product
  async deleteProduct(id: number): Promise<{ message: string }> {
    const product = await this.getProduct(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return { message: 'Product deleted successfully' };
  }
}
