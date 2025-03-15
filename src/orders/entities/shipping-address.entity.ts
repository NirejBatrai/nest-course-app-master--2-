import { Table, Column, Model } from 'sequelize-typescript';

@Table({ tableName: 'shipping_addresses', timestamps: true })
export class ShippingAddress extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  street: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  country: string;
}
