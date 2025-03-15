// update-order.dto.ts
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order-status.enum';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
