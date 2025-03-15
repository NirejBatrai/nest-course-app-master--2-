// order.entity.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './order-status.enum';
import { Payment } from './payment.entity';
import { ShippingAddress } from './shipping-address.entity';

@Table({ tableName: 'orders', timestamps: true })
export class Order extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => AuthUser)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => AuthUser)
  user: AuthUser;

  @HasMany(() => OrderItem)
  orderItems: OrderItem[];

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @HasMany(() => Payment)
  payments: Payment[];

  @ForeignKey(() => ShippingAddress)
  @Column({ type: DataType.INTEGER, allowNull: false })
  shippingAddressId: number;

  @BelongsTo(() => ShippingAddress)
  shippingAddress: ShippingAddress;
}
