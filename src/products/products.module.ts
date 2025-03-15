import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderItem } from 'src/orders/entities/order-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([Product, OrderItem])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
