import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';
import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsPostalCode,
} from 'class-validator';

export class ShippingAddressDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH') // You can specify a region code like 'US' if needed
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @IsPostalCode('any') // Optionally replace 'any' with a specific locale, e.g., 'US'
  zipCode: string;

  @IsNotEmpty()
  country: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  userId: number;

  @ValidateNested()
  @Type(() => ShippingAddressDto)
  shippingAddress: ShippingAddressDto;

  @IsArray()
  orderItems: { productId: number; quantity: number }[];

  @IsEnum(OrderStatus)
  status: OrderStatus;
}
