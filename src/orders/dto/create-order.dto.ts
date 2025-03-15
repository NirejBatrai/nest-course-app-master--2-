import { IsInt, IsArray, IsEnum } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsArray()
  orderItems: { productId: number; quantity: number }[];

  @IsInt()
  shippingAddressId: number;

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
