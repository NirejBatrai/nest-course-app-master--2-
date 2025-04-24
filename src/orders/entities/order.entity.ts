// order.entity.ts
import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AuthUser } from 'src/auth/entities/auth.entity';
import { OrderStatus } from './order-status.enum';

// order.entity.ts
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

  @Column({
    type: DataType.JSON,
    allowNull: false,
    defaultValue: [],
  })
  orderItemsJson: Array<{ productId: number; quantity: number }>;

  @Column({
    type: DataType.ENUM(...Object.values(OrderStatus)),
    allowNull: false,
    defaultValue: OrderStatus.PENDING,
  })
  status: OrderStatus;

  // Embedded address fields
  @Column({ allowNull: false })
  firstName: string;

  @Column({ allowNull: false })
  lastName: string;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  phone: string;

  @Column({ allowNull: false })
  address: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  state: string;

  @Column({ allowNull: false })
  zipCode: string;

  @Column({ allowNull: false })
  country: string;
}
