// orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order) private readonly orderModel: typeof Order) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderModel.create({ ...createOrderDto });
  }

  async findAll() {
    return await this.orderModel.findAll({ include: ['orderItems'] });
  }

  async findOne(id: number) {
    return await this.orderModel.findOne({
      where: { id },
      include: ['orderItems'],
    });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    await this.orderModel.update(updateOrderDto, { where: { id } });
    return this.findOne(id);
  }

  async remove(id: number) {
    return await this.orderModel.destroy({ where: { id } });
  }
}
