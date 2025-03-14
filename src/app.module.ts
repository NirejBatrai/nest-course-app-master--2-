import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UtilityModule } from './shared/utility/utility.module';
import { GlobalHelperModule } from './shared/global-helper/global-helper.module';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { ChatModule } from './chat/chat.module';
import { CustomerModule } from './customer/customer.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { UserInfoModule } from './user-info/user-info.module';
import { UserInfo } from './user-info/entities/user-info.entity';
import { Customer } from './customer/entities/customer.entity';
import { AuthModule } from './auth/auth.module';
import { AuthUser } from './auth/entities/auth.entity';
import { Product } from './product/entity/product.entity';

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
      models: [UserInfo, Customer, AuthUser, Product],
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
    ProductModule,
    UtilityModule,
    GlobalHelperModule,
    UserModule,
    OrderModule,
    ChatModule,
    CustomerModule,
    UserInfoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
