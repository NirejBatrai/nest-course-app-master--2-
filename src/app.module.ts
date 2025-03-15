import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/entities/auth.entity';
import { Product } from './products/entities/product.entity';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Payment } from './orders/entities/payment.entity';
import { ShippingAddress } from './orders/entities/shipping-address.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as Dialect,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [AuthUser, Product, Order, OrderItem, Payment, ShippingAddress],
      synchronize: true,
      autoLoadModels: true,
      sync: { alter: false },
      dialectOptions: {
        ssl: false, // If your local DB does not require SSL, set this to false.
      },
      pool: {
        max: 10, // Max connections (increase if needed)
        min: 0, // Min connections
        acquire: 30000, // Timeout in ms before throwing an error
        idle: 10000, // Timeout in ms before releasing idle connections
      },
    }),

    AuthModule,
    OrdersModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
