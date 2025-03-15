// order-item.entity.ts
import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Order } from './order.entity';
import { Product } from 'src/products/entities/product.entity';

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItem extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @BelongsTo(() => Order, { onDelete: 'CASCADE' }) // Ensure cascading delete
  order: Order;

  @ForeignKey(() => Product)
  @Column
  productId: number;
  @BelongsTo(() => Product, { onDelete: 'CASCADE' }) // Ensure cascading delete
  product: Product;

  @Column
  quantity: number;
}
